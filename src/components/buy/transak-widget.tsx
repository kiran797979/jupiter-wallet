"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TransakWidget() {
  const transakApiKey = process.env.NEXT_PUBLIC_TRANSAK_API_KEY;

  if (!transakApiKey || transakApiKey === "YOUR_TRANSAK_API_KEY_HERE") {
    return (
      <Card className="flex items-center justify-center h-[625px]">
        <CardHeader>
          <CardTitle>Transak Widget Unavailable</CardTitle>
          <CardContent className="pt-4">
            <p className="text-muted-foreground text-center">
              Please configure your Transak API key in the <code>.env</code> file
              <br />
              to use this feature.
            </p>
          </CardContent>
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
