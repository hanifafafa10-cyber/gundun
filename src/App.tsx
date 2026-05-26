import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Coffee, 
  Sun, 
  Moon, 
  Apple, 
  Droplets, 
  Sparkles, 
  TrendingUp, 
  Trash2, 
  Plus, 
  AlertCircle, 
  Lightbulb, 
  Languages, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  RotateCcw,
  UtensilsCrossed,
  Cookie
} from "lucide-react";
import { TrackEntry, Language, MealInputs } from "./types";

// Translation Dictionary for a complete Traditional Mandarin + English experience
const t = {
  en: {
    appTitle: "EcoBite Habits",
    appSub: "AI Nutritionist & Hydration Counselor",
    tagline: "Log your daily food and fluid intake to get real-time ratings, macro analysis, and clinical advice designed by AI.",
    breakfast: "Breakfast Intake",
    breakfastDesc: "Energy to fuel your morning metabolism",
    lunch: "Lunch Intake",
    lunchDesc: "Midday macro balance and focus booster",
    dinner: "Dinner Intake",
    dinnerDesc: "Nourishing, easy-to-digest recovery meals",
    snacks: "Snacks & Sweets",
    snacksDesc: "Optional bites and sweet/processed logs",
    waterTitle: "Hydration Intake (Liters)",
    waterDesc: "Recommended benchmark: 2.0L to 3.0L daily",
    waterQuickButtons: "Quick Add Fluid",
    trackHabitBtn: "Track & Rate My Habits",
    trackingStatus: "AI Clinician Analyzing Your Habit...",
    ratingResultTitle: "AI Clinical Habit Analysis",
    habitsRatingTitle: "Dietary Score",
    habitsAdviceTitle: "Dietary Adjustments",
    hydrationHeading: "Hydration Status",
    varietyHeading: "Dietary Variety",
    proteinHeading: "Protein & Quality",
    sugarHeading: "Processed Foods & Glycemic Load",
    actionablePlan: "Custom 3-Step Action Plan",
    historySectionTitle: "Recent Daily Diet Logs",
    noHistoryDesc: "No logged habits in this browser session. Type in your meals above or tap a Quick Scenario to test!",
    clearLogs: "Clear Log History",
    quickTemplatesTitle: "Quick Mock Scenarios",
    quickTemplatesDesc: "Click to generate realistic diets to instantly test ratings and Traditional Mandarin translation",
    balancedLowFat: "Clean Athlete Diet",
    sweetHighSugar: "Excessive Sweets & Fast Food",
    healthyVegan: "Whole-Food Plant-Based",
    skippedMeals: "Skipped Meals (Low Water)",
    waterGlass: "+0.25L Glass",
    waterBottle: "+0.50L Bottle",
    waterClear: "Reset",
    errorEmpty: "Please enter at least one meal or enter some water intake to allow a meaningful analysis.",
    errorGemini: "Unable to complete AI analysis. Check that the GEMINI_API_KEY is configured under Settings > Secrets.",
    ratingLabel: "Score: ",
    adviceLabel: "Clinical Insight",
    aboutAIFootnote: "AI Methodology: EcoBite utilizes the server-side Gemini 3.5 AI model to act as your personalized diet consultant. It reviews ingredients for macronutrient balances, glycemic variety, and checks hydration patterns with precision.",
    todayTag: "Today's Log",
    dateLogged: "Logged on",
    foodIntakeHeader: "Logged food logs:",
    waterLoggedNum: "Water Logged",
    viewDetails: "View Full Breakdown",
    saveSuccess: "Saved to browser history!",
    greetings: "Bountiful Health Starter",
    habitExcellent: "A highly balanced day! Keep up this lifestyle.",
    habitFair: "Good baseline. Some minor optimizations needed.",
    habitPoor: "Needs attention. Try following the action plan below!",
    scoreOf10: "of 10",
    ratingDesc: "Synthesized based on fresh macros, hydration volume and ingredient profile.",
    resultsTitle: "AI Consultation Status",
    langToggle: "Switch to 中文",
    waterUnit: "Liters",
    breakfastPlaceholder: "What did you eat for breakfast? e.g. Oatmeal, eggs, coffee...",
    lunchPlaceholder: "What did you eat for lunch? e.g. Chicken salad, wild rice...",
    dinnerPlaceholder: "What did you eat for dinner? e.g. Baked salmon, broccoli...",
    snacksPlaceholder: "Optional snacks or beverages? e.g. Almonds, apple, sweet tea..."
  },
  zh: {
    appTitle: "EcoBite 膳食習慣追蹤",
    appSub: "AI 臨床營養與水合輔助評估系統",
    tagline: "記錄您全天候的早餐、午餐、晚餐、零食及總水合容量，AI 臨床營養顧問將為您提供最精細的習慣評分、常量指標分析與改善行動方案。",
    breakfast: "早餐飲食記錄",
    breakfastDesc: "重啟清晨代謝與活力的高品質來源",
    lunch: "午餐飲食記錄",
    lunchDesc: "中午能量補充與維持專注力的常量搭配",
    dinner: "晚餐飲食記錄",
    dinnerDesc: "夜間修復、低負擔且易於消化的溫和營養",
    snacks: "點心、碎食與零嘴",
    snacksDesc: "正餐外的額外補充或精緻糖分/鹽分紀錄",
    waterTitle: "每日水合攝取量 (公升)",
    waterDesc: "每日健康基礎基準線：2.0L 至 3.0L",
    waterQuickButtons: "快速追加水分",
    trackHabitBtn: "多維度追蹤評估飲食習慣",
    trackingStatus: "AI 營養顧問正在進行精細化分析...",
    ratingResultTitle: "AI 膳食臨床評估報告",
    habitsRatingTitle: "全天飲食綜合營養評估",
    habitsAdviceTitle: "膳食改善方針",
    hydrationHeading: "水合狀態分析",
    varietyHeading: "飲食多樣性",
    proteinHeading: "蛋白質品質",
    sugarHeading: "精緻非原生食物與升糖負荷",
    actionablePlan: "專屬微調 3 步行動方案",
    historySectionTitle: "近期每日飲食日誌",
    noHistoryDesc: "本瀏覽器工作階段中暫無任何飲食日誌記錄。請在上方輸入您今日的膳食，或點選下方 mock 情境範本進行分析！",
    clearLogs: "清除歷史飲食地圖",
    quickTemplatesTitle: "快速 Mock 測試情境面版",
    quickTemplatesDesc: "點擊可快速載入各類典型生活或臨床參考膳食，檢驗 AI 常量營養辨識與推薦調養系統的表現",
    balancedLowFat: "健康低脂運動員餐",
    sweetHighSugar: "高糖點心、手搖杯與炸雞餐",
    healthyVegan: "嚴格高纖全植物素食餐",
    skippedMeals: "忙碌略過正餐 (極度缺乏水分)",
    waterGlass: "+0.25L 單杯水",
    waterBottle: "+0.50L 隨行瓶",
    waterClear: "清空",
    errorEmpty: "請至少填寫一餐內容或設定水分，以便 AI 進行有意義的高維度飲食評估。",
    errorGemini: "AI 生成失敗。請確認您是否已在「Settings > Secrets」(設定與金鑰) 內提供了有效的 GEMINI_API_KEY。",
    ratingLabel: "綜合評分：",
    adviceLabel: "臨床指引",
    aboutAIFootnote: "AI 計算原理：EcoBite 技術由後端獨立 Linux 容器驅動，透過與 Google Gemini 3.5 智能接口的深度安全連結，能即時將輸入之食材與大量運動科學及臨床微量元素指南進行深度匹配。",
    todayTag: "今日飲食數據",
    dateLogged: "記錄時間",
    foodIntakeHeader: "已登入的飲食明細：",
    waterLoggedNum: "水合量",
    viewDetails: "點擊檢視完整報告",
    saveSuccess: "紀錄已儲存在瀏覽器快取中！",
    greetings: "健康飲食養成計劃",
    habitExcellent: "極佳的一天！您正在建造穩健的身體組織。",
    habitFair: "已達良好門檻。參考下方建議可以更上一層樓。",
    habitPoor: "有待改善。建議遵循下方營養方針進行微調！",
    scoreOf10: "分 (滿分10)",
    ratingDesc: "綜合您今日的多采多樣食材、水合容量與精緻升糖來源進行專業膳食指標測算。",
    resultsTitle: "AI 膳食評估等待中",
    langToggle: "切換為 English",
    waterUnit: "公升",
    breakfastPlaceholder: "您早餐吃了什麼？例如：燕麥、水煮蛋、拿鐵...",
    lunchPlaceholder: "您午餐吃了什麼？例如：雞肉溫沙拉、糙米飯、烤蔬菜...",
    dinnerPlaceholder: "您晚餐吃了什麼？例如：烤香草鮭魚、清炒西蘭花...",
    snacksPlaceholder: "有吃點心或零食嗎？例如：一小把杏仁、蘋果、無糖綠茶..."
  }
};

