import Image from "next/image";
import { Typewriter } from "../ui/type-writer";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={"/assets/image/home/campus/2O4A6842.webp"}
          alt="Campus universitaire prestigieux"
          className="w-full h-full object-cover"
          width={200}
          height={200}
        />
        <div className="absolute inset-0  " />
      </div>

      {/* Content */}
      <div className="relative z-10  container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-secondary font-bold  border border-secondary/30 mb-8">
            <span className="text-6xl font-protos text-secondary">UPB</span>
          </div>

          <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tigt">
            <Typewriter
              text={[" Université Polytechnique de Bingerville "]}
              loop={true}
              speed={100}
              className="text-6xl font-protos"
            />
          </div>


          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { number: "15,000+", label: "Étudiants" },
              { number: "200+", label: "Programmes" },
              { number: "50+", label: "Pays" },
              { number: "95%", label: "Taux d'emploi" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-primary/60  rounded-2xl p-6 border border-white/80"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-secondary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32  z-10" />
    </section>
  );
};

export default HeroSection;
