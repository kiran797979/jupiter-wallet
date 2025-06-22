import PageHeader from "@/components/shared/page-header";
import TransactionHistoryTable from "@/components/transactions/transaction-history-table";

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Transaction History"
        description="An overview of your recent account activity."
      />
      <TransactionHistoryTable />
    </div>
  );
}
