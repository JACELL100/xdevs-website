/**
 * Global site copy. Edit text here, not inside components.
 * Items marked [CONFIRM] / [TBD] are not final — see CONTEXT.md and README.md.
 */

export const site = {
  name: "THE xDEVS",
  shortName: "xDEVS",
  domain: "xdevs.in",
  url: "https://xdevs.in",
  industry: "IT System Custom Software Development",
  tagline: "We build what's next.",
  heroSub:
    "Intelligent, secure and scalable software, from web and mobile to AI and blockchain.",
  /** Official description — use verbatim. */
  description: [
    "THE xDEVS stands at the intersection of innovation and technology. We craft intelligent, efficient, and future-ready IT solutions that empower businesses to grow and adapt in the digital era.",
    "Our expertise spans software development, AI-driven systems, and cloud-based solutions, all designed with a focus on performance, security, and scalability. THE xDEVS believes in building technology that not only solves problems but creates opportunities.",
  ],
  metaDescription:
    "THE xDEVS is an engineering-led studio building intelligent, secure and scalable software: web, mobile, AI, cloud and blockchain.",
  founder: "Jacell Sagar Jamble",
  linkedin: "https://www.linkedin.com/company/the-xdevs",
  /** [TBD] Company email / phone / address are not decided. The contact form is the only route. */
  email: null as string | null,
  phone: null as string | null,
  /** [CONFIRM] Founded December 2025 and Mumbai, India — not shown publicly until confirmed. */
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#process" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  studio: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export const capabilities = [
  "Custom Software",
  "AI Systems",
  "Cloud",
  "Mobile Apps",
  "Blockchain",
  "UI/UX",
] as const;

export const pillars = [
  {
    key: "performance",
    icon: "gauge",
    title: "Performance",
    body: "Fast by design: lean code, efficient queries and interfaces that respond the moment you touch them.",
  },
  {
    key: "security",
    icon: "shield",
    title: "Security",
    body: "Security is part of the architecture from day one, not a patch applied at the end.",
  },
  {
    key: "scalability",
    icon: "scale",
    title: "Scalability",
    body: "Systems built to grow with your business, so more users never means a rewrite.",
  },
] as const;

export const values = [
  {
    title: "Engineering-led",
    body: "Decisions start with sound architecture and clean, tested code. We build things that last.",
  },
  {
    title: "Security-first",
    body: "We treat data, access and infrastructure as things to protect from the first commit.",
  },
  {
    title: "Clear communication",
    body: "Plain language, honest timelines and regular check-ins. You always know where your project stands.",
  },
] as const;

/** [CONFIRM copy] Draft founder note — needs approval from the founder before launch. */
export const founderNote = {
  draft: true,
  body: [
    "I started THE xDEVS to build software the way it should be built: carefully, securely and with the future in mind.",
    "Every product we ship is a partnership. We listen first, design with intent and engineer for the long run, so the technology keeps creating opportunities after launch.",
  ],
  signature: "Jacell Sagar Jamble",
  role: "Founder & CEO",
};
