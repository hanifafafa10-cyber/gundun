import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

// Lazily initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (aiClient) return aiClient;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    throw new Error("GEMINI_API_KEY is not configured in the developer's environment. Please add it via Settings > Secrets.");
  }

  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  return aiClient;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// API route to health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// API route to analyze food habits
app.post("/api/analyze", async (req, res) => {
  try {
    const { breakfast, lunch, dinner, snacks, water } = req.body;

    // Validate request inputs (some food can be skipped, but we expect basic inputs)
    const bf = (breakfast || "").trim();
    const ln = (lunch || "").trim();
    const dn = (dinner || "").trim();
    const sn = (snacks || "").trim();
    const wt = Number(water) || 0;

    // Lazy load and get client
    let ai;
    try {
      ai = getGeminiClient();
    } catch (e: any) {
      console.warn("Gemini client error:", e.message);
      return res.status(400).json({
        error: "Configuration Error",
        message: e.message || "Missing GEMINI_API_KEY environment variable. Please click on the Settings gear in the user interface to supply your key."
      });
    }

    const systemInstruction = `You are an elite, empathetic sports dietitian and nutritionist who provides expert, motivational feedback. 
Analyze the provided meals:
- Breakfast: ${bf || "None / Skipped"}
- Lunch: ${ln || "None / Skipped"}
- Dinner: ${dn || "None / Skipped"}
- Snacks: ${sn || "None / Skipped"}
- Water intake: ${wt} liters (or units)

Assess their hydration, meal frequency, balanced nutrition (variety, proteins, veggies/fruits, processed and sweet/fatty snacks). 
Design a rating from 1 to 10 (1 is hyper-unhealthy or starvation, 10 is perfect professional grade athlete diet). 
Determine standard categories for both English and Traditional Mandarin (繁體中文).
Provide exactly 3 actionable, highly helpful pieces of feedback/advice, avoiding genetic advice, tailor it directly to what they ate. Make it friendly and motivating.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Please analyze my daily diet and give me a full breakdown, rating, and exactly 3 advices in English and Traditional Chinese.",
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "ratingScore",
            "ratingLabelEn",
            "ratingLabelZh",
            "adviceEn",
            "adviceZh",
            "breakdownEn",
            "breakdownZh"
          ],
          properties: {
            ratingScore: {
              type: Type.INTEGER,
              description: "An integer score from 1 (poor/severe lack or unbalanced) to 10 (extremely clean, rich, and well-hydrated diet)."
            },
            ratingLabelEn: {
              type: Type.STRING,
              description: "A short, engaging English rating label (e.g. Excellent, Very Balanced, Needs Hydration, High Processed Food, Imbalanced, Skipped Meals)."
            },
            ratingLabelZh: {
              type: Type.STRING,
              description: "Translate the rating label accurately into Traditional Mandarin (e.g. 完美均衡, 非常健康, 水分不足, 精緻澱粉過多, 飲食不均, 略過正餐)."
            },
            adviceEn: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of exactly 3 specific, actionable dietary recommendations in English based on their food today."
            },
            adviceZh: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "The identical 3 recommendations translated into native, professional Traditional Mandarin (繁體中文)."
            },
            breakdownEn: {
              type: Type.OBJECT,
              required: ["hydration", "variety", "proteinQuality", "sugarProcessed"],
              properties: {
                hydration: { type: Type.STRING, description: "Hydration feedback in English, analyzing if water intake is enough." },
                variety: { type: Type.STRING, description: "Color/dietary variety and fresh foods feedback in English." },
                proteinQuality: { type: Type.STRING, description: "Review of protein quality and energy macros in English." },
                sugarProcessed: { type: Type.STRING, description: "Insights on sweets, processed snacks or salt in English." }
              }
            },
            breakdownZh: {
              type: Type.OBJECT,
              required: ["hydration", "variety", "proteinQuality", "sugarProcessed"],
              properties: {
                hydration: { type: Type.STRING, description: "Hydration feedback in Traditional Mandarin (繁體中文)." },
                variety: { type: Type.STRING, description: "Dietary variety feedback in Traditional Mandarin (繁體中文)." },
                proteinQuality: { type: Type.STRING, description: "Protein and macro review in Traditional Mandarin (繁體中文)." },
                sugarProcessed: { type: Type.STRING, description: "Processed snacks and sugar review in Traditional Mandarin (繁體中文)." }
              }
            }
          }
        }
      }
    });

    const textOutput = response.text || "{}";
    const data = JSON.parse(textOutput);
    res.json(data);
  } catch (error: any) {
    console.error("Analysis route error:", error);
    res.status(500).json({
      error: "Analysis Failed",
      message: error.message || "An unexpected error occurred during analysis."
    });
  }
});

// Setup Vite Dev Server / Serve Dist Static Files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
