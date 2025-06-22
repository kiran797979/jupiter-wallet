import PageHeader from "@/components/shared/page-header";
import ProposalCard from "@/components/governance/proposal-card";
import { PROPOSALS } from "@/lib/constants";

export default function GovernancePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Governance Portal"
        description="View the latest proposals from the Jupiter DAO."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {PROPOSALS.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
}
