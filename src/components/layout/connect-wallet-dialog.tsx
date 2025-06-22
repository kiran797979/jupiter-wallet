
"use client";

// This component is obsolete and has been replaced by the
// real wallet connection components from @solana/wallet-adapter-react-ui.
// It is kept here to prevent build errors but is no longer used.

export function ConnectWalletDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    if (open) {
        onOpenChange(false);
    }
    return null;
}
