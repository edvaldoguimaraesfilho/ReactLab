import type { BmiClassification } from "../models/BmiClassification";

export function calculateBmi(
  weight: number,
  height: number
): number {
  if (weight <= 0 || height <= 0) {
    return 0;
  }

  return weight / (height * height);
}

export function getBmiClassification(
  bmi: number
): BmiClassification {
  if (bmi === 0) {
    return {
      label: "Invalid values",
      color: "gray",
    };
  }

  if (bmi < 18.5) {
    return {
      label: "Underweight",
      color: "#2563eb",
    };
  }

  if (bmi < 25) {
    return {
      label: "Normal",
      color: "#16a34a",
    };
  }

  if (bmi < 30) {
    return {
      label: "Overweight",
      color: "#ca8a04",
    };
  }

  return {
    label: "Obesity",
    color: "#dc2626",
  };
}