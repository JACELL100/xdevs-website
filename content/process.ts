export type ProcessStep = {
  index: string;
  key: "discover" | "design" | "develop" | "deploy";
  title: string;
  tag: string;
  body: string;
};

export const process: ProcessStep[] = [
  {
    index: "01",
    key: "discover",
    title: "Discover",
    tag: "< phase_discover />",
    body: "Understand the problem, the users and the goals before a single line of code is written.",
  },
  {
    index: "02",
    key: "design",
    title: "Design",
    tag: "< phase_design />",
    body: "Shape the architecture, the UX and a clear plan everyone can see and agree on.",
  },
  {
    index: "03",
    key: "develop",
    title: "Develop",
    tag: "< phase_develop />",
    body: "Write clean, tested, secure code in focused iterations, with progress you can review.",
  },
  {
    index: "04",
    key: "deploy",
    title: "Deploy",
    tag: "< phase_deploy />",
    body: "Launch reliably, monitor what matters and leave room to scale.",
  },
];
