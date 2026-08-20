"use client";

import { useState } from "react";
import type { Feature, FeatureStatus } from "@/types/feature";
import {
  CONFIDENCE_OPTIONS,
  IMPACT_OPTIONS,
  STATUS_OPTIONS,
} from "@/lib/feature-options";

export type FeatureFormValues = Omit<Feature, "id" | "createdAt">;

interface FormState {
  title: string;
  description: string;
  category: string;
  status: FeatureStatus;
  reach: string;
  impact: string;
  confidence: string;
  effort: string;
}

const INITIAL_STATE: FormState = {
  title: "",
  description: "",
  category: "",
  status: "idea",
  reach: "",
  impact: "",
  confidence: "",
  effort: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.title.trim()) {
    errors.title = "El título es obligatorio.";
  }

  if (!values.description.trim()) {
    errors.description = "La descripción es obligatoria.";
  }

  if (!values.category.trim()) {
    errors.category = "La categoría es obligatoria.";
  }

  const reachNumber = Number(values.reach);
  if (!values.reach.trim()) {
    errors.reach = "El alcance es obligatorio.";
  } else if (!Number.isFinite(reachNumber) || reachNumber <= 0) {
    errors.reach = "El alcance debe ser un número mayor a 0.";
  }

  if (!values.impact) {
    errors.impact = "Elegí un nivel de impacto.";
  }

  if (!values.confidence) {
    errors.confidence = "Elegí un nivel de confianza.";
  }

  const effortNumber = Number(values.effort);
  if (!values.effort.trim()) {
    errors.effort = "El esfuerzo es obligatorio.";
  } else if (!Number.isFinite(effortNumber) || effortNumber <= 0) {
    errors.effort = "El esfuerzo debe ser un número mayor a 0.";
  }

  return errors;
}

interface FeatureFormProps {
  onSubmit: (values: FeatureFormValues) => void;
}

export function FeatureForm({ onSubmit }: FeatureFormProps) {
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category.trim(),
      status: values.status,
      reach: Number(values.reach),
      impact: Number(values.impact),
      confidence: Number(values.confidence),
      effort: Number(values.effort),
    });

    setValues(INITIAL_STATE);
    setErrors({});
  }

  const inputClasses =
    "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500";
  const labelClasses = "text-sm font-medium text-zinc-700 dark:text-zinc-300";
  const errorClasses = "text-sm text-red-600 dark:text-red-400";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Nueva feature
      </h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className={labelClasses}>
          Título
        </label>
        <input
          id="title"
          type="text"
          className={inputClasses}
          value={values.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
        {errors.title && <p className={errorClasses}>{errors.title}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className={labelClasses}>
          Descripción
        </label>
        <textarea
          id="description"
          rows={3}
          className={inputClasses}
          value={values.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        {errors.description && <p className={errorClasses}>{errors.description}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className={labelClasses}>
            Categoría
          </label>
          <input
            id="category"
            type="text"
            placeholder="ej: onboarding, checkout"
            className={inputClasses}
            value={values.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />
          {errors.category && <p className={errorClasses}>{errors.category}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="status" className={labelClasses}>
            Estado
          </label>
          <select
            id="status"
            className={inputClasses}
            value={values.status}
            onChange={(e) => handleChange("status", e.target.value as FeatureStatus)}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="reach" className={labelClasses}>
            Reach (personas / trimestre)
          </label>
          <input
            id="reach"
            type="number"
            min="0"
            className={inputClasses}
            value={values.reach}
            onChange={(e) => handleChange("reach", e.target.value)}
          />
          {errors.reach && <p className={errorClasses}>{errors.reach}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="effort" className={labelClasses}>
            Effort (persona-meses)
          </label>
          <input
            id="effort"
            type="number"
            min="0"
            step="0.1"
            className={inputClasses}
            value={values.effort}
            onChange={(e) => handleChange("effort", e.target.value)}
          />
          {errors.effort && <p className={errorClasses}>{errors.effort}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="impact" className={labelClasses}>
            Impact
          </label>
          <select
            id="impact"
            className={inputClasses}
            value={values.impact}
            onChange={(e) => handleChange("impact", e.target.value)}
          >
            <option value="">Elegí un nivel</option>
            {IMPACT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.impact && <p className={errorClasses}>{errors.impact}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confidence" className={labelClasses}>
            Confidence
          </label>
          <select
            id="confidence"
            className={inputClasses}
            value={values.confidence}
            onChange={(e) => handleChange("confidence", e.target.value)}
          >
            <option value="">Elegí un nivel</option>
            {CONFIDENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.confidence && <p className={errorClasses}>{errors.confidence}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 self-start rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Agregar feature
      </button>
    </form>
  );
}
