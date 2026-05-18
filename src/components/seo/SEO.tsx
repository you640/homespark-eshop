import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
}

export function SEO({ 
  title, 
  description, 
  canonical, 
  ogTitle, 
  ogDescription, 
  ogImage, 
  ogType = 'website',
  noIndex = false
}: SEOProps) {
  const siteName = "Homespark";
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} – Smart home a doplnky pre moderné bývanie`;
  const defaultDescription = "Smart home zariadenia, dizajnové osvetlenie a moderné bytové doplnky. Rýchle doručenie po celom Slovensku.";
  const baseUrl = "https://homespark-eshop.vercel.app";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={`${baseUrl}${canonical}`} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || description || defaultDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
}
