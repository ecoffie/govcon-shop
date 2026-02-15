import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { email, context } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const supabase = getSupabase();

    if (supabase) {
      // Check if lead already exists
      const { data: existing } = await supabase
        .from('leads')
        .select('id, resources_accessed')
        .eq('email', normalizedEmail)
        .single();

      if (existing) {
        // Update existing lead with opportunity-hunter source and context
        const resources = existing.resources_accessed || [];
        const updatedResources = resources.includes('opportunity-hunter')
          ? resources
          : [...resources, 'opportunity-hunter'];

        await supabase
          .from('leads')
          .update({
            resources_accessed: updatedResources,
            context: context || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
      } else {
        // Insert new lead
        await supabase.from('leads').insert({
          email: normalizedEmail,
          source: 'opportunity-hunter',
          resources_accessed: ['opportunity-hunter'],
          context: context || null,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Opportunity lead capture error:', error);
    // Never block access — always return success
    return NextResponse.json({ success: true });
  }
}
