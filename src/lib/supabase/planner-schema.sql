-- Supabase schema for GovCon Action Planner
-- Run this SQL in your Supabase SQL editor to create the required tables

-- Create user_plans table
CREATE TABLE IF NOT EXISTS user_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  phase_id INTEGER NOT NULL,
  task_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  notes TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one record per user per task
  UNIQUE(user_id, task_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_plans_user_id ON user_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_user_plans_phase_id ON user_plans(phase_id);
CREATE INDEX IF NOT EXISTS idx_user_plans_user_phase ON user_plans(user_id, phase_id);
CREATE INDEX IF NOT EXISTS idx_user_plans_completed ON user_plans(completed);

-- Enable Row Level Security (RLS)
ALTER TABLE user_plans ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see and modify their own plans
CREATE POLICY "Users can view their own plans"
  ON user_plans FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own plans"
  ON user_plans FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own plans"
  ON user_plans FOR UPDATE
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own plans"
  ON user_plans FOR DELETE
  USING (auth.uid()::text = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_plans_updated_at
  BEFORE UPDATE ON user_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Task Attachments Table
-- =====================================================

-- Create task_attachments table to store file metadata
CREATE TABLE IF NOT EXISTS task_attachments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  task_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Foreign key reference to user_plans
  CONSTRAINT fk_user_task
    FOREIGN KEY (user_id, task_id)
    REFERENCES user_plans(user_id, task_id)
    ON DELETE CASCADE
);

-- Create indexes for task_attachments
CREATE INDEX IF NOT EXISTS idx_task_attachments_user_id ON task_attachments(user_id);
CREATE INDEX IF NOT EXISTS idx_task_attachments_task_id ON task_attachments(task_id);
CREATE INDEX IF NOT EXISTS idx_task_attachments_user_task ON task_attachments(user_id, task_id);

-- Enable RLS on task_attachments
ALTER TABLE task_attachments ENABLE ROW LEVEL SECURITY;

-- Create policies for task_attachments
CREATE POLICY "Users can view their own attachments"
  ON task_attachments FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own attachments"
  ON task_attachments FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own attachments"
  ON task_attachments FOR DELETE
  USING (auth.uid()::text = user_id);

-- =====================================================
-- Storage Bucket Setup
-- =====================================================
-- Run this in your Supabase dashboard > Storage > Create bucket
-- Bucket name: planner-attachments
-- Public: false (for private access with signed URLs)
-- File size limit: 10MB
-- Allowed MIME types: application/pdf, image/*, application/msword,
--   application/vnd.openxmlformats-officedocument.wordprocessingml.document,
--   application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

-- Storage RLS policies (run in SQL editor after creating bucket):
-- CREATE POLICY "Users can upload to their own folder"
--   ON storage.objects FOR INSERT
--   WITH CHECK (
--     bucket_id = 'planner-attachments' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Users can view their own files"
--   ON storage.objects FOR SELECT
--   USING (
--     bucket_id = 'planner-attachments' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );

-- CREATE POLICY "Users can delete their own files"
--   ON storage.objects FOR DELETE
--   USING (
--     bucket_id = 'planner-attachments' AND
--     auth.uid()::text = (storage.foldername(name))[1]
--   );


