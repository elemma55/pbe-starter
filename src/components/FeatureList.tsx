"use client";

import { useState } from "react";
import type { Feature } from "@/types/feature";
import { FeatureCard } from "@/components/FeatureCard";
import { sortByCreatedAt, type ChronologicalOrder } from "@/lib/feature-sort";

interface FeatureListProps {
  features: Feature[];
}

const ORDER_OPTIONS: { value: ChronologicalOrder; label: string }[] = [
  { value: "oldest", label: "Más antiguas primero" },
  { value: "newest", label: "Más nuevas primero" },
];

export function FeatureList({ features }: FeatureListProps) {
  const [order, setOrder] = useState<ChronologicalOrder>("oldest");

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

  const sorted = sortByCreatedAt(features, order);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-end gap-2">
        <label htmlFor="order" className="text-sm text-zinc-600 dark:text-zinc-400">
          Ordenar por
        </label>
        <select
          id="order"
          className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500"
          value={order}
          onChange={(e) => setOrder(e.target.value as ChronologicalOrder)}
        >
          {ORDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <ul className="flex flex-col gap-3">
        {sorted.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </ul>
    </div>
  );
}
