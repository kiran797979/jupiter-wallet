'use client';

import {useState} from 'react';
import PageHeader from '@/components/shared/page-header';
import {Button} from '@/components/ui/button';
import {PlusCircle} from 'lucide-react';
import CreateProposalDialog from './create-proposal-dialog';

export default function GovernanceClientPage() {
  const [isCreateOpen, setCreateOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <PageHeader
          title="Governance Portal"
          description="View and create proposals for the Jupiter DAO."
        />
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Proposal
        </Button>
      </div>
      <CreateProposalDialog isOpen={isCreateOpen} onOpenChange={setCreateOpen} />
    </>
  );
}
