import { MetadataRoute } from 'next';
import { CALCULATOR_CONFIGS } from '@/config/calculators';
import { COUNTRIES } from '@/config/countries';
import { CalculatorConfig, PageSEO } from '@/types/calculator';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://regulo.online';

  const calculatorUrls: MetadataRoute.Sitemap = Object.values(CALCULATOR_CONFIGS).flatMap((config: CalculatorConfig) => {
    const primarySlug = COUNTRIES[config.countryCode]?.primarySlug;
    return Object.values(config.pages).map((page: PageSEO) => ({
      url: `${baseUrl}/${config.countryCode}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page.slug === primarySlug ? 1.0 : 0.8,
    }));
  });

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      // Kenya country homepage — hub for the /ke long-tail routes below.
      url: `${baseUrl}/ke`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      // Colombia country homepage — hub for the /co long-tail routes below.
      url: `${baseUrl}/co`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      // Morocco country homepage — Arabic hub for the French /ma long-tail routes.
      url: `${baseUrl}/ma`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ];

  return [...staticPages, ...calculatorUrls];
}
