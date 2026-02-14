import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download All Free Resources',
  description: 'Access and download all 8 free GovCon resources: SBLO contacts, Tier-2 directory, AI prompts, 2026 action plan, December spend forecast, guides, expiring contracts CSV, and tribal contractor list.',
  openGraph: {
    title: 'Download All Free Resources | GovCon Giants',
    description: 'Access and download all 8 free GovCon resources: SBLO contacts, Tier-2 directory, AI prompts, 2026 action plan, and more.',
    url: '/all-free-resources',
  },
};

export default function AllFreeResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
