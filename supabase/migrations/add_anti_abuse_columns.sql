-- Add anti-abuse columns to leads table
-- Run this in your Supabase SQL editor

-- Add IP tracking columns
ALTER TABLE leads ADD COLUMN IF NOT EXISTS signup_ip TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_ip TEXT;

-- Add download tracking columns
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_download_at TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS total_downloads INTEGER DEFAULT 0;

-- Add suspicious behavior tracking
ALTER TABLE leads ADD COLUMN IF NOT EXISTS suspicious_flags JSONB DEFAULT '[]'::jsonb;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS flagged_at TIMESTAMPTZ;

-- Create index for quick lookups of flagged accounts
CREATE INDEX IF NOT EXISTS idx_leads_flagged ON leads (flagged_at) WHERE flagged_at IS NOT NULL;

-- Create index for verification token lookups
CREATE INDEX IF NOT EXISTS idx_leads_verification_token ON leads (verification_token) WHERE verification_token IS NOT NULL;

-- Add a view for suspicious leads (for admin dashboard)
CREATE OR REPLACE VIEW suspicious_leads AS
SELECT
  id,
  email,
  source,
  signup_ip,
  last_ip,
  total_downloads,
  jsonb_array_length(suspicious_flags) as flag_count,
  suspicious_flags,
  flagged_at,
  created_at
FROM leads
WHERE flagged_at IS NOT NULL
ORDER BY flagged_at DESC;

-- Grant access to the view
GRANT SELECT ON suspicious_leads TO authenticated;

COMMENT ON COLUMN leads.signup_ip IS 'IP address when user first signed up';
COMMENT ON COLUMN leads.last_ip IS 'Most recent IP address used for downloads';
COMMENT ON COLUMN leads.suspicious_flags IS 'Array of suspicious behavior flags with timestamps';
COMMENT ON COLUMN leads.flagged_at IS 'First time suspicious behavior was detected';
