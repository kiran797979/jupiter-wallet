'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Progress} from '@/components/ui/progress';
import type {Proposal} from '@/lib/constants';
import {ExternalLink, Check, X, ThumbsUp, ThumbsDown} from 'lucide-react';
import {cn} from '@/lib/utils';
import {useToast} from '@/hooks/use-toast';

type ProposalCardProps = {
  proposal: Proposal;
};

export default function ProposalCard({proposal}: ProposalCardProps) {
  const {toast} = useToast();
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPercentage =
    totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  const againstPercentage = 100 - forPercentage;

  const handleVote = (voteType: 'For' | 'Against') => {
    if (proposal.status !== 'Active') {
      toast({
        variant: 'destructive',
        title: 'Voting Closed',
        description: `Voting for proposal "${proposal.title}" has ended.`,
      });
      return;
    }
    toast({
      title: 'Vote Cast!',
      description: `You voted ${voteType} "${proposal.title}".`,
    });
  };

  const statusConfig = {
    Active: {
      color: 'bg-blue-500',
      icon: <ExternalLink className="h-4 w-4" />,
      text: 'Vote on DAO Site',
    },
    Passed: {
      color: 'bg-green-500',
      icon: <Check className="h-4 w-4" />,
      text: 'View Results',
    },
    Failed: {
      color: 'bg-red-500',
      icon: <X className="h-4 w-4" />,
      text: 'View Results',
    },
  };

  const currentStatus = statusConfig[proposal.status];

  return (
    <Card className="flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg leading-tight">{proposal.title}</CardTitle>
          <Badge className={cn('text-white shrink-0 ml-4', currentStatus.color)}>
            {proposal.status}
          </Badge>
        </div>
        <CardDescription>
          By {proposal.author} &bull; Ends {proposal.endDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {proposal.description}
        </p>
        <div className="space-y-3">
          <div
            className="group cursor-pointer"
            onClick={() => handleVote('For')}
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1.5 text-green-600 font-medium group-hover:text-green-500 transition-colors">
                <ThumbsUp className="h-4 w-4" /> For
              </span>
              <span>{forPercentage.toFixed(1)}%</span>
            </div>
            <Progress
              value={forPercentage}
              className="h-2 [&>div]:bg-green-500"
            />
            <p className="text-xs text-right text-muted-foreground mt-1">
              {(proposal.votesFor / 1_000_000).toFixed(1)}M votes
            </p>
          </div>
          <div
            className="group cursor-pointer"
            onClick={() => handleVote('Against')}
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="flex items-center gap-1.5 text-red-600 font-medium group-hover:text-red-500 transition-colors">
                <ThumbsDown className="h-4 w-4" /> Against
              </span>
              <span>{againstPercentage.toFixed(1)}%</span>
            </div>
            <Progress
              value={againstPercentage}
              className="h-2 [&>div]:bg-red-500"
            />
            <p className="text-xs text-right text-muted-foreground mt-1">
              {(proposal.votesAgainst / 1_000_000).toFixed(1)}M votes
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <a href="#" target="_blank" rel="noopener noreferrer">
            {currentStatus.icon}
            {currentStatus.text}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
