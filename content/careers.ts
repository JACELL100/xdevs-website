/**
 * Careers content (CONTEXT.md §6).
 * Full role detail (responsibilities, requirements, perks) lives in the JD document. [TBD: paste from JD]
 * Do NOT publish details of the Full-Stack take-home assessment.
 */

export const careers = {
  headline: "Join the xDEVS",
  intro:
    "We are hiring 10 interns across four tracks. Work alongside the core team on real products, learn fast and ship things that matter.",
  totalOpenings: 10,
  details: [
    { label: "Duration", value: "3 to 6 months" },
    { label: "Mode", value: "Remote / On-site / Hybrid" },
    { label: "Stipend", value: "Performance-based" },
    { label: "Interview", value: "Offline (in person)" },
  ],
  recognition: ["Performance-based stipend", "Certificate of Completion", "Letter of Appreciation"],
  /** On-site application form is optional [TBD]; apply via LinkedIn for now. */
  applyUrl: "https://www.linkedin.com/company/the-xdevs",
};

export type Role = {
  slug: string;
  title: string;
  openings: number;
  focus: string;
  summary: string;
  areas: string[];
};

export const roles: Role[] = [
  {
    slug: "full-stack-developer-intern",
    title: "Full-Stack Developer Intern",
    openings: 4,
    focus: "Web apps, APIs and databases",
    summary:
      "Build and ship features across the stack, from interfaces to APIs and data, alongside the core engineering team.",
    areas: ["Web applications", "APIs", "Databases"],
  },
  {
    slug: "business-development-sales-intern",
    title: "Business Development & Sales Intern",
    openings: 2,
    focus: "Lead generation and client acquisition",
    summary:
      "Find and qualify new opportunities and help bring new clients to THE xDEVS.",
    areas: ["Lead generation", "Client acquisition", "Outreach"],
  },
  {
    slug: "social-media-intern",
    title: "Social Media Intern",
    openings: 2,
    focus: "Content, community and brand presence",
    summary:
      "Shape how THE xDEVS shows up online through content, community and a consistent brand presence.",
    areas: ["Content", "Community", "Brand presence"],
  },
  {
    slug: "design-video-editing-intern",
    title: "Design & Video Editing Intern",
    openings: 2,
    focus: "Visual design, motion and video",
    summary:
      "Create visuals, motion and video that bring the xDEVS brand and its work to life.",
    areas: ["Visual design", "Motion", "Video"],
  },
];
