import CallToAction from "@/components/home/sections/Cta";
import Faqs from "@/components/home/sections/Faqs";
import Footer from "@/components/home/sections/Footer";
import HeroSection from "@/components/home/sections/HeroSection";
import HowItWorks from "@/components/home/sections/HowItWorks";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <Faqs />
      <CallToAction />
      <Footer />
    </main>
  );
}
