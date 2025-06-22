
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Sparkles, Copy } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function Sidebar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const { publicKey } = useWallet();
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      toast({
        title: "Address Copied!",
        description: "Your wallet address has been copied to the clipboard.",
      });
    }
  };


  return (
    <aside className="w-full bg-background/80 backdrop-blur-md border-b md:border-b-0 md:border-r md:h-screen md:w-64 flex flex-col md:sticky md:top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="h-8 w-8 text-primary group-hover:animate-pulse" />
          <h1 className="text-xl font-bold transition-colors group-hover:text-primary">Jupiter Ultra</h1>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-all duration-300 hover:text-primary hover:bg-secondary hover:shadow-neon",
                isActive && "bg-primary/20 text-primary font-semibold shadow-neon"
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t space-y-4">
        {publicKey && isClient && (
          <div className="p-3 rounded-lg bg-secondary text-center space-y-2">
            <p className="text-xs text-muted-foreground">Connected Wallet</p>
            <div className="flex items-center justify-center gap-2 text-sm font-mono break-all">
                <span>{publicKey.toBase58().slice(0, 6)}...{publicKey.toBase58().slice(-6)}</span>
                <button onClick={handleCopyAddress} className="text-muted-foreground hover:text-primary transition-colors">
                    <Copy className="h-4 w-4" />
                </button>
            </div>
          </div>
        )}
        {isClient ? (
          <WalletMultiButton />
        ) : (
          <Skeleton className="w-full h-10 rounded-md" />
        )}
      </div>
    </aside>
  );
}
