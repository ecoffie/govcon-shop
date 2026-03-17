import { NextResponse } from 'next/server';

/**
 * Health check endpoint for monitoring
 * Returns basic system status
 */
export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || 'local',
    environment: process.env.VERCEL_ENV || 'development',
  };

  return NextResponse.json(health);
}
