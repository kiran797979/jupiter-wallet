
'use client';

import type { FC, ReactNode } from 'react';
import React, { useMemo, useCallback } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { BackpackWalletAdapter } from '@solana/wallet-adapter-backpack';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { useToast } from '@/hooks/use-toast';

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Mainnet;
    const { toast } = useToast();

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new BackpackWalletAdapter(),
        ],
        [network]
    );
    
    const onError = useCallback(
        (error: WalletError) => {
            // Silently handle the WalletNotReadyError, which can happen on page load with autoConnect.
            if (error.name === 'WalletNotReadyError') {
                return;
            }
            
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'Wallet Error',
                description: error.message || 'An unknown wallet error occurred.',
            });
        },
        [toast]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect onError={onError}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;
