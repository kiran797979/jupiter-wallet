import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Nft } from "@/lib/constants";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

type NftCardProps = {
  nft: Nft;
};

export default function NftCard({ nft }: NftCardProps) {
  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <Image
            src={nft.imageUrl}
            alt={nft.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="nft abstract"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start bg-secondary/30">
        <p className="font-semibold text-sm truncate w-full">{nft.name}</p>
        <p className="text-xs text-muted-foreground">{nft.collection}</p>
        <Button variant="ghost" size="sm" className="mt-2 -ml-2 h-auto py-1 px-2 text-primary hover:bg-primary/10">
            <ExternalLink className="mr-2 h-3 w-3" />
            View
        </Button>
      </CardFooter>
    </Card>
  );
}
