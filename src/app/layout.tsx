import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shop.govcongiants.org'),
  title: {
    default: 'GovCon Giants | Federal Contracting Tools & Intelligence',
    template: '%s | GovCon Giants',
  },
  description: 'Win more federal contracts with AI-powered market intelligence, agency research, content generation, and contractor databases. Tools built for government contractors.',
  keywords: ['government contracting', 'GovCon', 'federal contracts', 'market intelligence', 'small business', 'SAM.gov', 'federal agencies', 'NAICS'],
  authors: [{ name: 'GovCon Giants' }],
  creator: 'GovCon Giants',
  publisher: 'GovCon Giants',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shop.govcongiants.org',
    siteName: 'GovCon Giants',
    title: 'GovCon Giants | Federal Contracting Tools & Intelligence',
    description: 'Win more federal contracts with AI-powered market intelligence, agency research, content generation, and contractor databases.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GovCon Giants | Federal Contracting Tools & Intelligence',
    description: 'Win more federal contracts with AI-powered market intelligence, agency research, content generation, and contractor databases.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GovCon Giants',
  url: 'https://shop.govcongiants.org',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-786-477-0477',
    contactType: 'customer service',
    email: 'service@govcongiants.com',
  },
  sameAs: [
    'https://govcongiants.com',
    'https://tools.govcongiants.org',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
