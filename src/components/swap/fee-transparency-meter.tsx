
"use client";

import { BarChart, Flame, Zap } from "lucide-react";
import type { QuoteResponse } from "@/app/swap/actions";

type FeeTransparencyMeterProps = {
  quote: QuoteResponse | null;
  fromAmount: string;
};

const TRADITIONAL_FEE_PCT = 0.003; // Standard AMM fee: 0.3%

export default function FeeTransparencyMeter({ quote, fromAmount }: FeeTransparencyMeterProps) {
  if (!quote || !fromAmount || parseFloat(fromAmount) <= 0 || !quote.marketInfos.length) {
    return null;
  }

  const jupiterFee = quote.jupiterFeePct * 100;
  const traditionalFee = TRADITIONAL_FEE_PCT * 100;
  const feeSaved = traditionalFee - jupiterFee;

  const route = quote.marketInfos.map(mi => mi.label).join(' → ');

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-primary/20 bg-primary/5 p-4 space-y-3">
        <div className="flex items-center gap-2 text-base font-semibold text-primary">
          <BarChart className="h-5 w-5" />
          Fee Transparency Meter
        </div>
        <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Flame className="h-4 w-4" /> Traditional DEX Fee
              </span>
              <span className="font-mono">{traditionalFee.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-primary" /> Jupiter Ultra Fee
              </span>
              <span className="font-mono font-semibold text-primary">{jupiterFee.toFixed(4)}%</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-primary/20 border-dashed">
              <span className="font-bold text-primary">You Save</span>
              <span className="font-mono font-bold text-primary">{feeSaved > 0 ? feeSaved.toFixed(4) : '0.0000'}%</span>
            </div>
            {route && (
                 <div className="text-xs text-muted-foreground pt-3 mt-2 border-t border-primary/20">
                    <p><span className="font-semibold">Best route via Jupiter:</span> {route}</p>
                </div>
            )}
        </div>
    </div>
  );
}
