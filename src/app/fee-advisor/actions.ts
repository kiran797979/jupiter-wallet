
"use server";

import { getFeeRecommendation, type FeeRecommendationOutput } from "@/ai/flows/fee-recommendation";

export async function getFeeSavingAdvice(
  prevState: any,
  formData: FormData
): Promise<{ recommendation: FeeRecommendationOutput | null; error: string | null; }> {
  const pastBehavior = formData.get("pastBehavior") as string;

  if (!pastBehavior || pastBehavior.trim().length < 20) {
    return {
      recommendation: null,
      error: "Please provide a more detailed description of your past swap behavior (at least 20 characters).",
    };
  }

  try {
    const result = await getFeeRecommendation({ pastSwapBehavior: pastBehavior });
    return { recommendation: result, error: null };
  } catch (error) {
    console.error("Error getting fee recommendation:", error);
    return {
      recommendation: null,
      error: "An unexpected error occurred while generating your advice. The AI may be busy. Please try again later.",
    };
  }
}
