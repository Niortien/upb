import CampusSection from "@/components/accueil/campus-section";
import HeroSection from "@/components/accueil/hero-section";
import ProgramsSection from "@/components/accueil/programs-section";
import SuccessStoriesSection from "@/components/accueil/success-stories-section";
import TestimonialsSection from "@/components/accueil/testimonials-section";
import WhyChooseSection from "@/components/accueil/why-choose-section";
import Navigation from "@/components/common/navigation";
import Hero from "@/components/home/hero";
import SectionProgrammes from "@/components/home/section-programmes2";
import ServiceDetailsGallery from "@/components/home/service-details-gallery";

export default function Home() {
  return (
    <div >
 
    
    <Navigation />
    <HeroSection />
    <WhyChooseSection/>
    <CampusSection />
    <ProgramsSection />
    <TestimonialsSection />
    <SuccessStoriesSection />
    
    </div>
  );
}
