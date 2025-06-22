import PageHeader from "@/components/shared/page-header";
import ProposalCard from "@/components/governance/proposal-card";
import { PROPOSALS } from "@/lib/constants";
import GovernanceClientPage from "@/components/governance/governance-client-page";

export default function GovernancePage() {
  return (
    <div className="space-y-8">
      <GovernanceClientPage />
      <div className="grid gap-6 md:grid-cols-2">
        {PROPOSALS.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
}
