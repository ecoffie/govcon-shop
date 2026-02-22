import type { Metadata } from 'next';
import FreeDownloadPage from '@/components/FreeDownloadPage';

export const metadata: Metadata = {
  title: 'Free 2026 GovCon Action Plan - 12-Month Roadmap',
  description: 'Download your free 2026 federal contracting action plan with month-by-month milestones and weekly task checklists.',
  openGraph: {
    title: 'Free 2026 GovCon Action Plan | GovCon Giants',
    description: 'Download your free 2026 federal contracting action plan with month-by-month milestones.',
    url: '/action-plan-2026',
  },
};

export default function ActionPlan2026Page() {
  return (
    <FreeDownloadPage
      resourceId="action-plan-2026"
      title="2026 GovCon Action Plan"
      description="Your step-by-step roadmap to winning federal contracts in 2026. 12-month plan with monthly milestones and weekly tasks."
      icon="📅"
      value="$497"
    />
  );
}
