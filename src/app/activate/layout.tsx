import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activate Your Tools',
  description: 'Access your purchased GovCon Giants tools. Enter your purchase email to view and activate Market Assassin, Content Reaper, Contractor Database, Recompete Tracker, and Opportunity Hunter Pro.',
  openGraph: {
    title: 'Activate Your Tools | GovCon Giants',
    description: 'Access your purchased GovCon Giants tools. Enter your purchase email to view and activate all your federal contracting tools.',
    url: '/activate',
  },
};

export default function ActivateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
