import type { Feature } from "@/types/feature";
import { IMPACT_OPTIONS } from "@/lib/feature-options";

interface ImpactEffortMatrixProps {
  features: Feature[];
}

const IMPACT_MIN = IMPACT_OPTIONS[0].value;
const IMPACT_MAX = IMPACT_OPTIONS[IMPACT_OPTIONS.length - 1].value;

const QUADRANT_LABELS = [
  { label: "Quick Wins", className: "items-start justify-start text-left" },
  { label: "Big Bets", className: "items-start justify-end text-right" },
  { label: "Fill-ins", className: "items-end justify-start text-left" },
  { label: "Time Sinks", className: "items-end justify-end text-right" },
];

export function ImpactEffortMatrix({ features }: ImpactEffortMatrixProps) {
  if (features.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 bg-white p-10 text-center dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Todavía no capturaste ninguna feature.
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Usá el formulario para agregar la primera.
        </p>
      </div>
    );
  }

  const effortMax = Math.max(...features.map((f) => f.effort), 1) * 1.2;

  const points = features.map((feature) => ({
    feature,
    x: Math.min(100, (feature.effort / effortMax) * 100),
    y: 100 - ((feature.impact - IMPACT_MIN) / (IMPACT_MAX - IMPACT_MIN)) * 100,
  }));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex flex-col items-center justify-between py-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>Alto</span>
          <span className="my-2 font-medium text-zinc-600 dark:text-zinc-300">Impact</span>
          <span>Bajo</span>
        </div>

        <div className="relative aspect-[4/3] w-full rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="pointer-events-none absolute inset-0 grid grid-cols-2 grid-rows-2">
            {QUADRANT_LABELS.map(({ label, className }) => (
              <div key={label} className={`flex p-3 ${className}`}>
                <span className="text-xs font-medium text-zinc-400 dark:text-zinc-600">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-zinc-200 dark:bg-zinc-800" />

          {points.map(({ feature, x, y }) => (
            <button
              key={feature.id}
              type="button"
              className="group absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500 ring-2 ring-white dark:bg-indigo-400 dark:ring-zinc-900" />
              <span className="pointer-events-none absolute bottom-full z-10 mb-1 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus:opacity-100 dark:bg-zinc-50 dark:text-zinc-900">
                {feature.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pl-8 text-xs text-zinc-500 dark:text-zinc-400">
        <span>Bajo</span>
        <span className="font-medium text-zinc-600 dark:text-zinc-300">Effort</span>
        <span>Alto</span>
      </div>
    </div>
  );
}
