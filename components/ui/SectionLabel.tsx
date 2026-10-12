/** The `< label />` code-bracket motif used above section headings. */
export function SectionLabel({ children, className = "" }: { children: string; className?: string }) {
  return (
    <p
      className={`label inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-grey-400 ${className}`}
    >
      <span className="text-silver-400">&lt;</span>
      {children}
      <span className="text-silver-400">/&gt;</span>
    </p>
  );
}
