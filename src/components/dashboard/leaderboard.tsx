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
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Trader</TableHead>
              <TableHead className="text-right">Fees Saved (USDC)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LEADERBOARD_DATA.map((entry) => (
              <TableRow key={entry.rank}>
                <TableCell className="font-medium">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-secondary-foreground">
                    {entry.rank}
                  </div>
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
                <TableCell className="text-right font-mono text-green-600">
                  ${entry.feesSaved.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
