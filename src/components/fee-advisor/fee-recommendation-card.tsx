
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getFeeSavingAdvice } from "@/app/fee-advisor/actions";
import { BotMessageSquare, Lightbulb, Sparkles, Loader2 } from "lucide-react";

const initialState = {
  recommendation: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Get Advice
        </>
      )}
    </Button>
  );
}

export default function FeeRecommendationCard() {
  const [state, formAction] = useActionState(getFeeSavingAdvice, initialState);

  return (
    <div className="space-y-6">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Describe Your Swaps</CardTitle>
            <CardDescription>
              Tell our AI about your recent trading activity to get fee-saving tips. For example: "I often swap small amounts of SOL for meme coins like BONK and WIF during peak hours."
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="pastBehavior">Past Swap Behavior</Label>
              <Textarea
                placeholder="Describe your recent swaps here..."
                id="pastBehavior"
                name="pastBehavior"
                rows={4}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      {state.error && (
         <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.recommendation && (
        <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-3">
                <BotMessageSquare className="h-8 w-8 text-primary shrink-0" />
                <div>
                    <h3 className="text-xl font-bold text-primary">{state.recommendation.title}</h3>
                    <p className="text-muted-foreground">{state.recommendation.summary}</p>
                </div>
            </div>
            <div className="space-y-3">
                {state.recommendation.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-md bg-secondary/50">
                        <Lightbulb className="h-5 w-5 text-primary mt-1 shrink-0" />
                        <div>
                            <p className="font-semibold">{rec.point}</p>
                            <p className="text-sm text-muted-foreground">{rec.explanation}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
