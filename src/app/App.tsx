import { Analytics } from "@vercel/analytics/react";
import { ContactFormProvider } from "@/providers/ContactFormProvider";
import { Navbar } from "@/components/layout/Navbar";
import { IntroScrubberSection } from "@/sections/IntroScrubberSection";
import { HowItWorksSection } from "@/sections/HowItWorksSection";
import { UpgradeSection } from "@/sections/UpgradeSection";
import { BlueBanner } from "@/sections/BlueBanner";
import { ContactFormSection } from "@/sections/contact/ContactFormSection";

export default function App() {
  return (
    <ContactFormProvider>
      <Analytics />
      <div className="bg-black min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <main>
          <IntroScrubberSection />
          <HowItWorksSection />
          <UpgradeSection />
          <BlueBanner />
          <ContactFormSection />
        </main>
      </div>
    </ContactFormProvider>
  );
}
