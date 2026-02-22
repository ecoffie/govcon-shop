import type { Metadata } from 'next';
import FreeDownloadPage from '@/components/FreeDownloadPage';

export const metadata: Metadata = {
  title: 'Free Tribal Contractor List - 500+ Native American-Owned Businesses',
  description: 'Download free list of 500+ Native American-owned federal contractors for teaming and subcontracting.',
  openGraph: {
    title: 'Free Tribal Contractor List | GovCon Giants',
    description: 'Download free list of 500+ Native American-owned federal contractors for teaming and subcontracting.',
    url: '/tribal-list',
  },
};

export default function TribalListPage() {
  return (
    <FreeDownloadPage
      resourceId="tribal-list"
      title="Tribal Contractor List"
      description="500+ Native American-owned federal contractors for teaming opportunities. Includes contact info, NAICS codes, and certifications."
      icon="🤝"
      value="$297"
    />
  );
}
