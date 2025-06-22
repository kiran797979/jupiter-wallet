"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_TRANSACTIONS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Repeat, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = {
  Send: <ArrowUpRight className="h-4 w-4" />,
  Receive: <ArrowDownLeft className="h-4 w-4" />,
  Swap: <Repeat className="h-4 w-4" />,
  "Contract Execution": <FileText className="h-4 w-4" />,
};

const STATUS_COLORS = {
  Completed: "bg-green-500/20 text-green-400 border-green-500/30",
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Failed: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function TransactionHistoryTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_TRANSACTIONS.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{ICONS[tx.type]}</span>
                    <span>{tx.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                    <p className="font-medium">{tx.details}</p>
                    <p className="text-xs text-muted-foreground font-mono">{tx.address}</p>
                </TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell className={cn(
                    "text-right font-mono",
                    tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                )}>
                  {tx.amount}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={cn("border", STATUS_COLORS[tx.status])}>
                    {tx.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
