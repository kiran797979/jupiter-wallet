import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LEADERBOARD_DATA } from "@/lib/constants";
import { Trophy } from "lucide-react";

const getRankIndicator = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return rank;
};

export default function Leaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Swap Leaderboard
        </CardTitle>
        <CardDescription>
          Top traders ranked by total fees saved.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-center">Rank</TableHead>
              <TableHead>Trader</TableHead>
              <TableHead className="text-right">Fees Saved (USDC)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LEADERBOARD_DATA.map((entry) => (
              <TableRow key={entry.rank}>
                <TableCell className="font-bold text-lg text-center">
                  {getRankIndicator(entry.rank)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={entry.avatarUrl}
                      alt={entry.trader}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <span className="font-medium">{entry.trader}</span>
                    {entry.rank === 1 && <Badge variant="destructive" className="bg-yellow-500 hover:bg-yellow-500/80">King</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono text-primary font-semibold">
                  +${entry.feesSaved.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
