import type { Metadata } from "next";
import { site } from "@/content/site";

/** Per-page metadata with consistent Open Graph / Twitter fields. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path },
    twitter: { title: `${title} | ${site.name}`, description },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: "xDEVS",
  url: site.url,
  logo: `${site.url}/brand/xdevs-logo.png`,
  description: site.description.join(" "),
  founder: { "@type": "Person", name: site.founder },
  sameAs: [site.linkedin],
};

export function jsonLdHtml(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}
