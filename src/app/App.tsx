import { ContactFormProvider } from "@/providers/ContactFormProvider";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { DeviceSection } from "@/sections/DeviceSection";
import { FeaturesSection } from "@/sections/FeaturesSection";
import { HowItWorksSection } from "@/sections/HowItWorksSection";
import { UpgradeSection } from "@/sections/UpgradeSection";
import { BlueBanner } from "@/sections/BlueBanner";
import { ContactFormSection } from "@/sections/contact/ContactFormSection";

export default function App() {
  return (
    <ContactFormProvider>
      <div className="bg-black min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <main>
          <HeroSection />
          <DeviceSection />
          <FeaturesSection />
          <HowItWorksSection />
          <UpgradeSection />
          <BlueBanner />
          <ContactFormSection />
        </main>
      </div>
    </ContactFormProvider>
  );
}
