import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/purchase/', '/verify-email', '/access/'],
      },
    ],
    sitemap: 'https://shop.govcongiants.org/sitemap.xml',
  };
}
