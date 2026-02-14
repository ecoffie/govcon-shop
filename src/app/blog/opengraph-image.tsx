import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GovCon Resource Center - Strategies to Win Federal Contracts';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 16,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          GovCon Giants
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.2,
          }}
        >
          GovCon Resource Center
        </div>
        <div
          style={{
            fontSize: 26,
            color: 'rgba(255,255,255,0.85)',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Strategies, guides, and intel to win federal contracts
        </div>
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 36,
          }}
        >
          {['Market Research', 'Business Dev', 'LinkedIn', 'Teaming', 'Contract Intel'].map(
            (topic) => (
              <div
                key={topic}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 20,
                  padding: '8px 18px',
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {topic}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