// Simple quick-fill datasets for testing
const mockScenarios: Record<string, MealInputs> = {
  balancedLowFat: {
    breakfast: "Greek yogurt with chia seeds, fresh blueberries, and a sprinkle of organic oats.",
    lunch: "Grilled organic chicken breast, wild brown rice, baked honey sweet potatoes, and steamed asparagus spears.",
    dinner: "Oven-roasted wild salmon with avocado oil, garlic sautéed kale, and shredded beets.",
    snacks: "15 pieces of unsalted raw almonds, herbal chamomile tea, whey protein isolate shakened with water.",
    water: 2.75
  },
  sweetHighSugar: {
    breakfast: "2 powdered sugary donuts, caramel macchiato coffee with triple caramel syrup.",
    lunch: "Pepperoni pizza slices (half box), regular sweetened cola can, french fries with ranch.",
    dinner: "Crispy fried buffalo chicken wings, glazed mozzarella cheese sticks, chocolate fudge cake with vanilla ice cream.",
    snacks: "Gummy candy pack, potato chips bag, sweetened milk bubble tea.",
    water: 0.5
  },
  healthyVegan: {
    breakfast: "Steel-cut oatmeal prepared with almond milk, topped with sliced banana, flax seeds, and almond butter.",
    lunch: "Smoked tofu organic salad bowl with red quinoa, black beans, baby spinach, cherry tomatoes, and tahini dressing.",
    dinner: "Creamy lentil and vegetable slow-cooked coconut curry with turmeric, served over jasmine brown rice.",
    snacks: "Raw carrot sticks dipped in roasted red pepper hummus, single apple.",
    water: 2.25
  },
  skippedMeals: {
    breakfast: "None, skipped due to morning meetings. Just drank a double shot of espresso on empty stomach.",
    lunch: "Skipped again, ran on meetings and felt highly dehydrated.",
    dinner: "Late-night instant spicy ramen cup, fried egg, processed ham slices, and a sugary soda.",
    snacks: "A handful of salty potato chips.",
    water: 0.3
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>("en");
  
  // Input fields state
  const [inputs, setInputs] = useState<MealInputs>({
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: "",
    water: 1.0 // default starting water
  });

  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMess, setErrorMess] = useState<string | null>(null);
  
  // Keep active analysis result
  const [analysisResult, setAnalysisResult] = useState<TrackEntry | null>(null);
  
  // Logged History state
  const [history, setHistory] = useState<TrackEntry[]>([]);

  // Load state and history from localStorage on mounting
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem("ecobite_history");
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
      
      const storedLang = localStorage.getItem("ecobite_lang");
      if (storedLang === "en" || storedLang === "zh") {
        setLang(storedLang);
      }
    } catch (e) {
      console.error("Local storage loading error", e);
    }
  }, []);

  const saveHistoryToStorage = (newHistory: TrackEntry[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem("ecobite_history", JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to persist to localStorage", e);
    }
  };

  const handleLangToggle = () => {
    const nextLang: Language = lang === "en" ? "zh" : "en";
    setLang(nextLang);
    localStorage.setItem("ecobite_lang", nextLang);
  };

  // Helper to trigger preset food items
  const applyPresetScenario = (key: string) => {
    const scenario = mockScenarios[key];
    if (scenario) {
      setInputs({ ...scenario });
      // Reset active errors
      setErrorMess(null);
    }
  };

  // Water level micro controller helpers
  const adjustWater = (amount: number) => {
    setInputs(prev => ({
      ...prev,
      water: Math.max(0, parseFloat((prev.water + amount).toFixed(2)))
    }));
  };

  const resetWater = () => {
    setInputs(prev => ({ ...prev, water: 0 }));
  };

  // Track & Analyze handler
  const triggerHabitTracking = async () => {
    setErrorMess(null);

    // Guard: Validate that there is at least some meal text or some water
    const hasMeals = (inputs.breakfast + inputs.lunch + inputs.dinner + inputs.snacks).trim().length > 0;
    if (!hasMeals && inputs.water === 0) {
      setErrorMess(t[lang].errorEmpty);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          breakfast: inputs.breakfast,
          lunch: inputs.lunch,
          dinner: inputs.dinner,
          snacks: inputs.snacks,
          water: inputs.water
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || t[lang].errorGemini);
      }

      const report = await response.json();
      
      // Successfully fetched analysis. Formulate TrackEntry:
      const newEntry: TrackEntry = {
        id: "entry_" + Date.now(),
        date: new Date().toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", {
          year: "numeric", 
          month: "long", 
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        breakfast: inputs.breakfast,
        lunch: inputs.lunch,
        dinner: inputs.dinner,
        snacks: inputs.snacks,
        water: inputs.water,
        ratingScore: report.ratingScore ?? 5,
        ratingLabelEn: report.ratingLabelEn || "No Rating",
        ratingLabelZh: report.ratingLabelZh || "無評級",
        adviceEn: report.adviceEn || [],
        adviceZh: report.adviceZh || [],
        breakdownEn: report.breakdownEn || {
          hydration: "N/A",
          variety: "N/A",
          proteinQuality: "N/A",
          sugarProcessed: "N/A"
        },
        breakdownZh: report.breakdownZh || {
          hydration: "無分析數據",
          variety: "無分析數據",
          proteinQuality: "無分析數據",
          sugarProcessed: "無分析數據"
        },
        createdAt: Date.now()
      };

      setAnalysisResult(newEntry);
      
      // Insert at the front of history list
      const updatedHistory = [newEntry, ...history];
      saveHistoryToStorage(updatedHistory);
    } catch (err: any) {
      console.error(err);
      setErrorMess(err.message || t[lang].errorGemini);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryEntry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    saveHistoryToStorage(updated);
    if (analysisResult?.id === id) {
      setAnalysisResult(null);
    }
  };

  const clearAllHistoryLogs = () => {
    if (window.confirm(lang === "zh" ? "您確定要永久清空所有飲食快取歷史嗎？" : "Are you sure you want to permanently clear all track history?")) {
      saveHistoryToStorage([]);
      setAnalysisResult(null);
    }
  };

  // Determine dynamic visual parameters based on rating score
  const getScoreColorClass = (score: number) => {
    if (score >= 8) return { text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", ring: "stroke-emerald-500" };
    if (score >= 5) return { text: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", ring: "stroke-amber-500" };
    return { text: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200", ring: "stroke-rose-500" };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300">
      
      {/* Visual Workspace Hero Header */}
      <header id="app-workspace-header" className="bg-white border-b border-slate-200 shadow-xs h-auto py-6 sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-blue-200/50 shadow-lg">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-bold text-2xl tracking-tight text-slate-900">{t[lang].appTitle}</h1>
                <span className="text-xs font-mono font-medium tracking-wide bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full uppercase">Gemini 3.5 Active</span>
              </div>
              <p className="text-xs text-slate-500 font-sans mt-0.5 font-medium">{t[lang].appSub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              id="lang-selector"
              onClick={handleLangToggle}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-sans font-medium text-xs rounded-lg px-4 py-2.5 transition-all border border-slate-200 active:scale-95"
            >
              <Languages className="w-4 h-4 text-blue-600 animate-pulse" />
              <span>{t[lang].langToggle}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Workspace Body Context */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* Subtle Welcome Notice Tagline */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <p className="text-slate-600 font-sans text-sm md:text-base leading-relaxed">
            {t[lang].tagline}
          </p>
        </div>

        {/* Dashboard Frame Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Intake Section (7 cols) */}
          <section className="lg:col-span-7 flex flex-col gap-6" id="input-form-column">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
              
              <h2 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span>{lang === "zh" ? "今日膳食與水分日誌" : "Today's Intake Diary"}</span>
              </h2>

              {/* Breakfast Text Area */}
              <div className="mb-5">
                <label className="flex items-center justify-between mb-1.5" htmlFor="inputs-breakfast">
                  <span className="font-display font-semibold text-sm text-slate-700 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-amber-500" />
                    {t[lang].breakfast}
                  </span>
                  <span className="text-2xs text-slate-400 font-sans">{t[lang].breakfastDesc}</span>
                </label>
                <textarea
                  id="inputs-breakfast"
                  rows={2}
                  value={inputs.breakfast}
                  onChange={(e) => setInputs(prev => ({ ...prev, breakfast: e.target.value }))}
                  placeholder={t[lang].breakfastPlaceholder}
                  className="w-full text-sm font-sans bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400/80 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light"
                />
              </div>

              {/* Lunch Text Area */}
              <div className="mb-5">
                <label className="flex items-center justify-between mb-1.5" htmlFor="inputs-lunch">
                  <span className="font-display font-semibold text-sm text-slate-700 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-orange-500 animate-spin-slow" />
                    {t[lang].lunch}
                  </span>
                  <span className="text-2xs text-slate-400 font-sans">{t[lang].lunchDesc}</span>
                </label>
                <textarea
                  id="inputs-lunch"
                  rows={2}
                  value={inputs.lunch}
                  onChange={(e) => setInputs(prev => ({ ...prev, lunch: e.target.value }))}
                  placeholder={t[lang].lunchPlaceholder}
                  className="w-full text-sm font-sans bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400/80 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light"
                />
              </div>

              {/* Dinner Text Area */}
              <div className="mb-5">
                <label className="flex items-center justify-between mb-1.5" htmlFor="inputs-dinner">
                  <span className="font-display font-semibold text-sm text-slate-700 flex items-center gap-2">
                    <Moon className="w-4 h-4 text-indigo-500" />
                    {t[lang].dinner}
                  </span>
                  <span className="text-2xs text-slate-400 font-sans">{t[lang].dinnerDesc}</span>
                </label>
                <textarea
                  id="inputs-dinner"
                  rows={2}
                  value={inputs.dinner}
                  onChange={(e) => setInputs(prev => ({ ...prev, dinner: e.target.value }))}
                  placeholder={t[lang].dinnerPlaceholder}
                  className="w-full text-sm font-sans bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400/80 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light"
                />
              </div>

              {/* Snacks Text Area */}
              <div className="mb-6">
                <label className="flex items-center justify-between mb-1.5" htmlFor="inputs-snacks">
                  <span className="font-display font-semibold text-sm text-slate-700 flex items-center gap-2">
                    <Apple className="w-4 h-4 text-rose-500" />
                    {t[lang].snacks}
                  </span>
                  <span className="text-2xs text-slate-400 font-sans">{t[lang].snacksDesc}</span>
                </label>
                <textarea
                  id="inputs-snacks"
                  rows={2}
                  value={inputs.snacks}
                  onChange={(e) => setInputs(prev => ({ ...prev, snacks: e.target.value }))}
                  placeholder={t[lang].snacksPlaceholder}
                  className="w-full text-sm font-sans bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400/80 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-light"
                />
              </div>

              {/* Interactive Water Hydro Intake Gauge */}
              <div className="mb-8 border-t border-slate-100 pt-5">
                <div className="flex md:items-center flex-col md:flex-row justify-between mb-3 gap-2">
                  <div>
                    <h3 className="font-display font-semibold text-sm text-slate-700 flex items-center gap-2">
                      <Droplets className="w-4.5 h-4.5 text-blue-500 fill-blue-100" />
                      {t[lang].waterTitle}
                    </h3>
                    <p className="text-3xs text-slate-400">{t[lang].waterDesc}</p>
                  </div>

                  {/* Liters input with +/- adjusters */}
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <input
                      id="inputs-water-manual"
                      type="number"
                      step="0.1"
                      min="0"
                      max="15"
                      value={inputs.water}
                      onChange={(e) => setInputs(prev => ({ ...prev, water: Math.max(0, parseFloat(parseFloat(e.target.value).toFixed(2)) || 0) }))}
                      className="w-16 text-center text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-lg p-1 text-slate-800"
                    />
                    <span className="text-2xs font-bold text-slate-500">{t[lang].waterUnit}</span>
                  </div>
                </div>

                {/* Simulated Water Reservoir Bar */}
                <div className="bg-slate-100 h-8 rounded-xl w-full overflow-hidden relative border border-slate-200 flex items-center justify-between px-4 mb-4">
                  {/* Fluid Dynamic Filling with Motion */}
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 bg-blue-500/80"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (inputs.water / 3.0) * 100)}%` }}
                    transition={{ type: "spring", stiffness: 60 }}
                  />

                  {/* Water Overlay Labels */}
                  <span className="text-xs font-bold text-slate-700 z-10 drop-shadow-xs flex items-center gap-1">
                    {inputs.water} L {inputs.water >= 2.0 ? "💧 ✅" : ""}
                  </span>
                  
                  <span className="text-2xs font-mono text-slate-500 z-10 bg-white/75 border border-slate-105 px-1.5 py-0.5 rounded-sm">
                    {inputs.water >= 3.0 ? (lang === "zh" ? "補水極其充足" : "Excellent Hydration") : `${Math.round(Math.min(100, (inputs.water / 3.0) * 105))}% Target`}
                  </span>
                </div>

                {/* Instant hydro toggles */}
                <div className="flex items-center justify-between">
                  <span className="text-3xs text-slate-400 font-semibold tracking-wider uppercase">{t[lang].waterQuickButtons}</span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    <button
                      id="water-add-cup"
                      onClick={() => adjustWater(0.25)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-3xs font-semibold px-2.5 py-1.5 transition-all text-center flex items-center gap-1 active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{t[lang].waterGlass}</span>
                    </button>
                    <button
                      id="water-add-bottle"
                      onClick={() => adjustWater(0.5)}
                      className="bg-blue-50 hover:bg-blue-105 text-blue-700 border border-blue-200 rounded-lg text-3xs font-semibold px-2.5 py-1.5 transition-all text-center flex items-center gap-1 active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{t[lang].waterBottle}</span>
                    </button>
                    <button
                      id="water-clear-btn"
                      onClick={resetWater}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-3xs font-semibold px-2 py-1.5 transition-all text-center flex items-center gap-1 active:scale-95"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{t[lang].waterClear}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Status or Error Notifications */}
              <AnimatePresence>
                {errorMess && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-3.5 flex items-start gap-2.5 text-xs font-sans leading-relaxed"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMess}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Big Track Action Trigger Button */}
              <button
                id="btn-track-diet"
                disabled={loading}
                onClick={triggerHabitTracking}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-display font-bold text-sm py-4 rounded-xl shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 active:translate-y-0.5 transition-all flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-wait"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{t[lang].trackingStatus}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 animate-pulse text-blue-100" />
                    <span className="tracking-wide uppercase text-2xs md:text-xs">{t[lang].trackHabitBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Presets / Testing Panel */}
            <div className="bg-slate-100 rounded-2xl border border-slate-200 p-5 mt-2">
              <h3 className="font-display font-semibold text-xs text-slate-700 mb-1 flex items-center gap-1.5 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                {t[lang].quickTemplatesTitle}
              </h3>
              <p className="text-3xs text-slate-505 mb-4 font-sans">{t[lang].quickTemplatesDesc}</p>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  id="preset-balanced"
                  onClick={() => applyPresetScenario("balancedLowFat")}
                  className="bg-white hover:bg-blue-50 text-left border border-slate-200 hover:border-blue-300 rounded-xl p-3 text-slate-800 transition-all active:scale-98 group flex flex-col justify-between"
                >
                  <span className="text-2xs font-bold text-blue-650 group-hover:text-blue-700 flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {t[lang].balancedLowFat}
                  </span>
                  <span className="text-3xs text-slate-500 line-clamp-1">Salmon, Veggies, Scrambled eggs</span>
                </button>

                <button
                  id="preset-sugary"
                  onClick={() => applyPresetScenario("sweetHighSugar")}
                  className="bg-white hover:bg-rose-50 text-left border border-slate-200 hover:border-rose-300 rounded-xl p-3 text-slate-800 transition-all active:scale-98 group flex flex-col justify-between"
                >
                  <span className="text-2xs font-bold text-rose-600 group-hover:text-rose-700 flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                    {t[lang].sweetHighSugar}
                  </span>
                  <span className="text-3xs text-slate-500 line-clamp-1">Sweet Macchiato, Donut, Fries, Pizza</span>
                </button>

                <button
                  id="preset-vegan"
                  onClick={() => applyPresetScenario("healthyVegan")}
                  className="bg-white hover:bg-teal-50 text-left border border-slate-200 hover:border-teal-300 rounded-xl p-3 text-slate-800 transition-all active:scale-98 group flex flex-col justify-between"
                >
                  <span className="text-2xs font-bold text-teal-600 group-hover:text-teal-700 flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                    {t[lang].healthyVegan}
                  </span>
                  <span className="text-3xs text-slate-500 line-clamp-1">Steel-cut oats, Smoked tofu salad</span>
                </button>

                <button
                  id="preset-skipped"
                  onClick={() => applyPresetScenario("skippedMeals")}
                  className="bg-white hover:bg-indigo-50 text-left border border-slate-200 hover:border-indigo-300 rounded-xl p-3 text-slate-800 transition-all active:scale-98 group flex flex-col justify-between"
                >
                  <span className="text-2xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    {t[lang].skippedMeals}
                  </span>
                  <span className="text-3xs text-slate-550 line-clamp-1">Skipped all meals, late night ramen</span>
                </button>
              </div>
            </div>

          </section>

          {/* Right Column: AI Insights & Habit Rating Result (5 cols) */}
          <section className="lg:col-span-5 flex flex-col gap-6" id="insights-result-column">
            
            <AnimatePresence mode="wait">
              {analysisResult ? (
                <motion.div
                  key={analysisResult.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden"
                >
                  {/* Decorative rating marker background badge */}
                  <div className="absolute top-0 right-0 py-1.5 px-3 bg-blue-50 text-blue-800 font-mono text-xs font-bold tracking-wider rounded-bl-xl border-l border-b border-blue-105 flex items-center gap-1 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t[lang].todayTag}</span>
                  </div>

                  <h3 className="font-display font-bold text-slate-800 text-lg mb-6 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>{t[lang].ratingResultTitle}</span>
                  </h3>

                  {/* Rating Visual Circle and Score Display */}
                  <div className="flex flex-col items-center justify-center my-6 py-4 bg-slate-50/50 rounded-xl border border-slate-100">
                    
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      {/* Dynamic color circle border */}
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="56"
                          cy="56"
                          r="46"
                          className="stroke-slate-100"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="56"
                          cy="56"
                          r="46"
                          className={`${getScoreColorClass(analysisResult.ratingScore).ring}`}
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 46}
                          initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 46 * (1 - analysisResult.ratingScore / 10) }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          strokeLinecap="round"
                        />
                      </svg>
                      
                      {/* Internal text representation */}
                      <div className="absolute flex flex-col items-center">
                        <span className={`text-4xl font-display font-bold ${getScoreColorClass(analysisResult.ratingScore).text}`}>
                          {analysisResult.ratingScore}
                        </span>
                        <span className="text-4xs text-slate-450 uppercase font-mono tracking-wider font-semibold">
                          {t[lang].scoreOf10}
                        </span>
                      </div>
                    </div>

                    {/* Overall rating descriptive box */}
                    <div className="mt-4 text-center px-4">
                      <p className="text-3xs text-slate-450 uppercase tracking-widest font-mono font-bold mb-1">
                        {t[lang].habitsRatingTitle}
                      </p>
                      <h4 className={`text-base font-display font-bold ${getScoreColorClass(analysisResult.ratingScore).text}`}>
                        {lang === "zh" ? analysisResult.ratingLabelZh : analysisResult.ratingLabelEn}
                      </h4>
                      <p className="text-3xs text-slate-500 mt-1 max-w-xs">{t[lang].ratingDesc}</p>
                    </div>

                  </div>

                  {/* Micro breakdown analysis grids */}
                  <div className="mb-6">
                    <h4 className="font-display font-semibold text-xs text-slate-700 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span>{t[lang].habitsAdviceTitle}</span>
                    </h4>

                    {/* Matrix Cards for Categories */}
                    <div className="flex flex-col gap-3 font-sans">
                      
                      {/* Grid 1: Hydration */}
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                          <Droplets className="w-3.5 h-3.5 fill-blue-500" />
                        </div>
                        <div>
                          <p className="text-2xs font-bold text-slate-700">{t[lang].hydrationHeading}</p>
                          <p className="text-3xs text-slate-550 leading-relaxed mt-0.5 font-light">
                            {lang === "zh" ? analysisResult.breakdownZh.hydration : analysisResult.breakdownEn.hydration}
                          </p>
                        </div>
                      </div>

                      {/* Grid 2: Variety */}
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                          <Apple className="w-3.5 h-3.5 fill-emerald-500" />
                        </div>
                        <div>
                          <p className="text-2xs font-bold text-slate-700">{t[lang].varietyHeading}</p>
                          <p className="text-3xs text-slate-550 leading-relaxed mt-0.5 font-light">
                            {lang === "zh" ? analysisResult.breakdownZh.variety : analysisResult.breakdownEn.variety}
                          </p>
                        </div>
                      </div>

                      {/* Grid 3: Protein Quality */}
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-2xs font-bold text-slate-700">{t[lang].proteinHeading}</p>
                          <p className="text-3xs text-slate-550 leading-relaxed mt-0.5 font-light">
                            {lang === "zh" ? analysisResult.breakdownZh.proteinQuality : analysisResult.breakdownEn.proteinQuality}
                          </p>
                        </div>
                      </div>

                      {/* Grid 4: Sweet/Processed */}
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="p-1.5 rounded-lg bg-rose-100 text-rose-800 shrink-0 mt-0.5">
                          <Cookie className="w-3.5 h-3.5 fill-rose-500" />
                        </div>
                        <div>
                          <p className="text-2xs font-bold text-slate-700">{t[lang].sugarHeading}</p>
                          <p className="text-3xs text-slate-550 leading-relaxed mt-0.5 font-light">
                            {lang === "zh" ? analysisResult.breakdownZh.sugarProcessed : analysisResult.breakdownEn.sugarProcessed}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 3 Step Recommendation Block */}
                  <div className="bg-blue-50/55 border border-blue-100 rounded-xl p-4.5 mt-2">
                    <h4 className="font-display font-semibold text-xs text-blue-800 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-blue-600 fill-blue-100" />
                      <span>{t[lang].actionablePlan}</span>
                    </h4>

                    <ol className="flex flex-col gap-3 font-sans">
                      {(lang === "zh" ? analysisResult.adviceZh : analysisResult.adviceEn).map((advice, i) => (
                        <li key={i} className="flex gap-3 text-3xs text-slate-650 leading-relaxed">
                          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-3xs font-bold shrink-0 font-mono">
                            {i+1}
                          </span>
                          <span className="mt-0.5 font-medium">{advice}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                </motion.div>
              ) : (
                /* Static placeholder card before tracking */
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 font-sans shadow-2xs flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-350 border border-slate-200">
                    <UtensilsCrossed className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-slate-755 text-sm md:text-base mb-1">{t[lang].resultsTitle}</h3>
                  <p className="text-3xs text-slate-400 max-w-sm mt-1.5 leading-relaxed">
                    {lang === "zh" 
                      ? "您在此輸入的膳食、垃圾食物與飲水量，將透過專用後端發送給臨床 AI。點擊「分析飲食習慣」後，即時在此處生成健康指標、營養雷達與調理方案。"
                      : "The meal logs, snack recordings, and daily fluid entries you supply will be transferred to our clinic engine. Submit the tracking module above to trigger the real-time wellness audit here."}
                  </p>

                  <div className="mt-6 flex flex-col gap-2 w-full max-w-xs border-t border-slate-100 pt-5">
                    <div className="flex items-center justify-between text-4xs font-semibold tracking-wider text-slate-400/80 uppercase">
                      <span>{lang === "zh" ? "支持的科學指標：" : "Scientific standards supported:"}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center mt-1">
                      <span className="bg-slate-50 text-slate-500 text-4xs px-2 py-1 rounded border border-slate-200">Water Balance (L)</span>
                      <span className="bg-slate-50 text-slate-500 text-4xs px-2 py-1 rounded border border-slate-200">Glycemic Variety</span>
                      <span className="bg-slate-50 text-slate-500 text-4xs px-2 py-1 rounded border border-slate-200">Lean Protein Ratio</span>
                    </div>
                  </div>
                </div>
              )}
            </AnimatePresence>

          </section>

        </div>

        {/* History / Trend Tracking Timeline Component */}
         <section className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs" id="history-logs-timeline">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
            <div>
              <h2 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span>{t[lang].historySectionTitle}</span>
              </h2>
              <p className="text-xs text-slate-500 font-sans mt-0.5">{lang === "zh" ? "追蹤隨時間推移的營養評分趨勢與水合紀錄" : "Review your historic trend, water benchmarks, and average dietitian scorecard"}</p>
            </div>

            {history.length > 0 && (
              <button
                id="clear-all-history"
                onClick={clearAllHistoryLogs}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 px-3.5 py-2 rounded-lg border border-rose-200 flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t[lang].clearLogs}</span>
              </button>
            )}
          </div>

          {/* Render Timeline entries */}
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-sans flex flex-col items-center justify-center">
              <Clock className="w-10 h-10 text-slate-300 stroke-1 mb-2 animate-pulse" />
              <p className="text-xs text-slate-500 max-w-sm mt-1">{t[lang].noHistoryDesc}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              
              {/* Score timeline visual preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-150">
                {history.slice(0, 14).reverse().map((entry, idx) => (
                  <div 
                    key={entry.id} 
                    onClick={() => setAnalysisResult(entry)}
                    className="bg-white rounded-lg p-3 text-center border border-slate-250 hover:border-blue-300 transition-all cursor-pointer shadow-3xs hover:shadow-2xs flex flex-col justify-between items-center"
                  >
                    <span className="text-4xs text-slate-400 font-mono font-medium truncate block w-full">{entry.date.replace(/,.*$/, "")}</span>
                    <div className="my-2">
                      <span className={`text-xl font-display font-black ${getScoreColorClass(entry.ratingScore).text}`}>
                        {entry.ratingScore}
                      </span>
                      <span className="text-4xs text-slate-400">/10</span>
                    </div>
                    <span className={`text-4xs font-bold px-1.5 py-0.5 rounded ${getScoreColorClass(entry.ratingScore).bg} ${getScoreColorClass(entry.ratingScore).text} text-center truncate max-w-full block`}>
                      {lang === "zh" ? entry.ratingLabelZh : entry.ratingLabelEn}
                    </span>
                  </div>
                ))}
              </div>

              {/* Accordion Lists of detail logs */}
              <div className="flex flex-col gap-4 font-sans max-h-[500px] overflow-y-auto pr-1">
                {history.map((entry) => {
                  const itemColor = getScoreColorClass(entry.ratingScore);
                  return (
                    <div
                      key={entry.id}
                      onClick={() => setAnalysisResult(entry)}
                      className={`group border rounded-xl p-4 transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300`}
                    >
                      <div className="flex items-start gap-3.5 w-full md:w-3/4">
                        <div className={`w-10 h-10 rounded-lg ${itemColor.bg} ${itemColor.text} flex items-center justify-center text-sm font-display font-extrabold shadow-3xs shrink-0 mt-0.5`}>
                          {entry.ratingScore}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-2xs font-bold text-slate-500 font-mono flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {entry.date}
                            </span>
                            <span className="text-2xs font-bold text-slate-450">•</span>
                            <span className={`text-2xs font-extrabold px-2 py-0.5 rounded-full ${itemColor.bg} ${itemColor.text}`}>
                              {lang === "zh" ? entry.ratingLabelZh : entry.ratingLabelEn}
                            </span>
                          </div>

                          {/* Quick Summary list of logged food */}
                          <div className="text-3xs text-slate-550 mt-2 line-clamp-1">
                            <strong className="text-slate-600 font-semibold">{t[lang].foodIntakeHeader} </strong>
                            {[
                              entry.breakfast && `🌅 [B] ${entry.breakfast}`,
                              entry.lunch && `☀️ [L] ${entry.lunch}`,
                              entry.dinner && `🌙 [D] ${entry.dinner}`,
                              entry.snacks && `🍎 [S] ${entry.snacks}`
                            ].filter(Boolean).join(" | ")}
                          </div>
                        </div>
                      </div>

                      {/* Right metadata columns */}
                      <div className="flex sm:items-center justify-between sm:justify-end gap-5 w-full md:w-auto mt-2 md:mt-0 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                        <div className="flex items-center gap-1.5 font-mono text-2xs font-semibold text-slate-550">
                          <Droplets className="w-4 h-4 text-blue-500 fill-blue-50 text-center" />
                          <span>{entry.water} L / 3.0L</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            id={`view-detail-${entry.id}`}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-4xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 uppercase transition-all"
                          >
                            {t[lang].viewDetails}
                          </button>
                          <button
                            id={`delete-log-${entry.id}`}
                            onClick={(e) => deleteHistoryEntry(entry.id, e)}
                            className="text-slate-400 hover:text-rose-600 p-1.5 rounded-md hover:bg-slate-200/50 transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </section>

      </main>

      {/* Footer footprint explanation */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-center text-slate-400 text-3xs font-sans">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="max-w-3xl mx-auto text-slate-500 leading-relaxed font-light mb-4">
            {t[lang].aboutAIFootnote}
          </p>
          <div className="flex justify-center items-center gap-2 border-t border-slate-105 pt-5 text-slate-400 font-mono">
            <span>EcoBite Clean Eating Index</span>
            <span>•</span>
            <span>All Rights Localized</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
