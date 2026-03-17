#!/usr/bin/env npx ts-node
/**
 * LINK VERIFICATION SCRIPT
 * ========================
 * Verifies that all links in page files point to existing routes.
 * Run: npx ts-node scripts/verify-links.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const APP_DIR = path.join(__dirname, '../src/app');

interface LinkIssue {
  file: string;
  line: number;
  link: string;
  issue: string;
}

const issues: LinkIssue[] = [];

// Get all existing routes by scanning app directory
function getExistingRoutes(): Set<string> {
  const routes = new Set<string>();

  function scanDir(dir: string, routePath: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'api') continue;

      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Check if this directory has a page.tsx
        const pagePath = path.join(fullPath, 'page.tsx');
        const newRoute = `${routePath}/${entry.name}`;

        if (fs.existsSync(pagePath)) {
          routes.add(newRoute);
        }

        // Recurse into subdirectories
        scanDir(fullPath, newRoute);
      }
    }
  }

  routes.add('/'); // Root route
  scanDir(APP_DIR);

  return routes;
}

// Extract links from a file
function extractLinks(filePath: string): Array<{ link: string; line: number }> {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const links: Array<{ link: string; line: number }> = [];

  lines.forEach((line, index) => {
    // Match href="/path" patterns
    const hrefMatches = line.matchAll(/href="(\/[^"#?]*)"/g);
    for (const match of hrefMatches) {
      links.push({ link: match[1], line: index + 1 });
    }

    // Match Link href="/path" patterns
    const linkMatches = line.matchAll(/Link\s+href="(\/[^"#?]*)"/g);
    for (const match of linkMatches) {
      links.push({ link: match[1], line: index + 1 });
    }
  });

  return links;
}

// Scan all page files
function scanFiles(dir: string, existingRoutes: Set<string>) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      scanFiles(fullPath, existingRoutes);
    } else if (entry.name.endsWith('.tsx')) {
      const links = extractLinks(fullPath);

      for (const { link, line } of links) {
        // Skip external links, anchors, and special paths
        if (
          link.startsWith('/api/') ||
          link.startsWith('/_next/') ||
          link === '/' ||
          link.endsWith('.html') ||
          link.endsWith('.pdf') ||
          link.endsWith('.png') ||
          link.endsWith('.jpg')
        ) {
          continue;
        }

        // Check if route exists
        if (!existingRoutes.has(link)) {
          const relativePath = path.relative(APP_DIR, fullPath);
          issues.push({
            file: relativePath,
            line,
            link,
            issue: 'Route does not exist',
          });
        }
      }
    }
  }
}

// Main
console.log('🔍 Scanning for broken links...\n');

const existingRoutes = getExistingRoutes();
console.log(`Found ${existingRoutes.size} routes:\n`);
Array.from(existingRoutes)
  .sort()
  .forEach((r) => console.log(`  ${r}`));

console.log('\n📄 Checking page files...\n');
scanFiles(APP_DIR, existingRoutes);

if (issues.length > 0) {
  console.log('❌ BROKEN LINKS FOUND:\n');
  issues.forEach(({ file, line, link, issue }) => {
    console.log(`  ${file}:${line}`);
    console.log(`    Link: ${link}`);
    console.log(`    Issue: ${issue}\n`);
  });
  process.exit(1);
} else {
  console.log('✅ All links valid!\n');
  process.exit(0);
}
