export interface TrackEntry {
  id: string;
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  water: number; // in liters
  ratingScore: number; // 1-10
  ratingLabelEn: string;
  ratingLabelZh: string;
  adviceEn: string[];
  adviceZh: string[];
  breakdownEn: {
    hydration: string;
    variety: string;
    proteinQuality: string;
    sugarProcessed: string;
  };
  breakdownZh: {
    hydration: string;
    variety: string;
    proteinQuality: string;
    sugarProcessed: string;
  };
  createdAt: number; // epoch timestamp
}

export type Language = "en" | "zh";

export interface MealInputs {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
  water: number;
}
