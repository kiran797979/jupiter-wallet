"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TransakWidget() {
  const transakApiKey = process.env.NEXT_PUBLIC_TRANSAK_API_KEY;

  if (!transakApiKey || transakApiKey === "YOUR_TRANSAK_API_KEY_HERE") {
    return (
      <Card className="flex items-center justify-center h-[625px]">
        <CardHeader className="text-center">
          <CardTitle>Transak Widget Unavailable</CardTitle>
          <CardDescription className="pt-4">
            Please configure your Transak API key.
            <br />
            Copy <code>.env.example</code> to <code>.env</code> and add your key to get started.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const transakUrl = `https://global.transak.com/?apiKey=${transakApiKey}&fiatCurrency=INR&cryptoCurrencyList=SOL,USDC&defaultCryptoCurrency=SOL`;

  return (
    <Card>
      <CardContent className="p-0 overflow-hidden rounded-lg">
        <iframe
          src={transakUrl}
          title="Transak On-ramp"
          height="625"
          width="100%"
          className="border-0"
          allow="camera; microphone; payment"
        ></iframe>
      </CardContent>
    </Card>
  );
}
