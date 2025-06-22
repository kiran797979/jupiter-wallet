import WelcomeBanner from "@/components/dashboard/welcome-banner";
import Leaderboard from "@/components/dashboard/leaderboard";
import PageHeader from "@/components/shared/page-header";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" description="Welcome to your Jupiter Ultra Wallet." />
      <WelcomeBanner />
      <Leaderboard />
    </div>
  );
}
