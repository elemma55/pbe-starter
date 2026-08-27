"use client";

import { useEffect, useRef } from "react";
import type { Feature } from "@/types/feature";
import { FeatureCard } from "@/components/FeatureCard";
import { sortByRiceScoreDesc } from "@/lib/rice";

interface RiceRankingModalProps {
  features: Feature[];
  open: boolean;
  onClose: () => void;
}

export function RiceRankingModal({ features, open, onClose }: RiceRankingModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const ranked = sortByRiceScoreDesc(features);

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      className="m-auto w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-6 text-zinc-900 backdrop:bg-black/50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Ranking RICE</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="rounded-md px-2 py-1 text-sm text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          Cerrar
        </button>
      </div>

      {ranked.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Todavía no capturaste ninguna feature.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Usá el formulario para agregar la primera.
          </p>
        </div>
      ) : (
        <ul className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto">
          {ranked.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} rank={index + 1} />
          ))}
        </ul>
      )}
    </dialog>
  );
}
