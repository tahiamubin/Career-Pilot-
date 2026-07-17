import Hero from "@/components/Hero";
import FeaturedJobs from "@/components/FeaturedJobs";
import HowItWorks from "@/components/HowItWorks";
import AIFeatures from "@/components/AIFeatures";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <FeaturedJobs />
      <HowItWorks />
      <AIFeatures />
      <Stats />
      <Testimonials />
    </div>
  );
}
