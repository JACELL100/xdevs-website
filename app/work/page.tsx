import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { WorkCard } from "@/components/sections/WorkCard";
import { caseStudies } from "@/content/work";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Selected projects from THE xDEVS: web platforms and native mobile apps designed, built and shipped for growing businesses.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="work"
        lines={["Built, shipped,", <span key="m" className="text-metal">in production.</span>]}
        intro="A selection of the products we have designed and engineered. Client names stay private until they are cleared for publication."
      />
      <WorkGrid
        items={caseStudies.map((c, i) => ({
          slug: c.slug,
          categories: c.categories,
          card: <WorkCard study={c} index={i} />,
        }))}
      />
      <FinalCTA />
    </>
  );
}
