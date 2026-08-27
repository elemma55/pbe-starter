"use client";

import { useEffect, useState } from "react";
import type { Feature } from "@/types/feature";
import { FeatureForm, type FeatureFormValues } from "@/components/FeatureForm";
import { FeatureList } from "@/components/FeatureList";
import { RiceRankingModal } from "@/components/RiceRankingModal";
import { ImpactEffortMatrix } from "@/components/ImpactEffortMatrix";
import { fetchFeatures, insertFeature } from "@/lib/features-repository";

type Tab = "features" | "matriz";

const TABS: { value: Tab; label: string }[] = [
  { value: "features", label: "Features" },
  { value: "matriz", label: "Matriz" },
];

export function FeatureCapture() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("features");

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
    <div className="flex w-full max-w-5xl flex-col gap-6">
      <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`-mb-px border-b-2 px-1 pb-2 text-sm font-medium transition ${
              activeTab === tab.value
                ? "border-zinc-900 text-zinc-900 dark:border-zinc-50 dark:text-zinc-50"
                : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </p>
      )}

      {activeTab === "features" ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <FeatureForm onSubmit={handleAddFeature} />
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Features
              </h2>
              <button
                type="button"
                onClick={() => setIsRankingOpen(true)}
                className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Ver ranking RICE
              </button>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white p-10 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                Cargando features...
              </div>
            ) : (
              <FeatureList features={features} />
            )}
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-white p-10 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
          Cargando features...
        </div>
      ) : (
        <ImpactEffortMatrix features={features} />
      )}

      <RiceRankingModal
        features={features}
        open={isRankingOpen}
        onClose={() => setIsRankingOpen(false)}
      />
    </div>
  );
}
