import PageHeader from "@/components/shared/page-header";
import FeeRecommendationCard from "@/components/fee-advisor/fee-recommendation-card";

export default function FeeAdvisorPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <PageHeader
        title="AI Fee Advisor"
        description="Get personalized recommendations on how to save on swap fees based on your trading patterns."
      />
      <FeeRecommendationCard />
    </div>
  );
}
