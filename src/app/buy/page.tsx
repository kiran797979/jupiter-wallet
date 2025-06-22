import PageHeader from "@/components/shared/page-header";
import TransakWidget from "@/components/buy/transak-widget";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function BuyPage() {
  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <PageHeader
        title="Buy Crypto"
        description="Easily purchase crypto with your local currency via Transak."
      />
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Developer Note</AlertTitle>
        <AlertDescription>
          This feature requires a Transak API key. Please copy the <code>.env.example</code> file to <code>.env</code> and add your key to enable the widget.
        </AlertDescription>
      </Alert>
      <TransakWidget />
    </div>
  );
}
