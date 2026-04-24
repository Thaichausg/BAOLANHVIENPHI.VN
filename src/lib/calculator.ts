// Calculator logic for insurance premium estimation
// Based on real Generali VITA pricing structure (approximated ranges)

export type CoverageTier = "saving" | "standard" | "premium" | "vip" | "diamond";

export interface CalculatorInput {
  age: number;
  gender: "male" | "female";
  people: number;
  region: "hcm" | "hn" | "other";
  plan: "basic" | "advanced";
  tier: CoverageTier;
}

export interface CalculatorOutput {
  minMonthly: number;
  maxMonthly: number;
  minYearly: number;
  maxYearly: number;
  badge: string | null;
  personalLine: string;
  tierName: string;
}

// Base monthly premiums (thousands VND) per age range
const BASE_PREMIUM: Record<string, { basic: number; advanced: number }> = {
  "0-5": { basic: 450, advanced: 850 },
  "6-18": { basic: 380, advanced: 720 },
  "19-30": { basic: 520, advanced: 980 },
  "31-40": { basic: 680, advanced: 1280 },
  "41-50": { basic: 920, advanced: 1750 },
  "51-60": { basic: 1350, advanced: 2500 },
  "61-65": { basic: 1800, advanced: 3400 },
};

function getAgeRange(age: number): string {
  if (age <= 5) return "0-5";
  if (age <= 18) return "6-18";
  if (age <= 30) return "19-30";
  if (age <= 40) return "31-40";
  if (age <= 50) return "41-50";
  if (age <= 60) return "51-60";
  return "61-65";
}

// Region multiplier
const REGION_MULTIPLIER: Record<string, number> = {
  hcm: 1.15,
  hn: 1.1,
  other: 1.0,
};

// Gender multiplier (women slightly higher due to maternity benefits)
const GENDER_MULTIPLIER: Record<string, number> = {
  male: 1.0,
  female: 1.08,
};

// Coverage tier multiplier – adjusts estimate based on selected coverage level
const TIER_MULTIPLIER: Record<CoverageTier, number> = {
  saving: 0.7,
  standard: 1.0,
  premium: 1.45,
  vip: 2.2,
  diamond: 3.8,
};

// Tier display names
export const TIER_NAMES: Record<CoverageTier, string> = {
  saving: "Tiết kiệm – 120 triệu/năm",
  standard: "Tiêu chuẩn – 350 triệu/năm",
  premium: "Cao cấp – 650 triệu/năm",
  vip: "VIP – 1,4 tỷ/năm",
  diamond: "Kim cương – 5 tỷ/năm",
};

export const TIER_SHORT_NAMES: Record<CoverageTier, string> = {
  saving: "Tiết kiệm",
  standard: "Tiêu chuẩn",
  premium: "Cao cấp",
  vip: "VIP",
  diamond: "Kim cương",
};

// Multi-person discount
function getMultiDiscount(people: number): number {
  if (people >= 4) return 0.88;
  if (people === 3) return 0.92;
  if (people === 2) return 0.95;
  return 1.0;
}

export function calculatePremium(input: CalculatorInput): CalculatorOutput {
  const ageRange = getAgeRange(input.age);
  const base = BASE_PREMIUM[ageRange][input.plan];
  const regionMul = REGION_MULTIPLIER[input.region];
  const genderMul = GENDER_MULTIPLIER[input.gender];
  const discount = getMultiDiscount(input.people);
  const tierMul = TIER_MULTIPLIER[input.tier];

  const estimated = base * regionMul * genderMul * discount * tierMul;

  // Add variance range (±12%)
  const minMonthly = Math.round(estimated * 0.88);
  const maxMonthly = Math.round(estimated * 1.12);
  const minYearly = minMonthly * 12;
  const maxYearly = maxMonthly * 12;

  // Badge logic
  let badge: string | null = null;
  if (input.tier === "premium" || input.tier === "standard") {
    badge = "Phổ biến nhất";
  } else if (input.tier === "diamond" || input.tier === "vip") {
    badge = "Bảo vệ toàn diện";
  } else if (input.people >= 3) {
    badge = "Ưu đãi gia đình";
  }

  // Generate personal line
  const ageGroup = input.age < 30 ? "trẻ" : input.age < 50 ? "độ tuổi vàng" : "trung niên";
  const tierName = TIER_SHORT_NAMES[input.tier];

  const personalLine = `Người ${input.age} tuổi ${ageGroup} như bạn thường chọn hạng mức ${tierName} từ ${formatCurrency(minMonthly)}–${formatCurrency(maxMonthly)}/tháng`;

  return {
    minMonthly,
    maxMonthly,
    minYearly,
    maxYearly,
    badge,
    personalLine,
    tierName,
  };
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000) {
    const millions = amount / 1000;
    return `${millions.toFixed(1).replace(/\.0$/, "")} triệu`;
  }
  return `${amount} nghìn`;
}

export function formatCurrencyShort(amount: number): string {
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1).replace(/\.0$/, "")}tr`;
  }
  return `${amount}k`;
}
