import { Quote, Star } from "lucide-react";
import Image from "next/image";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Kouadio Jean",
      program: "Master en Intelligence Artificielle",
      image: '/assets/image/home/campus/2O4A6842.webp',
      quote: "L'université m'a offert des opportunités exceptionnelles. Les professeurs sont passionnés et l'environnement favorise l'innovation. J'ai décroché un stage chez Google grâce au réseau d'anciens élèves.",
      rating: 5
    },
    {
      name: "Anon Axel",
      program: "Licence en ASSRI",
      image: '/assets/image/home/campus/2O4A6842.webp',
      quote: "Les installations sont modernes et le campus est vibrant. J'ai apprécié les projets pratiques qui m'ont préparé au monde professionnel. L'expérience étudiante est vraiment enrichissante ici.",
      rating: 5
    },
    {
      name: "Amina Traoré",
      program: "Licence en MIAGE",
      image: '/assets/image/home/campus/2O4A6842.webp',
      quote: "L'approche pédagogique axée sur les projets m'a permis de développer des compétences concrètes. J'ai adoré la diversité culturelle sur le campus et les nombreuses activités étudiantes.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider font-protos">Témoignages</span>
          </div>
          <h2 className="text-4xl font-protos sm:text-5xl font-bold text-foreground mb-6">
            Ils Ont Choisi l&apos;Excellence
          </h2>
          <p className="text-lg font-raleway text-muted-foreground leading-relaxed">
            Découvrez les expériences authentiques de nos étudiants qui ont transformé leur passion en carrière.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6 italic">
                {testimonial.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={200}
                  height={200}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/20 group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <div className="font-bold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.program}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
