import type { Metadata } from 'next';
import PlannerAuthWrapper from './PlannerAuthWrapper';

export const metadata: Metadata = {
  title: '2026 GovCon Action Planner',
  description: 'Interactive task management dashboard for your 2026 federal contracting action plan. 5 phases, 36 tasks, progress tracking, resource library, and PDF export. Stay on track to win federal contracts.',
  openGraph: {
    title: '2026 GovCon Action Planner | GovCon Giants',
    description: 'Interactive task management dashboard for your 2026 federal contracting action plan. 5 phases, 36 tasks, progress tracking, and resource library.',
    url: '/planner',
  },
};

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlannerAuthWrapper>
      {children}
    </PlannerAuthWrapper>
  );
}
