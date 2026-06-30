import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { TrustSection } from "./components/TrustSection";
import { DeviceSection } from "./components/DeviceSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { UpgradeSection } from "./components/UpgradeSection";
import { BlueBanner } from "./components/BlueBanner";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[#161617] min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <DeviceSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <UpgradeSection />
        <BlueBanner />
      </main>
      <Footer />
    </div>
  );
}
