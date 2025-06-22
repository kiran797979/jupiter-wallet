import PageHeader from "@/components/shared/page-header";
import { MOCK_STAKING_POOLS } from "@/lib/constants";
import StakingCard from "@/components/staking/staking-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, DollarSign, BarChart } from "lucide-react";


export default function StakingPage() {
    const totalStakedValue = MOCK_STAKING_POOLS.reduce((acc, pool) => acc + pool.staked, 0);
    const averageApy = MOCK_STAKING_POOLS.reduce((acc, pool) => acc + pool.apy, 0) / MOCK_STAKING_POOLS.length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Staking Dashboard"
        description="Stake your assets to earn rewards and participate in the ecosystem."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Staked Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">${totalStakedValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Across all pools</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Pools</CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{MOCK_STAKING_POOLS.length}</div>
                <p className="text-xs text-muted-foreground">Available for staking</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average APY</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{averageApy.toFixed(2)}%</div>
                <p className="text-xs text-muted-foreground">Estimated average return</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_STAKING_POOLS.map((pool) => (
            <StakingCard key={pool.id} pool={pool} />
          ))}
      </div>
    </div>
  );
}
