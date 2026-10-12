import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms for using the THE xDEVS website.",
  path: "/terms",
});

// [TBD] Placeholder copy. Replace with reviewed terms before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <h2>Using this website</h2>
      <p>
        This website provides general information about THE xDEVS and our services. Content may
        change without notice.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The xDEVS name, logo and site content belong to THE xDEVS unless stated otherwise. Please
        do not reuse them without permission.
      </p>
      <h2>Project engagements</h2>
      <p>Client projects are governed by separate written agreements.</p>
    </LegalPage>
  );
}
