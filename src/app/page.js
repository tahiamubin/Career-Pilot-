import Hero from "@/components/Hero";
import FeaturedJobs from "@/components/FeaturedJobs";
import TopCompanies from "@/components/TopCompanies";
import HowItWorks from "@/components/HowItWorks";
import AIFeatures from "@/components/AIFeatures";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <FeaturedJobs />
      <TopCompanies />
      <HowItWorks />
      <AIFeatures />
      <Stats />
      <Testimonials />
    </div>
  );
}
