"use client";

import { useFormState, useFormStatus } from "react-dom";
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
import { BotMessageSquare, Lightbulb, Sparkles } from "lucide-react";

const initialState = {
  recommendation: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={pending}>
      {pending ? (
        "Analyzing..."
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
  const [state, formAction] = useFormState(getFeeSavingAdvice, initialState);

  return (
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
        <CardFooter className="flex flex-col gap-4">
          <SubmitButton />
          {state.error && (
             <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          {state.recommendation && (
            <Alert className="w-full border-primary/50 text-primary">
                <Lightbulb className="h-4 w-4 !text-primary" />
                <AlertTitle className="flex items-center gap-2 font-semibold">
                    <BotMessageSquare />
                    AI Recommendation
                </AlertTitle>
                <AlertDescription>
                    {state.recommendation}
                </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
