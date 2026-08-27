import type { Feature } from "@/types/feature";

export type ChronologicalOrder = "oldest" | "newest";

export function sortByCreatedAt<T extends Pick<Feature, "createdAt">>(
  features: T[],
  order: ChronologicalOrder,
): T[] {
  const direction = order === "oldest" ? 1 : -1;

  return [...features].sort(
    (a, b) =>
      direction *
      (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
  );
}
