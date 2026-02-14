import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Opportunity Hunter - Find Federal Agency Buyers',
  description: 'Discover 50+ government agencies awarding contracts in your NAICS codes. Free agency spending analysis, prime contractor matching, and set-aside filtering. Pro tier adds pain points, market tips, and CSV export.',
  openGraph: {
    title: 'Opportunity Hunter - Find Federal Agency Buyers | GovCon Giants',
    description: 'Discover 50+ government agencies awarding contracts in your NAICS codes. Free agency spending analysis, prime contractor matching, and set-aside filtering.',
    url: '/opportunity-hunter',
  },
};

export default function OpportunityHunterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
