import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Send, Vote, BotMessageSquare, Sparkles } from "lucide-react";

export type NavLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export const NAV_LINKS: NavLink[] = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Swap', href: '/swap', icon: Send },
    { name: 'Governance', href: '/governance', icon: Vote },
    { name: 'Fee Advisor', href: '/fee-advisor', icon: BotMessageSquare },
];

export type Token = {
  name: string;
  ticker: string;
  iconUrl: string;
  address: string;
  decimals: number;
};

export const TOKENS: Token[] = [
  { name: 'Solana', ticker: 'SOL', iconUrl: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', address: 'So11111111111111111111111111111111111111112', decimals: 9 },
  { name: 'USD Coin', ticker: 'USDC', iconUrl: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6 },
  { name: 'Jupiter', ticker: 'JUP', iconUrl: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN/logo.png', address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', decimals: 6 },
  { name: 'Bonk', ticker: 'BONK', iconUrl: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png', address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', decimals: 5 },
  { name: 'Wormhole', ticker: 'W', iconUrl: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ/logo.png', address: '85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ', decimals: 6 },
];

export type LeaderboardEntry = {
  rank: number;
  trader: string;
  feesSaved: number;
  avatarUrl: string;
};

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, trader: 'CryptoKing', feesSaved: 1250.75, avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d' },
  { rank: 2, trader: 'SolanaSurfer', feesSaved: 1105.20, avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026705d' },
  { rank: 3, trader: 'JupiterMaxi', feesSaved: 987.50, avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026706d' },
  { rank: 4, trader: 'DEGEN_dave', feesSaved: 850.00, avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026707d' },
  { rank: 5, trader: 'SwapQueen', feesSaved: 760.30, avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026708d' },
];


export type Proposal = {
  id: string;
  title: string;
  author: string;
  status: 'Active' | 'Passed' | 'Failed';
  description: string;
  votesFor: number;
  votesAgainst: number;
  endDate: string;
};

export const PROPOSALS: Proposal[] = [
  {
    id: 'JUP-001',
    title: 'Increase LFG Launchpad Allocation for JUP Stakers',
    author: 'jupmaster.sol',
    status: 'Active',
    description: 'This proposal suggests increasing the allocation percentage for JUP stakers in the LFG Launchpad from 1% to 2% to reward long-term holders.',
    votesFor: 12500000,
    votesAgainst: 3400000,
    endDate: '2024-08-15',
  },
  {
    id: 'JUP-002',
    title: 'Integrate a New Cross-Chain Bridge Partner',
    author: 'bridgooor.sol',
    status: 'Active',
    description: 'Evaluate and integrate a new bridge partner to enhance cross-chain swap capabilities and reduce fees for transfers from Ethereum.',
    votesFor: 8900000,
    votesAgainst: 1100000,
    endDate: '2024-08-20',
  },
  {
    id: 'JUP-003',
    title: 'Fund a Community-Led Marketing Initiative',
    author: 'communityDAO.sol',
    status: 'Passed',
    description: 'Allocate 500,000 USDC from the treasury to fund a six-month marketing campaign managed by the community DAO to increase brand awareness.',
    votesFor: 25000000,
    votesAgainst: 2000000,
    endDate: '2024-07-30',
  },
  {
    id: 'JUP-004',
    title: 'Reduce DAO Proposal Quorum',
    author: 'govnerd.sol',
    status: 'Failed',
    description: 'Lower the quorum for passing proposals from 50M JUP to 25M JUP to encourage more community participation.',
    votesFor: 15000000,
    votesAgainst: 18000000,
    endDate: '2024-07-25',
  },
];


export type WalletInfo = {
  name: string;
  iconUrl: string;
};

export const WALLETS: WalletInfo[] = [
  { name: 'Phantom', iconUrl: 'https://ph-files.imgix.net/c822a688-c7cb-434e-9f45-23c21d723795.png?auto=compress&codec=mozjpeg&cs=strip&w=64&h=64&fit=crop' },
  { name: 'Solflare', iconUrl: 'https://user-images.githubusercontent.com/35293973/167292215-dacc1356-7848-4770-a337-33a80a2232b6.png' },
  { name: 'Backpack', iconUrl: 'https://user-images.githubusercontent.com/35293973/207936798-b8c66e28-1b9c-486a-af1d-2d480d5b4004.png' },
];

export type Order = {
  id: string;
  type: 'Limit' | 'DCA';
  fromToken: Token;
  toToken: Token;
  amount: number;
  details: string;
}

export const ACTIVE_ORDERS: Order[] = [
    { id: '1', type: 'Limit', fromToken: TOKENS[1], toToken: TOKENS[0], amount: 100, details: 'at $150/SOL' },
    { id: '2', type: 'DCA', fromToken: TOKENS[1], toToken: TOKENS[2], amount: 50, details: 'daily for 7 days' },
];
