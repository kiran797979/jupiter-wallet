import PageHeader from "@/components/shared/page-header";
import SwapCard from "@/components/swap/swap-card";

export default function SwapPage() {
  return (
    <div className="max-w-md mx-auto space-y-8">
      <PageHeader
        title="Swap Tokens"
        description="Instant quotes and ultra-fast swaps powered by Jupiter."
      />
      <SwapCard />
    </div>
  );
}
