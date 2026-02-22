import type { Metadata } from 'next';
import FreeDownloadPage from '@/components/FreeDownloadPage';

export const metadata: Metadata = {
  title: 'Free 75+ AI Prompts for Government Contractors',
  description: 'Download 75+ battle-tested AI prompts for federal contractors. Proposal writing, capability statements, competitive analysis.',
  openGraph: {
    title: 'Free 75+ AI Prompts for GovCon | GovCon Giants',
    description: 'Download 75+ battle-tested AI prompts for federal contractors.',
    url: '/ai-prompts',
  },
};

export default function AIPromptsPage() {
  return (
    <FreeDownloadPage
      resourceId="ai-prompts"
      title="75+ AI Prompts for GovCon"
      description="Ready-to-use AI prompts to accelerate your federal contracting business. Works with ChatGPT, Claude, and more."
      icon="🤖"
      value="$797"
    />
  );
}
