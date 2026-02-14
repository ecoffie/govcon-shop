import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free GovCon Resources - $5,376+ in Downloads',
  description: 'Get instant access to $5,376+ worth of free government contracting resources: SBLO directory, Tier-2 supplier list, AI prompts, action plan, spending forecast, guides, templates, and expiring contracts CSV.',
  openGraph: {
    title: 'Free GovCon Resources - $5,376+ in Downloads | GovCon Giants',
    description: 'Get instant access to $5,376+ worth of free government contracting resources: SBLO directory, Tier-2 supplier list, AI prompts, action plan, and more.',
    url: '/free-resources',
  },
};

export default function FreeResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
