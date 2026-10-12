/** Technologies the team works with (CONTEXT.md §2). Add only tools the team actually uses. */

export type StackGroup = {
  title: string;
  items: string[];
};

export const stackGroups: StackGroup[] = [
  { title: "Frontend", items: ["React", "Next.js"] },
  { title: "Backend", items: ["Node.js", "Django", "FastAPI"] },
  { title: "Mobile", items: ["Android (Kotlin)", "iOS"] },
  { title: "Cloud", items: ["AWS"] },
  { title: "Blockchain", items: ["Solidity", "Smart contracts"] },
  { title: "AI / ML", items: ["LLMs", "Hugging Face", "OpenCV"] },
];

export const stackFlat = stackGroups.flatMap((g) => g.items);
