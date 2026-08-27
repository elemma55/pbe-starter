import type { Feature } from "@/types/feature";

type RiceInputs = Pick<Feature, "reach" | "impact" | "confidence" | "effort">;

export function calculateRiceScore({ reach, impact, confidence, effort }: RiceInputs) {
  return (reach * impact * confidence) / effort;
}

export function sortByRiceScoreDesc<T extends RiceInputs>(features: T[]): T[] {
  return [...features].sort((a, b) => calculateRiceScore(b) - calculateRiceScore(a));
}
