"use client";

import { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScannerState } from "html5-qrcode";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { QrCode, CheckCircle, AlertTriangle, CameraOff } from "lucide-react";
import { TOKENS } from "@/lib/constants";
import type { Token } from "@/lib/constants";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


type MagicScanModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onTokenScanned: (token: Token) => void;
};

const qrcodeRegionId = "html5qr-code-full-region";

export function MagicScanModal({ isOpen, onOpenChange, onTokenScanned }: MagicScanModalProps) {
  const [scanResult, setScanResult] = useState<Token | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const { toast } = useToast();
  
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setScanResult(null);
    setHasCameraPermission(true);

    const cleanupScanner = () => {
       if (scannerRef.current && scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING) {
        scannerRef.current.clear().catch(error => {
            console.error("Failed to clear html5-qrcode scanner.", error);
        });
        scannerRef.current = null;
      }
    }

    navigator.mediaDevices?.getUserMedia({ video: true })
      .then(() => {
        setHasCameraPermission(true);
        
        const scanner = new Html5QrcodeScanner(
          qrcodeRegionId,
          { qrbox: { width: 250, height: 250 }, fps: 5, rememberLastUsedCamera: true },
          false
        );
        scannerRef.current = scanner;

        const onScanSuccess = (decodedText: string) => {
          cleanupScanner();

          const foundToken = TOKENS.find(t => t.address.toLowerCase() === decodedText.toLowerCase());

          if (foundToken) {
            setScanResult(foundToken);
            onTokenScanned(foundToken);
            toast({
              title: "Token Detected!",
              description: `${foundToken.name} (${foundToken.ticker}) was added.`
            });
            setTimeout(() => onOpenChange(false), 2000);
          } else {
            toast({
              variant: "destructive",
              title: "Scan Error",
              description: "Invalid or unsupported token QR code.",
            });
            onOpenChange(false);
          }
        };

        const onScanFailure = (error: any) => { /* ignore */ };
        
        setTimeout(() => {
          if (document.getElementById(qrcodeRegionId)) {
            scanner.render(onScanSuccess, onScanFailure);
          }
        }, 300);

      })
      .catch((err) => {
        console.error("Camera permission denied:", err);
        setHasCameraPermission(false);
      });

    return () => {
      cleanupScanner();
    };
  }, [isOpen, onOpenChange, onTokenScanned, toast]);


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
        <div className="flex flex-col items-center justify-center min-h-[320px] bg-secondary rounded-lg overflow-hidden relative p-4">
          {!hasCameraPermission ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <CameraOff className="h-16 w-16 text-destructive" />
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Camera Access Denied</AlertTitle>
                <AlertDescription>
                  Please enable camera permissions in your browser settings to use Magic Scan.
                </AlertDescription>
              </Alert>
            </div>
          ) : scanResult ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="text-xl font-semibold">Token Detected!</h3>
              <div className="flex items-center gap-2 p-2 rounded-md bg-background">
                 <Image src={scanResult.iconUrl} alt={scanResult.ticker} width={24} height={24} className="rounded-full" />
                 <p className="font-bold">{scanResult.name} ({scanResult.ticker})</p>
              </div>
            </div>
          ) : (
            <div id={qrcodeRegionId} className="w-full" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
