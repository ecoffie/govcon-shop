import { ImageResponse } from 'next/og';
import { blogArticles, topicColors } from '@/data/blog-articles';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateImageMetadata() {
  return blogArticles.map((article) => ({
    id: article.slug,
    alt: article.title,
    size,
    contentType,
  }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const article = blogArticles.find((a) => a.slug === params.slug);
  if (!article) {
    return new ImageResponse(
      <div style={{ background: '#1e3a8a', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 48 }}>
        GovCon Giants Blog
      </div>,
      { ...size }
    );
  }

  const colors = topicColors[article.topic] || { bg: '#f1f5f9', text: '#475569' };

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: colors.bg,
              color: colors.text,
              padding: '6px 16px',
              borderRadius: 20,
              fontSize: 16,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {article.topicLabel}
          </div>
          {article.toolBadge && (
            <div
              style={{
                background: '#e0f2fe',
                color: '#0369a1',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Uses: {article.toolBadge}
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            maxWidth: 950,
            marginBottom: 30,
          }}
        >
          {article.title}
        </div>
        <div
          style={{
            fontSize: 20,
            color: 'rgba(255,255,255,0.6)',
            fontWeight: 600,
          }}
        >
          GovCon Giants
        </div>
      </div>
    ),
    { ...size }
  );
}
