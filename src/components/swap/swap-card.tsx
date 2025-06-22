
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowDown, QrCode, Send, Settings2, History, RefreshCw, Loader2, AlertTriangle, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ACTIVE_ORDERS, TOKENS } from "@/lib/constants";
import type { Token } from "@/lib/constants";
import { MagicScanModal } from "./magic-scan-modal";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { getQuote, type QuoteResponse } from "@/app/swap/actions";
import FeeTransparencyMeter from "./fee-transparency-meter";

export default function SwapCard() {
  const [fromToken, setFromToken] = useState<Token>(TOKENS[0]);
  const [toToken, setToToken] = useState<Token>(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [isScanModalOpen, setScanModalOpen] = useState(false);
  const [isFetchingQuote, setIsFetchingQuote] = useState(false);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [quoteError, setQuoteError] = useState<string | null>(null);

  const debouncedFromAmount = useDebounce(fromAmount, 500);

  const { toast } = useToast();

  const handleFromTokenChange = (ticker: string) => {
    const newFromToken = TOKENS.find(t => t.ticker === ticker)!;
    if (newFromToken.ticker === toToken.ticker) {
      setToToken(fromToken);
    }
    setFromToken(newFromToken);
  };

  const handleToTokenChange = (ticker: string) => {
    const newToToken = TOKENS.find(t => t.ticker === ticker)!;
     if (newToToken.ticker === fromToken.ticker) {
      setFromToken(toToken);
    }
    setToToken(newToToken);
  };
  
  const handleTokenSwitch = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const fetchQuote = useCallback(async () => {
    if (!debouncedFromAmount || parseFloat(debouncedFromAmount) <= 0 || !fromToken || !toToken || fromToken.ticker === toToken.ticker) {
      setToAmount("");
      setQuote(null);
      setQuoteError(null);
      return;
    }

    setIsFetchingQuote(true);
    setQuoteError(null);
    setQuote(null);
    const { quote: newQuote, error } = await getQuote(fromToken.ticker, toToken.ticker, parseFloat(debouncedFromAmount));

    if (error) {
      setQuoteError(error);
      setToAmount("");
    } else if (newQuote) {
      setQuote(newQuote);
      const formattedAmount = parseFloat(newQuote.outAmount).toLocaleString('en-US', {
        maximumFractionDigits: toToken.decimals,
      });
      setToAmount(formattedAmount.replace(/,/g, ''));
    }
    setIsFetchingQuote(false);
  }, [debouncedFromAmount, fromToken, toToken, toToken.decimals]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const handleSwap = (type: "Market" | "Limit" | "DCA") => {
    if ((type === 'Market' && (!quote || !fromAmount)) || (type !== 'Market' && !fromAmount)) {
      toast({
        variant: "destructive",
        title: `${type} Order Failed`,
        description: "Please enter an amount.",
      });
      return;
    }
    toast({
        title: `${type} Order Submitted!`,
        description: `Your order to trade ${fromToken.ticker} for ${toToken.ticker} has been submitted.`,
    });
  }

  const TokenSelector = ({ value, onChange, placeholder }: { value: Token, onChange: (ticker: string) => void, placeholder: string }) => (
    <Select onValueChange={onChange} value={value.ticker}>
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
      <Card className="w-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
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
          
          <TabsContent value="market">
            <CardContent className="space-y-4">
              <div className="grid gap-2 relative">
                <Label>You pay</Label>
                <div className="flex gap-2">
                    <div className="w-2/5">
                        <TokenSelector value={fromToken} onChange={handleFromTokenChange} placeholder="From" />
                    </div>
                    <Input className="w-3/5 h-16 text-2xl font-mono text-right" placeholder="0" type="number" value={fromAmount} onChange={(e) => setFromAmount(e.target.value)} />
                </div>
                <Button variant="outline" size="icon" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-background" onClick={handleTokenSwitch}>
                    <ArrowDown className="h-4 w-4" />
                </Button>
                 <Label>You receive</Label>
                 <div className="flex gap-2">
                    <div className="w-2/5">
                        <TokenSelector value={toToken} onChange={handleToTokenChange} placeholder="To" />
                    </div>
                    <Input className="w-3/5 h-16 text-2xl font-mono text-right" placeholder="0" value={toAmount} readOnly />
                </div>
              </div>
              
              <FeeTransparencyMeter quote={quote} fromAmount={fromAmount} />

               {quoteError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{quoteError}</AlertDescription>
                </Alert>
              )}
              <div className="text-xs text-muted-foreground flex justify-between h-5 items-center">
                {isFetchingQuote ? (
                  <div className="flex items-center gap-2 text-primary animate-pulse">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Getting best price...</span>
                  </div>
                ) : quote ? (
                  <>
                    <span>1 {fromToken.ticker} = { (parseFloat(quote.outAmount) / parseFloat(fromAmount)).toFixed(4) } {toToken.ticker}</span>
                    <button className="flex items-center gap-1 text-primary" onClick={fetchQuote}><RefreshCw className="h-3 w-3" /> Refresh</button>
                  </>
                ) : (
                  <span>Enter an amount to get a quote.</span>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg h-12 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => handleSwap('Market')} disabled={isFetchingQuote || !quote}>
                {isFetchingQuote ? <Loader2 className="animate-spin" /> : <Send className="mr-2 h-5 w-5"/>}
                Swap
              </Button>
            </CardFooter>
          </TabsContent>
            
          <TabsContent value="limit">
            <CardContent className="space-y-4">
               <div className="grid gap-2 relative">
                <Label>You pay</Label>
                <div className="flex gap-2">
                    <div className="w-2/5">
                        <TokenSelector value={fromToken} onChange={handleFromTokenChange} placeholder="From" />
                    </div>
                    <Input className="w-3/5 h-16 text-2xl font-mono text-right" placeholder="0" type="number" value={fromAmount} onChange={(e) => setFromAmount(e.target.value)} />
                </div>
                <Button variant="outline" size="icon" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-background" onClick={handleTokenSwitch}>
                    <ArrowDown className="h-4 w-4" />
                </Button>
                 <Label>You receive</Label>
                 <div className="flex gap-2">
                    <div className="w-2/5">
                        <TokenSelector value={toToken} onChange={handleToTokenChange} placeholder="To" />
                    </div>
                    <Input className="w-3/5 h-16 text-2xl font-mono text-right" placeholder="0" type="number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="limit-price">Limit Price ({toToken.ticker} per {fromToken.ticker})</Label>
                  <Input id="limit-price" placeholder="Enter price" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit-expiry">Expires in</Label>
                  <Select defaultValue="1d">
                    <SelectTrigger id="limit-expiry">
                      <SelectValue placeholder="Select expiry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10m">10 minutes</SelectItem>
                      <SelectItem value="1h">1 hour</SelectItem>
                      <SelectItem value="1d">1 day</SelectItem>
                      <SelectItem value="7d">7 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                  This is a simulated Limit Order for the hackathon. Real order execution is not implemented.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-lg h-12" onClick={() => handleSwap('Limit')}>
                <Calendar className="mr-2 h-5 w-5"/>
                Place Limit Order
              </Button>
            </CardFooter>
          </TabsContent>

          <TabsContent value="dca">
             <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>You buy</Label>
                  <TokenSelector value={toToken} onChange={handleToTokenChange} placeholder="To" />
                  <Label>With</Label>
                  <TokenSelector value={fromToken} onChange={handleFromTokenChange} placeholder="From" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dca-amount">Amount each time</Label>
                      <Input id="dca-amount" placeholder={`0 ${fromToken.ticker}`} type="number" value={fromAmount} onChange={(e) => setFromAmount(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="dca-frequency">Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="dca-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                </div>
                 <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                    This is a simulated DCA Order for the hackathon. Real order execution is not implemented.
                    </AlertDescription>
                </Alert>
            </CardContent>
            <CardFooter>
                <Button className="w-full text-lg h-12" onClick={() => handleSwap('DCA')}>
                    <Clock className="mr-2 h-5 w-5"/>
                    Start DCA
                </Button>
            </CardFooter>
          </TabsContent>

        </Tabs>
      </Card>
      <Card className="transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
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
                    {ACTIVE_ORDERS.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center text-muted-foreground">
                          No active limit or DCA orders.
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      <MagicScanModal isOpen={isScanModalOpen} onOpenChange={setScanModalOpen} onTokenScanned={(token) => setToToken(token)} />
    </>
  );
}
