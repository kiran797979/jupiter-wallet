import PageHeader from "@/components/shared/page-header";
import { MOCK_NFTS } from "@/lib/constants";
import NftCard from "@/components/portfolio/nft-card";

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="NFT Portfolio"
        description="A gallery of your collected digital assets on the Solana blockchain."
      />
      {MOCK_NFTS.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_NFTS.map((nft) => (
            <NftCard key={nft.id} nft={nft} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 rounded-lg border border-dashed">
          <p className="text-muted-foreground">You don't own any NFTs yet.</p>
        </div>
      )}
    </div>
  );
}
