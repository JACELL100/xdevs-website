import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How THE xDEVS handles information you share with us.",
  path: "/privacy",
});

// [TBD] Placeholder copy. Replace with a reviewed privacy policy before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <h2>Information we collect</h2>
      <p>
        When you use our contact form we receive the details you choose to share, such as your
        name, email address and a description of your project.
      </p>
      <h2>How we use it</h2>
      <p>
        We use this information only to respond to your enquiry and to discuss potential work with
        you. We do not sell your information.
      </p>
      <h2>Contact</h2>
      <p>For privacy questions, reach us through the contact page or our LinkedIn company page.</p>
    </LegalPage>
  );
}
