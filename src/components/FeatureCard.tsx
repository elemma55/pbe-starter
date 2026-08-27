import type { Feature } from "@/types/feature";
import { STATUS_LABELS } from "@/lib/feature-options";
import { calculateRiceScore } from "@/lib/rice";

interface FeatureCardProps {
  feature: Feature;
  rank?: number;
}

export function FeatureCard({ feature, rank }: FeatureCardProps) {
  return (
    <li className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-baseline gap-2">
          {rank !== undefined && (
            <span className="text-sm font-semibold text-zinc-400 dark:text-zinc-500">
              #{rank}
            </span>
          )}
          <h3 className="font-medium text-zinc-900 dark:text-zinc-50">
            {feature.title}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs font-medium text-white dark:bg-zinc-50 dark:text-zinc-900">
            RICE {calculateRiceScore(feature).toFixed(1)}
          </span>
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {STATUS_LABELS[feature.status]}
          </span>
        </div>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.description}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
        <span>Categoría: {feature.category}</span>
        <span>Reach: {feature.reach}</span>
        <span>Impact: {feature.impact}</span>
        <span>Confidence: {feature.confidence}</span>
        <span>Effort: {feature.effort}</span>
      </div>
    </li>
  );
}
