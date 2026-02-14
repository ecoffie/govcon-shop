'use client';

import { AuthProvider } from '@/lib/supabase/AuthContext';

export default function PlannerAuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
