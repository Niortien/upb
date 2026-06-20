import { Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Kouadio Jean",
    program: "Master en Intelligence Artificielle",
    image: "/assets/image/home/campus/2O4A6842.webp",
    quote:
      "L'université m'a offert des opportunités exceptionnelles. Les professeurs sont passionnés et l'environnement favorise l'innovation. J'ai décroché un stage grâce au réseau d'anciens élèves.",
    rating: 5,
    color: "from-blue-500/10 to-violet-500/5",
    accent: "bg-blue-500",
  },
  {
    name: "Anon Axel",
    program: "Licence en ASSRI",
    image: "/assets/image/home/campus/2O4A6842.webp",
    quote:
      "Les installations sont modernes et le campus est vibrant. J'ai apprécié les projets pratiques qui m'ont préparé au monde professionnel dès la première année.",
    rating: 5,
    color: "from-emerald-500/10 to-teal-500/5",
    accent: "bg-emerald-500",
  },
  {
    name: "Amina Traoré",
    program: "Licence en MIAGE",
    image: "/assets/image/home/campus/2O4A6842.webp",
    quote:
      "L'approche pédagogique axée sur les projets m'a permis de développer des compétences concrètes. La diversité culturelle sur le campus est un vrai plus.",
    rating: 5,
    color: "from-amber-500/10 to-orange-500/5",
    accent: "bg-amber-500",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-primary/4 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="tag-primary mb-3 mx-auto w-fit">✦ Témoignages</div>
          <h2 className="text-4xl sm:text-5xl font-protos font-black text-foreground leading-tight mb-2">
            Ils ont choisi{" "}
            <span className="text-gradient-primary">l&apos;excellence</span>
          </h2>
          <p className="text-base text-muted-foreground font-raleway">
            Les expériences authentiques de nos étudiants qui ont transformé leur passion en carrière.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className={`upb-card p-5 bg-linear-to-br ${t.color} relative overflow-hidden group`}>
              <div className="absolute -top-3 -right-3 text-[100px] font-serif leading-none text-primary/5 select-none">&ldquo;</div>

              <div className={`w-9 h-9 rounded-xl ${t.accent} flex items-center justify-center mb-3 shadow-md`}>
                <Quote className="w-4 h-4 text-white" />
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, si) => (
                  <Star key={si} className="w-3.5 h-3.5 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-foreground/80 leading-relaxed mb-5 font-raleway text-sm italic relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/15 group-hover:ring-primary/40 transition-all duration-300 shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground font-semibold">{t.program}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-muted rounded-full">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-primary/20 border-2 border-white" />
              ))}
            </div>
            <span className="text-sm font-semibold text-muted-foreground">
              Rejoignez{" "}
              <span className="text-primary font-bold">+5 000 étudiants</span>{" "}
              satisfaits
            </span>
          </div>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default TestimonialsSection;
