// src/ai/flows/fee-recommendation.ts
'use server';

/**
 * @fileOverview An AI agent that provides fee saving recommendations to users based on their past swap behavior.
 *
 * - getFeeRecommendation - A function that returns a fee saving recommendation.
 * - FeeRecommendationInput - The input type for the getFeeRecommendation function.
 * - FeeRecommendationOutput - The return type for the getFeeRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FeeRecommendationInputSchema = z.object({
  pastSwapBehavior: z.string().describe('A description of the users past swap behavior.'),
});
export type FeeRecommendationInput = z.infer<typeof FeeRecommendationInputSchema>;

const FeeRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('A recommendation on how to save fees on future swaps.'),
});
export type FeeRecommendationOutput = z.infer<typeof FeeRecommendationOutputSchema>;

export async function getFeeRecommendation(input: FeeRecommendationInput): Promise<FeeRecommendationOutput> {
  return feeRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'feeRecommendationPrompt',
  input: {schema: FeeRecommendationInputSchema},
  output: {schema: FeeRecommendationOutputSchema},
  prompt: `You are an AI assistant that provides recommendations to users on how to save fees when performing swaps on Solana.

  Based on the user's past swap behavior, provide a recommendation on how they can save fees on future swaps.

  Past Swap Behavior: {{{pastSwapBehavior}}}
  `,
});

const feeRecommendationFlow = ai.defineFlow(
  {
    name: 'feeRecommendationFlow',
    inputSchema: FeeRecommendationInputSchema,
    outputSchema: FeeRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
