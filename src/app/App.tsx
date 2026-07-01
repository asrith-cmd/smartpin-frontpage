import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";

import { DeviceSection } from "./components/DeviceSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection";

import { UpgradeSection } from "./components/UpgradeSection";
import { BlueBanner } from "./components/BlueBanner";


export default function App() {
  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />       
        <DeviceSection />
        <FeaturesSection />
        <HowItWorksSection />       
        <UpgradeSection />
        <BlueBanner />
      </main>
    </div>
  );
}
