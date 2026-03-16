

export interface MetaTagProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
}


export function updateMetaTags({
  title,
  description,
  keywords = "",
  image = "https://georgevictorkamal.com/og-image.jpg",
  url = "https://georgevictorkamal.com",
  type = "website",
}: MetaTagProps): void {
  
  document.title = title;

  
  updateMetaTag("description", description);
  updateMetaTag("keywords", keywords);
  updateMetaTag("og:title", title, "property");
  updateMetaTag("og:description", description, "property");
  updateMetaTag("og:type", type, "property");
  updateMetaTag("og:image", image, "property");
  updateMetaTag("og:url", url, "property");
  updateMetaTag("twitter:title", title, "name");
  updateMetaTag("twitter:description", description, "name");
  updateMetaTag("twitter:image", image, "name");

  
  updateCanonicalUrl(url);
}


function updateMetaTag(
  name: string,
  content: string,
  attribute: "name" | "property" = "name"
): void {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.content = content;
}


function updateCanonicalUrl(url: string): void {
  let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = url;
}


export function createJsonLd(data: Record<string, unknown>): void {
  let script = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}


export function createPersonSchema(overrides: Record<string, unknown> = {}): void {
  createJsonLd({
    "@context": "https://schema.org/",
    "@type": "Person",
    name: "George Victor Kamal",
    url: "https://georgevictorkamal.com",
    image: "https://georgevictorkamal.com/profile-image.jpg",
    sameAs: [
      "https://www.linkedin.com/in/georgevictorkamal/",
      "https://github.com/georgevictorkamal",
    ],
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Self-employed / Freelance",
    },
    ...overrides,
  });
}


export function createBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): void {
  createJsonLd({
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });
}


export function createProjectSchema(project: {
  name: string;
  description: string;
  image?: string;
  url?: string;
  datePublished?: string;
  keywords?: string[];
}): void {
  createJsonLd({
    "@context": "https://schema.org/",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    image: project.image,
    url: project.url,
    datePublished: project.datePublished,
    keywords: project.keywords?.join(", "),
    author: {
      "@type": "Person",
      name: "George Victor Kamal",
    },
  });
}
