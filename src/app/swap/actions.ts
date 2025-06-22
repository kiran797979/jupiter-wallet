
"use server";

import { TOKENS } from "@/lib/constants";
import type { Token } from "@/lib/constants";

export type QuoteResponse = {
  outAmount: string;
  priceImpactPct: string;
};

export async function getQuote(
  fromTokenTicker: string,
  toTokenTicker: string,
  amount: number
): Promise<{ quote: QuoteResponse | null, error: string | null }> {
  if (!amount || amount <= 0) {
    return { quote: null, error: null };
  }

  const fromToken = TOKENS.find((t) => t.ticker === fromTokenTicker);
  const toToken = TOKENS.find((t) => t.ticker === toTokenTicker);

  if (!fromToken || !toToken) {
    return { quote: null, error: "Invalid token selection." };
  }

  // Jupiter API expects amount in base units
  const amountInBaseUnits = Math.round(amount * 10 ** fromToken.decimals);

  const url = new URL("https://quote-api.jup.ag/v6/quote");
  url.searchParams.append("inputMint", fromToken.address);
  url.searchParams.append("outputMint", toToken.address);
  url.searchParams.append("amount", amountInBaseUnits.toString());
  url.searchParams.append("slippageBps", "50"); // 0.5%

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Jupiter API error:", errorData);
      return { quote: null, error: errorData.message || "Failed to fetch quote." };
    }

    const data = await response.json();
    
    const outAmount = Number(data.outAmount) / (10 ** toToken.decimals);
    
    return {
      quote: {
        outAmount: outAmount.toString(),
        priceImpactPct: data.priceImpactPct,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return { quote: null, error: "An unexpected error occurred." };
  }
}
