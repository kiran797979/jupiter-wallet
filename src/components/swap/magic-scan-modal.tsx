"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Html5QrcodeScanner, Html5QrcodeScannerState } from "html5-qrcode";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { QrCode, CheckCircle, AlertTriangle, CameraOff, Loader2 } from "lucide-react";
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
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null); // null is initial state
  const { toast } = useToast();
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const cleanupScanner = useCallback(() => {
    if (scannerRef.current) {
      try {
        if (scannerRef.current.getState() === Html5QrcodeScannerState.SCANNING) {
          scannerRef.current.clear();
        }
      } catch (error) {
        console.error("Failed to clear html5-qrcode scanner.", error);
      }
      scannerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      cleanupScanner();
      return;
    }

    setScanResult(null);
    setHasCameraPermission(null); // Reset on open

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

    const startScanner = () => {
        if (!document.getElementById(qrcodeRegionId) || scannerRef.current) {
            return;
        }
        
        const scanner = new Html5QrcodeScanner(
          qrcodeRegionId,
          { qrbox: { width: 250, height: 250 }, fps: 5, rememberLastUsedCamera: true },
          false
        );
        scannerRef.current = scanner;
        scanner.render(onScanSuccess, (error) => { /* ignore failures */ });
    };

    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // We have permission, and we can close the stream immediately.
        // html5-qrcode will handle requesting it again.
        stream.getTracks().forEach(track => track.stop());
        setHasCameraPermission(true);
        // Delay scanner rendering slightly to ensure the dialog is fully visible
        setTimeout(startScanner, 300);
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
      }
    };
    
    getCameraPermission();

    return () => {
      cleanupScanner();
    };
  }, [isOpen, onOpenChange, onTokenScanned, toast, cleanupScanner]);
  
  const renderContent = () => {
    if (hasCameraPermission === false) {
      return (
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
      );
    }
    
    if (scanResult) {
       return (
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h3 className="text-xl font-semibold">Token Detected!</h3>
          <div className="flex items-center gap-2 p-2 rounded-md bg-background">
              <Image src={scanResult.iconUrl} alt={scanResult.ticker} width={24} height={24} className="rounded-full" />
              <p className="font-bold">{scanResult.name} ({scanResult.ticker})</p>
          </div>
        </div>
       );
    }

    if(hasCameraPermission === true) {
        return <div id={qrcodeRegionId} className="w-full" />;
    }

    // Initial loading state
    return (
        <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="text-muted-foreground">Requesting Camera Permission...</p>
        </div>
    );
  }

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
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
