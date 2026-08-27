"use client";

import { useEffect, useState } from "react";
import type { Feature } from "@/types/feature";
import { FeatureForm, type FeatureFormValues } from "@/components/FeatureForm";
import { FeatureList } from "@/components/FeatureList";
import { fetchFeatures, insertFeature } from "@/lib/features-repository";

export function FeatureCapture() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeatures()
      .then(setFeatures)
      .catch(() => setError("No pudimos cargar las features. Probá recargar la página."))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleAddFeature(values: FeatureFormValues) {
    setError(null);
    try {
      const feature = await insertFeature(values);
      setFeatures((prev) => [feature, ...prev]);
    } catch {
      setError("No pudimos guardar la feature. Probá de nuevo.");
    }
  }

  return (
    <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <FeatureForm onSubmit={handleAddFeature} />
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Ranking RICE
        </h2>
        {error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
            {error}
          </p>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white p-10 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
            Cargando features...
          </div>
        ) : (
          <FeatureList features={features} />
        )}
      </div>
    </div>
  );
}
