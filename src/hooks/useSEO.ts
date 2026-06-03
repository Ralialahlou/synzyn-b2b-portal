import { useEffect } from 'react';

interface SEOMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
  noindex?: boolean;
  schema?: object | object[];
}

const BASE_URL = 'https://b2b.synzyn.ma';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const BRAND = 'SYN+ZYN B2B';

export function useSEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  noindex = false,
  schema,
}: SEOMeta) {
  const fullTitle = title.includes('SYN+ZYN') ? title : `${title} | ${BRAND}`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Helper: set or create meta tag
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const attr = selector.startsWith('meta[name')
          ? 'name'
          : selector.startsWith('meta[property')
          ? 'property'
          : 'name';
        const val = selector.match(/["']([^"']+)["']/)?.[1] || '';
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Basic meta
    setMeta('meta[name="description"]', description);
    setMeta('meta[name="robots"]', noindex ? 'noindex,nofollow' : 'index,follow');

    // Open Graph
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:site_name"]', 'SYN+ZYN');
    if (canonicalUrl) {
      setMeta('meta[property="og:url"]', canonicalUrl);
      setLink('canonical', canonicalUrl);
    }

    // Twitter Card
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', ogImage);

    // JSON-LD schema
    const schemaId = 'page-schema';
    const existing = document.getElementById(schemaId);
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      const el = existing || document.createElement('script');
      el.setAttribute('type', 'application/ld+json');
      el.setAttribute('id', schemaId);
      el.textContent = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
      if (!existing) document.head.appendChild(el);
    } else if (existing) {
      existing.remove();
    }

    return () => {
      // Reset to defaults on unmount
      document.title = BRAND;
    };
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, noindex, schema]);
}
