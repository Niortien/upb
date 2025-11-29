import { CampusSection } from "./home/campus-section";
import Hero from "./home/hero";
import ServiceDetailsGallery from "./home/service-details-gallery";

const Index = () => {
  return (
    <div>
      <Hero />

      <CampusSection />
      <ServiceDetailsGallery />
    </div>
  );
};

export default Index;
