import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, TrendingUp, User } from "lucide-react";
import Image from "next/image";
import Navigation from "../common/navigation";
import { Typewriter } from "../ui/type-writer";

const Blog = () => {
  const featuredPost = {
    title:
      "Percée scientifique : Nos chercheurs découvrent une nouvelle approche en IA quantique",
    excerpt:
      "L'équipe du professeur Laurent a publié une étude révolutionnaire dans Nature qui pourrait transformer l'informatique quantique telle que nous la connaissons.",
    image: "/assets/image/home/campus/2O4A6842.webp",
    category: "Recherche",
    author: "Dr. Marie Laurent",
    date: "15 Mars 2024",
    readTime: "5 min",
  };

  const posts = [
    {
      title: "Cérémonie de remise des diplômes 2024",
      excerpt:
        "Plus de 3,000 étudiants ont célébré leur réussite lors d'une cérémonie mémorable en présence de personnalités internationales.",
      image: "/assets/image/home/campus/2O4A6842.webp",
      category: "Événements",
      author: "Service Communication",
      date: "10 Mars 2024",
      readTime: "3 min",
    },
    {
      title: "Festival International des Cultures : Un succès retentissant",
      excerpt:
        "Notre festival annuel a accueilli des étudiants de plus de 50 pays pour célébrer la diversité culturelle de notre campus.",
      image: "/assets/image/home/campus/2O4A6842.webp",
      category: "Vie Étudiante",
      author: "Association Étudiante",
      date: "8 Mars 2024",
      readTime: "4 min",
    },
    {
      title: "L'équipe de basketball remporte le championnat national",
      excerpt:
        "Victoire historique de nos Lions qui décrochent leur premier titre national après une finale époustouflante.",
      image: "/assets/image/home/campus/2O4A6842.webp",
      category: "Sports",
      author: "Département Sports",
      date: "5 Mars 2024",
      readTime: "3 min",
    },
  ];

  const categories = [
    "Tous",
    "Recherche",
    "Événements",
    "Vie Étudiante",
    "Sports",
    "Innovations",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                <Typewriter
                  text={["Blog & Actualités"]}
                  loop={true}
                  speed={100}
                  className="text-2xl font-protos"
                />
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-protos font-bold text-foreground mb-6">
              Actualités Universitaires de <span className="text-secondary">UPB</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Restez informés des dernières nouvelles, événements et réussites
              de notre communauté académique
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-40 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-6 py-2 rounded-full border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 whitespace-nowrap font-medium text-foreground hover:text-primary"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-bold text-foreground">À la Une</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 bg-card rounded-3xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-500 group animate-fade-in">
              <div className="relative h-96 lg:h-auto overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-secondary text-white rounded-full text-sm font-semibold">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>

                <Button className="group/btn w-fit bg-primary hover:bg-primary/90 rounded-full">
                  Lire l&apos;article
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12">
              Articles Récents
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article
                  key={index}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/90 backdrop-blur-sm text-white rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      className="group/btn w-full justify-between hover:bg-primary/5"
                    >
                      <span>Lire la suite</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-10 border-2"
              >
                Charger plus d&apos;articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-linear-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4 font-protos ">Restez Informés</h2>
            <p className="text-xl text-white/90 mb-8">
              Abonnez-vous à notre newsletter pour recevoir les dernières
              actualités directement dans votre boîte mail
            </p>
            <div className="flex flex-col justify-center sm:flex-row gap-4 max-w-xl mx-auto">
              
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8 whitespace-nowrap"
              >
                S&apos;abonner
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
