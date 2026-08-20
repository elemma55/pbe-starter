export type FeatureStatus =
  | "idea"
  | "en_evaluacion"
  | "priorizada"
  | "en_desarrollo"
  | "lanzada";

export interface Feature {
  id: string;
  title: string;
  description: string;
  category: string;
  status: FeatureStatus;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  createdAt: string;
}
