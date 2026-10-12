/**
 * Case studies. Only approved or anonymised projects belong here.
 * - Never add client names, logos or numbers until the founder approves them. [CONFIRM]
 * - Results stay qualitative unless real figures are provided.
 */

export type WorkCategory = "web" | "mobile" | "ai" | "cloud" | "blockchain" | "design";

export const workCategories: { key: WorkCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "design", label: "UI/UX" },
];

export type CaseStudy = {
  slug: string;
  title: string;
  /** Short line for cards. */
  summary: string;
  categories: WorkCategory[];
  platforms: string[];
  stack: string[];
  /** Device mockups shown on the card. */
  devices: ("laptop" | "phone")[];
  problem: string;
  approach: string[];
  result: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "real-estate-platform",
    // [CONFIRM] Client name withheld until the founder approves.
    title: "Real estate platform, web + iOS",
    summary:
      "A property marketplace with a React + Django REST web app and a native iOS app for listing, browsing, buying and selling.",
    categories: ["web", "mobile", "design"],
    platforms: ["Web", "iOS"],
    stack: ["React", "Django REST Framework", "iOS"],
    devices: ["laptop", "phone"],
    problem:
      "Buyers, sellers and agents needed one place to list properties, browse what is available and move through buy and sell flows, whether they were at a desk or on the go.",
    approach: [
      "Designed the listing, browsing and transaction flows around how buyers and sellers actually search for property.",
      "Built a React web application backed by a Django REST API as a single source of truth.",
      "Delivered a native iOS app on the same API, so listings and activity stay in sync across platforms.",
    ],
    result: [
      "One consistent marketplace experience across web and iOS.",
      "Listing, browsing and buy/sell flows in a single product.",
      "A clean API foundation ready for new features and platforms.",
    ],
  },
  {
    slug: "mobile-apps-for-businesses",
    title: "Native mobile apps for growing businesses",
    summary:
      "Android and iOS apps built for client businesses, from first prototype to store-ready release.",
    categories: ["mobile", "design"],
    platforms: ["Android", "iOS"],
    stack: ["Kotlin", "iOS", "REST APIs"],
    devices: ["phone", "phone"],
    problem:
      "Businesses wanted dependable mobile apps that their customers would enjoy using, without the compromises of a one-size-fits-all template.",
    approach: [
      "Scoped each app around its core user journeys before design began.",
      "Built native Android and iOS applications connected to secure backends.",
      "Supported testing and release, then iterated on feedback after launch.",
    ],
    result: [
      "Native apps that feel fast and natural on each platform.",
      "Codebases structured for ongoing updates.",
      "A repeatable process from prototype to release.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
