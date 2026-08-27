import { supabase } from "@/lib/supabase";
import type { Feature } from "@/types/feature";

type FeatureRow = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: Feature["status"];
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  created_at: string;
};

function toFeature(row: FeatureRow): Feature {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    status: row.status,
    reach: row.reach,
    impact: row.impact,
    confidence: row.confidence,
    effort: row.effort,
    createdAt: row.created_at,
  };
}

export async function fetchFeatures(): Promise<Feature[]> {
  const { data, error } = await supabase
    .from("features")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data as FeatureRow[]).map(toFeature);
}

export async function insertFeature(
  values: Omit<Feature, "id" | "createdAt">,
): Promise<Feature> {
  const { data, error } = await supabase
    .from("features")
    .insert({
      title: values.title,
      description: values.description,
      category: values.category,
      status: values.status,
      reach: values.reach,
      impact: values.impact,
      confidence: values.confidence,
      effort: values.effort,
    })
    .select("*")
    .single();

  if (error) throw error;

  return toFeature(data as FeatureRow);
}
