import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Ready for Ultra-Fast Swaps?</CardTitle>
        <CardDescription className="text-primary/80">
          Experience the fastest and cheapest swaps on Solana, backed by the Jupiter aggregator.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/swap">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Send className="mr-2 h-4 w-4" />
            Go to Swap
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
