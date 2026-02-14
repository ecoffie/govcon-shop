import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GovCon Giants - Federal Contracting Tools & Intelligence';
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
            fontSize: 72,
            fontWeight: 800,
            color: 'white',
            marginBottom: 20,
            letterSpacing: '-2px',
          }}
        >
          GovCon Giants
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Federal Contracting Tools & Intelligence
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 40,
          }}
        >
          {['Market Assassin', 'Content Reaper', 'Contractor DB', 'Recompete Tracker', 'Opp Hunter'].map(
            (tool) => (
              <div
                key={tool}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 12,
                  padding: '10px 20px',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {tool}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
