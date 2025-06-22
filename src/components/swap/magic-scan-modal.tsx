"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { QrCode, CheckCircle } from "lucide-react";
import { TOKENS } from "@/lib/constants";
import type { Token } from "@/lib/constants";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

type MagicScanModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onTokenScanned: (token: Token) => void;
};

export function MagicScanModal({ isOpen, onOpenChange, onTokenScanned }: MagicScanModalProps) {
  const [scanStatus, setScanStatus] = useState<"scanning" | "detected">("scanning");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setScanStatus("scanning");
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanStatus("detected");
            // Simulate detecting the JUP token
            const detectedToken = TOKENS.find(t => t.ticker === "JUP")!;
            onTokenScanned(detectedToken);
            setTimeout(() => onOpenChange(false), 2000);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isOpen, onOpenChange, onTokenScanned]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode />
            Magic Scan
          </DialogTitle>
          <DialogDescription>
            Point your camera at a token contract QR code.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center h-64 bg-secondary rounded-lg overflow-hidden relative">
          {scanStatus === "scanning" ? (
            <>
              <div className="w-48 h-48 border-4 border-dashed border-primary rounded-lg" />
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 animate-pulse" style={{ animation: 'scan 2s infinite linear' }} />
              <p className="mt-4 text-muted-foreground">Scanning for token...</p>
              <Progress value={progress} className="w-3/4 mt-2" />
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-semibold">Token Detected!</h3>
              <div className="flex items-center gap-2 p-2 rounded-md bg-background">
                 <Image src={TOKENS.find(t => t.ticker === 'JUP')!.iconUrl} alt="JUP" width={24} height={24} className="rounded-full" />
                 <p className="font-bold">Jupiter (JUP)</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
      <style jsx global>{`
        @keyframes scan {
            0% { transform: translateY(0); }
            50% { transform: translateY(250px); }
            100% { transform: translateY(0); }
        }
      `}</style>
    </Dialog>
  );
}
