"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { StakingPool } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

type StakingCardProps = {
  pool: StakingPool;
};

export default function StakingCard({ pool }: StakingCardProps) {
  const { toast } = useToast();

  const handleStake = () => {
    toast({
      title: "Stake Submitted",
      description: `Your request to stake in the ${pool.name} pool has been submitted.`,
    });
  };
  
  const handleUnstake = () => {
    toast({
        title: "Unstake Submitted",
        description: `Your request to unstake from the ${pool.name} pool has been submitted.`,
      });
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row gap-4 items-center">
        <Image src={pool.iconUrl} alt={pool.name} width={48} height={48} className="rounded-full" />
        <div>
            <CardTitle>{pool.name}</CardTitle>
            <CardDescription>Stake {pool.token} to earn</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="flex justify-between p-3 rounded-lg bg-secondary">
            <div className="text-center">
                <p className="text-sm text-muted-foreground">APY</p>
                <p className="text-lg font-bold text-primary">{pool.apy.toFixed(2)}%</p>
            </div>
            <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Staked</p>
                <p className="text-lg font-bold">${pool.staked.toLocaleString()}</p>
            </div>
        </div>
        <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Pool Capacity</span>
                <span>{pool.capacityUsed}%</span>
            </div>
            <Progress value={pool.capacityUsed} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={handleUnstake}>Unstake</Button>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleStake}>Stake Now</Button>
      </CardFooter>
    </Card>
  );
}
