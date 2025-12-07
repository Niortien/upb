import CampusSection from "@/components/accueil/campus-section";
import CarsSection from "@/components/accueil/cars-section";
import HeroSection from "@/components/accueil/hero-section";
import ProgramsSection from "@/components/accueil/programs-section";
import SchoolLifeSection from "@/components/accueil/school-life-section";
import SuccessStoriesSection from "@/components/accueil/success-stories-section";
import TestimonialsSection from "@/components/accueil/testimonials-section";
import WhyChooseSection from "@/components/accueil/why-choose-section";
import Navigation from "@/components/common/navigation";

export default function Home() {
  return (
    <div >
 
    
   
    <HeroSection />
    <WhyChooseSection/>
    <CampusSection />
    <SchoolLifeSection/>
    < CarsSection/>
    <ProgramsSection />
    <TestimonialsSection />
    <SuccessStoriesSection />
    
    </div>
  );
}
