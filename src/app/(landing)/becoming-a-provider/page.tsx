import CallToAction from "@/components/becoming-a-provider/sections/Cta";
import Faqs from "@/components/becoming-a-provider/sections/Faqs";
import HeroSection from "@/components/becoming-a-provider/sections/HeroSection";
import HowItWorks from "@/components/becoming-a-provider/sections/HowItWorks";

const BecommingAProvider = () => {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <Faqs />
      <CallToAction />
    </main>
  );
};

export default BecommingAProvider;
