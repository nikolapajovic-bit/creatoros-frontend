import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { PlatformRow } from "@/components/landing/platform-row";
import { FeatureBento } from "@/components/landing/feature-bento";
import { AudienceSplit } from "@/components/landing/audience-split";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

// Public marketing homepage. The previous version of this file redirected
// straight to /dashboard — that redirect has been removed so `/` can serve
// as the logged-out landing page. If you want signed-in users to skip this
// page and land on /dashboard instead, check your auth state (see
// store/auth-store) here and redirect conditionally.
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PlatformRow />
        <FeatureBento />
        <AudienceSplit />
        <HowItWorks />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
