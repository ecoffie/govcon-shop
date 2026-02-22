import type { Metadata } from 'next';
import FreeDownloadPage from '@/components/FreeDownloadPage';

export const metadata: Metadata = {
  title: 'Free GovCon Guides & Templates',
  description: 'Download free federal contracting guides and templates: 2026 NDAA provisions, agency pain points framework, and more.',
  openGraph: {
    title: 'Free GovCon Guides & Templates | GovCon Giants',
    description: 'Download free federal contracting guides and templates.',
    url: '/guides-templates',
  },
};

export default function GuidesTemplatesPage() {
  return (
    <FreeDownloadPage
      resourceId="guides-templates"
      title="GovCon Guides & Templates"
      description="Comprehensive guides and ready-to-use templates for federal contracting. Includes 2026 NDAA summary, agency pain points framework, and more."
      icon="📄"
      value="$97"
    />
  );
}
