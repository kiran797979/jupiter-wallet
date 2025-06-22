"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WALLETS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

type ConnectWalletDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ConnectWalletDialog({ open, onOpenChange }: ConnectWalletDialogProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    if (!selectedWallet) return;
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      onOpenChange(false);
      toast({
        title: "Wallet Connected",
        description: `${selectedWallet} has been successfully connected.`,
        action: <CheckCircle className="text-green-500" />,
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect a wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {WALLETS.map((wallet) => (
            <Button
              key={wallet.name}
              variant={selectedWallet === wallet.name ? "secondary" : "outline"}
              className="w-full justify-start h-14 text-lg"
              onClick={() => setSelectedWallet(wallet.name)}
            >
              <Image src={wallet.iconUrl} alt={wallet.name} width={32} height={32} className="mr-4 rounded-md" />
              {wallet.name}
            </Button>
          ))}
        </div>
        <DialogFooter>
          <Button 
            type="button"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={!selectedWallet || isConnecting}
            onClick={handleConnect}
          >
            {isConnecting ? "Connecting..." : `Connect ${selectedWallet || ''}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
