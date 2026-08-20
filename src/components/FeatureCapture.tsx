"use client";

import { useState } from "react";
import type { Feature } from "@/types/feature";
import { FeatureForm, type FeatureFormValues } from "@/components/FeatureForm";
import { FeatureList } from "@/components/FeatureList";

export function FeatureCapture() {
  const [features, setFeatures] = useState<Feature[]>([]);

  function handleAddFeature(values: FeatureFormValues) {
    const feature: Feature = {
      ...values,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setFeatures((prev) => [feature, ...prev]);
  }

  return (
    <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <FeatureForm onSubmit={handleAddFeature} />
      <FeatureList features={features} />
    </div>
  );
}
