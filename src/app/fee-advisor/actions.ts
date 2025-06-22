"use server";

import { getFeeRecommendation } from "@/ai/flows/fee-recommendation";

export async function getFeeSavingAdvice(
  prevState: any,
  formData: FormData
) {
  const pastBehavior = formData.get("pastBehavior") as string;

  if (!pastBehavior || pastBehavior.trim().length < 20) {
    return {
      recommendation: null,
      error: "Please provide a more detailed description of your past swap behavior (at least 20 characters).",
    };
  }

  try {
    const result = await getFeeRecommendation({ pastSwapBehavior: pastBehavior });
    return { recommendation: result.recommendation, error: null };
  } catch (error) {
    console.error("Error getting fee recommendation:", error);
    return {
      recommendation: null,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
