'use client';

import {useEffect, useActionState} from 'react';
import {useFormStatus} from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {createProposal} from '@/app/governance/actions';
import {useToast} from '@/hooks/use-toast';
import {Sparkles, Loader2} from 'lucide-react';

type CreateProposalDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const initialState = {
  message: '',
  errors: {},
  success: false,
};

function SubmitButton() {
  const {pending} = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Submit Proposal
        </>
      )}
    </Button>
  );
}

export default function CreateProposalDialog({
  isOpen,
  onOpenChange,
}: CreateProposalDialogProps) {
  const [state, formAction] = useActionState(createProposal, initialState);
  const {toast} = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success!',
        description: state.message,
      });
      onOpenChange(false);
    } else if (state.message && !state.success) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, onOpenChange, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Proposal</DialogTitle>
          <DialogDescription>
            Draft your proposal for the Jupiter DAO. It will be reviewed before
            going to a formal vote.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Proposal Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Increase LFG Launchpad Allocation"
              required
            />
            {state.errors?.title && (
              <p className="text-sm text-destructive">{state.errors.title[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Proposal Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your proposal in detail..."
              rows={5}
              required
            />
            {state.errors?.description && (
              <p className="text-sm text-destructive">
                {state.errors.description[0]}
              </p>
            )}
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
