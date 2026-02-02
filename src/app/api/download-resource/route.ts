import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase/client';
import { checkRateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';

// Resource mapping with file paths
const RESOURCES: Record<string, { file: string; type: string; name: string }> = {
  'sblo-list': {
    file: 'sblo-contact-list',
    type: 'html',
    name: 'SBLO Contact List',
  },
  'tier2-directory': {
    file: 'tier2-supplier-directory',
    type: 'html',
    name: 'Tier-2 Supplier Directory',
  },
  'ai-prompts': {
    file: 'ai-prompts-govcon',
    type: 'html',
    name: 'AI Prompts for GovCon',
  },
  'action-plan-2026': {
    file: 'action-plan-2026',
    type: 'html',
    name: '2026 GovCon Action Plan',
  },
  'december-spend': {
    file: 'december-spend-forecast',
    type: 'html',
    name: 'December Spend Forecast',
  },
  'guides-templates': {
    file: 'govcon-guides-templates',
    type: 'html',
    name: 'GovCon Guides & Templates',
  },
  'expiring-contracts-csv': {
    file: 'expiring-contracts-sample',
    type: 'csv',
    name: 'Expiring Contracts CSV',
  },
  'tribal-list': {
    file: 'tribal-contractor-list',
    type: 'html',
    name: 'Tribal Contractor List',
  },
};

// Suspicious behavior thresholds
const SUSPICIOUS_THRESHOLDS = {
  uniqueResourcesPerHour: 8, // Downloading all 8 resources in 1 hour is suspicious
  totalDownloadsPerDay: 50,  // More than 50 downloads per day is suspicious
  rapidFireSeconds: 10,      // Downloads less than 10 seconds apart
  rapidFireCount: 5,         // 5 rapid fire downloads triggers flag
};

interface DownloadLog {
  resource_id: string;
  downloaded_at: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resourceId = searchParams.get('resource');
    const email = searchParams.get('email');
    const clientIp = getClientIp(request);

    // Validate parameters
    if (!resourceId || !email) {
      return NextResponse.json(
        { error: 'Resource ID and email are required' },
        { status: 400 }
      );
    }

    const resource = RESOURCES[resourceId];
    if (!resource) {
      return NextResponse.json(
        { error: 'Invalid resource ID' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate limit by email
    const emailRateLimit = checkRateLimit(
      `download:email:${normalizedEmail}`,
      RATE_LIMITS.download
    );

    if (!emailRateLimit.success) {
      console.log(`Download rate limit exceeded for email: ${normalizedEmail}`);
      return NextResponse.json(
        { error: 'Download limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Rate limit by IP
    const ipRateLimit = checkRateLimit(
      `download:ip:${clientIp}`,
      RATE_LIMITS.downloadPerIp
    );

    if (!ipRateLimit.success) {
      console.log(`Download rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { error: 'Download limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Verify user is verified
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('email', normalizedEmail)
      .single();

    if (leadError || !lead?.email_verified) {
      return NextResponse.json(
        { error: 'Email not verified. Please verify your email first.' },
        { status: 403 }
      );
    }

    // Track download and check for suspicious behavior
    const now = new Date().toISOString();
    const downloadLog: DownloadLog = {
      resource_id: resourceId,
      downloaded_at: now,
    };

    // Get existing download history
    const existingDownloads: DownloadLog[] = lead.resources_accessed || [];
    const updatedDownloads = [...existingDownloads, downloadLog];

    // Check for suspicious behavior
    const suspiciousFlags = checkSuspiciousBehavior(updatedDownloads, clientIp, lead);

    // Update lead with download history and flags
    const updateData: Record<string, unknown> = {
      resources_accessed: updatedDownloads,
      last_download_at: now,
      last_ip: clientIp,
      total_downloads: (lead.total_downloads || 0) + 1,
    };

    if (suspiciousFlags.length > 0) {
      updateData.suspicious_flags = [
        ...(lead.suspicious_flags || []),
        ...suspiciousFlags.map(flag => ({ flag, detected_at: now, ip: clientIp }))
      ];
      updateData.flagged_at = lead.flagged_at || now;
      console.log(`Suspicious behavior detected for ${normalizedEmail}:`, suspiciousFlags);
    }

    await supabase
      .from('leads')
      .update(updateData)
      .eq('email', normalizedEmail);

    // Get the file
    const filePath = path.join(process.cwd(), 'public', 'resources', `${resource.file}.${resource.type}`);

    try {
      const fileContent = await fs.readFile(filePath);

      // For PDFs, add watermark
      if (resource.type === 'pdf') {
        const watermarkedPdf = await watermarkPdf(fileContent, normalizedEmail);
        return new NextResponse(Buffer.from(watermarkedPdf), {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${resource.file}-${normalizedEmail.split('@')[0]}.pdf"`,
          },
        });
      }

      // For HTML files, inject watermark comment/footer
      if (resource.type === 'html') {
        const watermarkedHtml = watermarkHtml(fileContent.toString(), normalizedEmail);
        return new NextResponse(watermarkedHtml, {
          headers: {
            'Content-Type': 'text/html',
            'Content-Disposition': `inline; filename="${resource.file}.html"`,
          },
        });
      }

      // For CSV, add header comment with email
      if (resource.type === 'csv') {
        const watermarkedCsv = watermarkCsv(fileContent.toString(), normalizedEmail);
        return new NextResponse(watermarkedCsv, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="${resource.file}.csv"`,
          },
        });
      }

      // Default: return file as-is
      return new NextResponse(fileContent, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${resource.file}.${resource.type}"`,
        },
      });
    } catch {
      console.error(`File not found: ${filePath}`);
      return NextResponse.json(
        { error: 'Resource file not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    );
  }
}

/**
 * Check for suspicious download behavior
 */
function checkSuspiciousBehavior(
  downloads: DownloadLog[],
  clientIp: string,
  lead: Record<string, unknown>
): string[] {
  const flags: string[] = [];
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Filter recent downloads
  const lastHourDownloads = downloads.filter(
    d => new Date(d.downloaded_at) > oneHourAgo
  );
  const lastDayDownloads = downloads.filter(
    d => new Date(d.downloaded_at) > oneDayAgo
  );

  // Check: All resources downloaded in 1 hour
  const uniqueResourcesLastHour = new Set(lastHourDownloads.map(d => d.resource_id));
  if (uniqueResourcesLastHour.size >= SUSPICIOUS_THRESHOLDS.uniqueResourcesPerHour) {
    flags.push('bulk_download_all_resources');
  }

  // Check: Too many total downloads in a day
  if (lastDayDownloads.length > SUSPICIOUS_THRESHOLDS.totalDownloadsPerDay) {
    flags.push('excessive_daily_downloads');
  }

  // Check: Rapid fire downloads (bot-like behavior)
  const sortedDownloads = [...downloads].sort(
    (a, b) => new Date(b.downloaded_at).getTime() - new Date(a.downloaded_at).getTime()
  );

  let rapidFireCount = 0;
  for (let i = 0; i < sortedDownloads.length - 1; i++) {
    const timeDiff =
      (new Date(sortedDownloads[i].downloaded_at).getTime() -
       new Date(sortedDownloads[i + 1].downloaded_at).getTime()) / 1000;

    if (timeDiff < SUSPICIOUS_THRESHOLDS.rapidFireSeconds) {
      rapidFireCount++;
    }
  }

  if (rapidFireCount >= SUSPICIOUS_THRESHOLDS.rapidFireCount) {
    flags.push('rapid_fire_downloads');
  }

  // Check: IP changed since signup (potential account sharing)
  if (lead.signup_ip && lead.signup_ip !== clientIp) {
    // Only flag if they've downloaded from many different IPs
    const uniqueIps = new Set([lead.signup_ip, clientIp, lead.last_ip].filter(Boolean));
    if (uniqueIps.size > 2) {
      flags.push('multiple_ip_addresses');
    }
  }

  return flags;
}

/**
 * Watermark a PDF with user email
 */
async function watermarkPdf(pdfBuffer: Buffer, email: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  const watermarkText = `Licensed to: ${email}`;
  const fontSize = 8;

  for (const page of pages) {
    const { width, height } = page.getSize();

    // Add watermark at bottom of each page
    page.drawText(watermarkText, {
      x: 10,
      y: 10,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0.7, 0.7, 0.7),
    });

    // Add diagonal watermark across page (more visible)
    page.drawText(email, {
      x: width / 4,
      y: height / 2,
      size: 24,
      font: helveticaFont,
      color: rgb(0.95, 0.95, 0.95),
      rotate: degrees(45),
    });
  }

  return pdfDoc.save();
}

/**
 * Watermark HTML content with user email
 */
function watermarkHtml(html: string, email: string): string {
  const watermarkComment = `<!-- Licensed to: ${email} - Downloaded: ${new Date().toISOString()} -->`;

  const watermarkFooter = `
    <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #f3f4f6; padding: 8px; text-align: center; font-size: 11px; color: #6b7280; border-top: 1px solid #e5e7eb; z-index: 9999;">
      Licensed to: ${email} | GovCon Giants | Do not redistribute
    </div>
    <style>
      @media print {
        body::after {
          content: "Licensed to: ${email}";
          position: fixed;
          bottom: 10px;
          left: 10px;
          font-size: 10px;
          color: #999;
        }
      }
    </style>
  `;

  // Add comment at top
  let watermarkedHtml = watermarkComment + '\n' + html;

  // Add footer before </body>
  if (watermarkedHtml.includes('</body>')) {
    watermarkedHtml = watermarkedHtml.replace('</body>', watermarkFooter + '</body>');
  } else {
    watermarkedHtml += watermarkFooter;
  }

  return watermarkedHtml;
}

/**
 * Watermark CSV content with user email
 */
function watermarkCsv(csv: string, email: string): string {
  const watermarkHeader = `# Licensed to: ${email}\n# Downloaded: ${new Date().toISOString()}\n# GovCon Giants - Do not redistribute\n#\n`;
  return watermarkHeader + csv;
}
