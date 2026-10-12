export type IconName =
  | "code"
  | "spark"
  | "cloud"
  | "phone"
  | "chain"
  | "layers"
  | "gauge"
  | "shield"
  | "scale";

export type Service = {
  slug: string;
  index: string;
  title: string;
  /** Two-line summary used on the home bento grid. */
  short: string;
  /** Longer description for /services. */
  description: string;
  covers: string[];
  deliverables: string[];
  icon: IconName;
};

export const services: Service[] = [
  {
    slug: "custom-software",
    index: "01",
    title: "Custom Software Development",
    short:
      "Full-stack web platforms and internal tools, built end to end from requirements and architecture to deployment.",
    description:
      "We design and build full-stack web platforms and internal tools that fit how your business actually works, taking them from requirements and architecture all the way to a reliable deployment.",
    covers: [
      "Web platforms and customer portals",
      "Internal tools and dashboards",
      "APIs, integrations and databases",
      "Modernising existing systems",
    ],
    deliverables: [
      "Technical scope and architecture plan",
      "Production-ready web application",
      "Documented APIs",
      "Deployment and handover",
    ],
    icon: "code",
  },
  {
    slug: "ai-systems",
    index: "02",
    title: "AI-Driven Systems",
    short:
      "Intelligent features and automation: LLM integrations, computer vision and ML-powered workflows.",
    description:
      "We add intelligence where it creates real value: LLM-powered features, computer vision and machine-learning workflows that automate repetitive work and surface better decisions.",
    covers: [
      "LLM integrations and assistants",
      "Computer vision",
      "ML-powered workflows and automation",
      "Data pipelines for AI features",
    ],
    deliverables: [
      "Use-case assessment",
      "Working AI feature integrated into your product",
      "Evaluation and monitoring setup",
      "Documentation for your team",
    ],
    icon: "spark",
  },
  {
    slug: "cloud",
    index: "03",
    title: "Cloud Solutions",
    short:
      "Cloud-based architecture, deployment and scaling with a focus on reliability and security.",
    description:
      "We architect, deploy and scale cloud infrastructure that stays reliable and secure as you grow, with automated releases and clear visibility into how your systems are running.",
    covers: [
      "Cloud architecture on AWS",
      "Deployment pipelines (CI/CD)",
      "Scaling and reliability",
      "Security and access hardening",
    ],
    deliverables: [
      "Infrastructure plan",
      "Automated deployment pipeline",
      "Monitoring and alerting",
      "Runbooks and handover",
    ],
    icon: "cloud",
  },
  {
    slug: "mobile-apps",
    index: "04",
    title: "Mobile Apps",
    short: "Native Android and iOS applications that feel fast, polished and dependable.",
    description:
      "We build native Android and iOS applications that feel fast and natural on every device, connected to secure backends and ready for the app stores.",
    covers: [
      "Native Android (Kotlin)",
      "Native iOS",
      "Backend and API integration",
      "App store release support",
    ],
    deliverables: [
      "App design and prototype",
      "Android and/or iOS builds",
      "Store submission support",
      "Post-launch fixes and updates",
    ],
    icon: "phone",
  },
  {
    slug: "blockchain",
    index: "05",
    title: "Blockchain and Web3 Integration",
    short:
      "Smart contracts and blockchain-backed features: tamper-evident records, on-chain verification, token and payment logic.",
    description:
      "We integrate blockchain where it genuinely helps: smart contracts and blockchain-backed features such as tamper-evident records, on-chain verification, and token or payment logic.",
    covers: [
      "Smart contracts (Solidity)",
      "Tamper-evident records",
      "On-chain verification",
      "Token and payment logic",
    ],
    deliverables: [
      "Contract design and specification",
      "Tested smart contracts",
      "Application integration",
      "Deployment support",
    ],
    icon: "chain",
  },
  {
    slug: "ui-ux",
    index: "06",
    title: "UI/UX and Product Design",
    short: "Interface and product design that is clean, fast and conversion-aware.",
    description:
      "We design interfaces and products that are clean, fast and conversion-aware, turning complex workflows into experiences people enjoy using.",
    covers: [
      "Product and UX strategy",
      "Interface design",
      "Design systems",
      "Interactive prototypes",
    ],
    deliverables: [
      "User flows and wireframes",
      "High-fidelity designs",
      "Reusable component library",
      "Developer-ready specs",
    ],
    icon: "layers",
  },
];
