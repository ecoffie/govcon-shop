import { getSupabase } from './client';

// Storage bucket name for planner attachments
const BUCKET_NAME = 'planner-attachments';

export interface UploadedFile {
  name: string;
  url: string;
  path: string;
  size: number;
  uploadedAt: string;
}

/**
 * Upload a file to Supabase Storage
 * Files are organized by user ID and task ID for easy retrieval
 */
export async function uploadFile(
  userId: string,
  taskId: string,
  file: File
): Promise<UploadedFile | null> {
  const supabase = getSupabase();

  if (!supabase) {
    console.warn('Supabase not configured - file upload unavailable');
    return null;
  }

  try {
    // Create a unique file path: userId/taskId/timestamp-filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${userId}/${taskId}/${timestamp}-${sanitizedName}`;

    // Upload the file
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return {
      name: file.name,
      url: urlData.publicUrl,
      path: data.path,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw error;
  }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(filePath: string): Promise<boolean> {
  const supabase = getSupabase();

  if (!supabase) {
    console.warn('Supabase not configured - file deletion unavailable');
    return false;
  }

  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('Error deleting file:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteFile:', error);
    return false;
  }
}

/**
 * List all files for a specific task
 */
export async function listTaskFiles(
  userId: string,
  taskId: string
): Promise<UploadedFile[]> {
  const supabase = getSupabase();

  if (!supabase) {
    console.warn('Supabase not configured - file listing unavailable');
    return [];
  }

  try {
    const folderPath = `${userId}/${taskId}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(folderPath);

    if (error) {
      console.error('Error listing files:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Map files to UploadedFile format
    return data.map((file) => {
      const fullPath = `${folderPath}/${file.name}`;
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fullPath);

      return {
        name: file.name.replace(/^\d+-/, ''), // Remove timestamp prefix
        url: urlData.publicUrl,
        path: fullPath,
        size: file.metadata?.size || 0,
        uploadedAt: file.created_at || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Error in listTaskFiles:', error);
    return [];
  }
}

/**
 * Get signed URL for private file access (if bucket is not public)
 */
export async function getSignedUrl(
  filePath: string,
  expiresIn: number = 3600
): Promise<string | null> {
  const supabase = getSupabase();

  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      console.error('Error creating signed URL:', error);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Error in getSignedUrl:', error);
    return null;
  }
}
