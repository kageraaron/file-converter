import { MetadataRoute } from 'next';

const BASE_URL = 'https://privaconvert.com';

const commonConversions = [
  'heic-to-jpg',
  'heic-to-png',
  'pdf-to-jpg',
  'pdf-to-png',
  'jpg-to-pdf',
  'png-to-pdf',
  'mp4-to-mp3',
  'mov-to-mp4',
  'webp-to-jpg',
  'webp-to-png',
  'svg-to-png',
  'mp4-to-gif',
  'gif-to-mp4',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = commonConversions.map((slug) => ({
    url: `${BASE_URL}/convert/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...routes,
  ];
}
