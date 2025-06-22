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
  title: z.string().describe("A catchy, short title for the recommendation. For example: 'Your Personalized Fee-Saving Plan'."),
  summary: z.string().describe("A one-sentence summary of the main advice."),
  recommendations: z.array(z.object({
      point: z.string().describe("A specific, actionable recommendation point. e.g., 'Adjust Your Priority Fees'"),
      explanation: z.string().describe("A brief explanation of why this point helps save fees, referencing the user's behavior if possible.")
  })).min(2).describe("A list of 2-3 detailed recommendations.")
});
export type FeeRecommendationOutput = z.infer<typeof FeeRecommendationOutputSchema>;

export async function getFeeRecommendation(input: FeeRecommendationInput): Promise<FeeRecommendationOutput> {
  return feeRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'feeRecommendationPrompt',
  input: {schema: FeeRecommendationInputSchema},
  output: {schema: FeeRecommendationOutputSchema},
  prompt: `You are a Solana DeFi expert AI, specializing in transaction cost optimization. Your goal is to provide users with actionable, clear, and concise advice on how to save money on transaction and swap fees.

Analyze the user's past swap behavior and provide personalized recommendations based on the following Solana fee-saving strategies:

1.  **Priority Fees:** Explain that paying a small priority fee can ensure a transaction is processed quickly during network congestion, preventing failed transactions which still cost a small fee. Recommend using low priority fees during non-peak hours.
2.  **Swap Aggregators:** Emphasize that this wallet uses the Jupiter aggregator, which automatically finds the best price across many decentralized exchanges (DEXs), factoring in liquidity and fees. The best way to save is often just by using the app's built-in swap.
3.  **Timing is Key:** Advise the user to avoid swapping during major NFT mints or token launches, as the network becomes congested and fees skyrocket. Suggest swapping during "off-peak" hours (e.g., late at night in US timezones).
4.  **Slippage Tolerance:** Briefly explain that very low slippage can cause transactions to fail (costing a fee), while very high slippage can lead to paying a bad price (a hidden cost). Recommend a reasonable slippage (e.g., 0.5%).

Based on the user's input, generate a structured recommendation.

User's Past Swap Behavior: {{{pastSwapBehavior}}}
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
