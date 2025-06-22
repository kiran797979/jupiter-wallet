"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, QrCode, RefreshCw, Send, Settings2, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ACTIVE_ORDERS, TOKENS } from "@/lib/constants";
import type { Token } from "@/lib/constants";
import { MagicScanModal } from "./magic-scan-modal";
import { useToast } from "@/hooks/use-toast";

export default function SwapCard() {
  const [fromToken, setFromToken] = useState<Token>(TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState<number | string>("");
  const [toAmount, setToAmount] = useState<number | string>("1,450.53");
  const [isScanModalOpen, setScanModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSwap = () => {
    toast({
        title: "Swap Submitted!",
        description: `Swapping ${fromAmount} ${fromToken.ticker} for ${toToken.ticker}.`,
    });
  }

  const TokenSelector = ({ value, onChange, placeholder }: { value: Token, onChange: (ticker: string) => void, placeholder: string }) => (
    <Select onValueChange={onChange} defaultValue={value.ticker}>
      <SelectTrigger className="w-full h-16">
        <SelectValue>
          <div className="flex items-center gap-3">
            <Image src={value.iconUrl} alt={value.name} width={32} height={32} className="rounded-full" />
            <div>
              <p className="font-bold text-lg">{value.ticker}</p>
              <p className="text-xs text-muted-foreground">{value.name}</p>
            </div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {TOKENS.map((token) => (
          <SelectItem key={token.ticker} value={token.ticker}>
             <div className="flex items-center gap-3">
                <Image src={token.iconUrl} alt={token.name} width={24} height={24} className="rounded-full" />
                <p>{token.ticker}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <>
      <Card className="w-full">
        <Tabs defaultValue="market">
          <CardHeader>
            <div className="flex justify-between items-center">
                <TabsList>
                    <TabsTrigger value="market">Market</TabsTrigger>
                    <TabsTrigger value="limit">Limit</TabsTrigger>
                    <TabsTrigger value="dca">DCA</TabsTrigger>
                </TabsList>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setScanModalOpen(true)}><QrCode className="h-5 w-5"/></Button>
                    <Button variant="ghost" size="icon"><History className="h-5 w-5"/></Button>
                    <Button variant="ghost" size="icon"><Settings2 className="h-5 w-5"/></Button>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <TabsContent value="market" className="space-y-4">
              <div className="grid gap-2 relative">
                <Label>You pay</Label>
                <div className="flex gap-2">
                    <div className="w-2/5">
                        <TokenSelector value={fromToken} onChange={(ticker) => setFromToken(TOKENS.find(t => t.ticker === ticker)!)} placeholder="From" />
                    </div>
                    <Input className="w-3/5 h-16 text-2xl font-mono text-right" placeholder="0" value={fromAmount} onChange={(e) => setFromAmount(e.target.value)} />
                </div>
                <Button variant="outline" size="icon" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-background">
                    <ArrowDown className="h-4 w-4" />
                </Button>
                 <Label>You receive</Label>
                 <div className="flex gap-2">
                    <div className="w-2/5">
                        <TokenSelector value={toToken} onChange={(ticker) => setToToken(TOKENS.find(t => t.ticker === ticker)!)} placeholder="To" />
                    </div>
                    <Input className="w-3/5 h-16 text-2xl font-mono text-right" placeholder="0" value={toAmount} readOnly />
                </div>
              </div>
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>1 SOL = 145.05 USDC</span>
                <button className="flex items-center gap-1 text-primary"><RefreshCw className="h-3 w-3" /> Refresh</button>
              </div>
            </TabsContent>
             <TabsContent value="limit">
                <p className="text-center text-muted-foreground py-10">Limit order functionality coming soon.</p>
             </TabsContent>
            <TabsContent value="dca">
                 <p className="text-center text-muted-foreground py-10">DCA functionality coming soon.</p>
            </TabsContent>
          </CardContent>
          <CardFooter>
            <Button className="w-full text-lg h-12 bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleSwap}>
                <Send className="mr-2 h-5 w-5"/>
                Swap
            </Button>
          </CardFooter>
        </Tabs>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Active Orders</CardTitle>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ACTIVE_ORDERS.map(order => (
                        <TableRow key={order.id}>
                            <TableCell>{order.type}</TableCell>
                            <TableCell>{`${order.amount} ${order.fromToken.ticker} -> ${order.toToken.ticker} ${order.details}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      <MagicScanModal isOpen={isScanModalOpen} onOpenChange={setScanModalOpen} onTokenScanned={(token) => setToToken(token)} />
    </>
  );
}
