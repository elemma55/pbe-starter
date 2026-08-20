import type { FeatureStatus } from "@/types/feature";

export const STATUS_OPTIONS: { value: FeatureStatus; label: string }[] = [
  { value: "idea", label: "Idea" },
  { value: "en_evaluacion", label: "En evaluación" },
  { value: "priorizada", label: "Priorizada" },
  { value: "en_desarrollo", label: "En desarrollo" },
  { value: "lanzada", label: "Lanzada" },
];

export const STATUS_LABELS: Record<FeatureStatus, string> = STATUS_OPTIONS.reduce(
  (acc, option) => {
    acc[option.value] = option.label;
    return acc;
  },
  {} as Record<FeatureStatus, string>,
);

export const IMPACT_OPTIONS = [
  { value: 0.25, label: "Mínimo (0.25)" },
  { value: 0.5, label: "Bajo (0.5)" },
  { value: 1, label: "Medio (1)" },
  { value: 2, label: "Alto (2)" },
  { value: 3, label: "Masivo (3)" },
];

export const CONFIDENCE_OPTIONS = [
  { value: 0.5, label: "Baja (50%)" },
  { value: 0.8, label: "Media (80%)" },
  { value: 1, label: "Alta (100%)" },
];
