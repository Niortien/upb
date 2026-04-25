
export interface ClubActivity {
  title: string;
  description: string;
  frequency: string; // "Hebdomadaire", "Mensuel", etc.
  emoji: string;
}

export interface ClubProject {
  title: string;
  description: string;
  year: string;
  type: "solution" | "invention" | "event" | "publication";
  status: "Terminé" | "En cours" | "À venir";
  highlight?: boolean;
}

export interface ClubMember {
  name: string;
  role: string;
  filiere: string;
  avatar: string; // couleur hex de l'avatar placeholder
}

export interface Club {
  id: number;
  slug: string;
  name: string;
  tag: string;
  tagline: string;
  description: string;
  longDescription: string;
  members: number;
  eventsPerYear: number;
  founded: string;
  iconName: string;
  color: string;
  accent: string;
  bgDark: string;
  image: string;
  galleryImages: string[];
  tags: string[];
  activities: ClubActivity[];
  projects: ClubProject[];
  coreTeam: ClubMember[];
  socialLinks: { platform: string; url: string }[];
  joinInfo: string;
  schedule: string; // "Mardis 18h – Salle B204"
  contactEmail: string;
}

export const CLUBS: Club[] = [
  {
    id: 1,
    slug: "informatique",
    name: "Club Informatique",
    tag: "Tech & Innovation",
    tagline: "Coder le futur. Depuis Bingerville.",
    description:
      "Hackathons, développement web, IA et robotique. Les passionnés de tech se retrouvent ici pour créer, innover et repousser les limites du possible.",
    longDescription:
      "Le Club Informatique de l'UPB est l'incubateur des développeurs, data scientists et ingénieurs de demain. Fondé par des étudiants passionnés, il réunit chaque semaine des profils issus du Génie Logiciel, des Réseaux et des Sciences Mathématiques autour de projets concrets, de challenges techniques et de sessions de partage. Nous croyons que la meilleure façon d'apprendre à coder, c'est de construire quelque chose de réel.",
    members: 120,
    eventsPerYear: 18,
    founded: "2016",
    iconName: "Code2",
    color: "#2f3e9e",
    accent: "#4f6ef7",
    bgDark: "#080d2a",
    image: "/assets/image/home/star/laboratoire.jpg",
    galleryImages: [
      "/assets/image/home/star/laboratoire.jpg",
      "/assets/image/home/collectif.jpg",
      "/assets/image/home/campus/2O4A7455.webp",
      "/assets/image/home/star/sortie.jpg",
    ],
    tags: ["Hackathon", "Dev Web", "IA", "Robotique", "Open Source"],
    activities: [
      {
        title: "Hackathon mensuel",
        description: "48h pour concevoir et coder une solution à un problème réel posé par une entreprise partenaire ou un défi social local.",
        frequency: "Mensuel",
        emoji: "⚡",
      },
      {
        title: "Atelier développement web",
        description: "Sessions pratiques couvrant React, Next.js, Node.js et les bases de données modernes. Animées par les membres les plus avancés.",
        frequency: "Hebdomadaire",
        emoji: "🌐",
      },
      {
        title: "Conférence IA & Data",
        description: "Invités professionnels, chercheurs et alumni pour présenter l'état de l'art en intelligence artificielle et en science des données.",
        frequency: "Trimestriel",
        emoji: "🤖",
      },
      {
        title: "Robotique & IoT",
        description: "Conception de robots autonomes et projets domotiques avec Arduino et Raspberry Pi. Initiation au hardware et à l'embarqué.",
        frequency: "Bi-mensuel",
        emoji: "🦾",
      },
      {
        title: "Code review & Peer learning",
        description: "Sessions ouvertes où chacun présente son code, reçoit des retours et apprend des approches des autres membres.",
        frequency: "Hebdomadaire",
        emoji: "🔍",
      },
    ],
    projects: [
      {
        title: "UPB Connect",
        description: "Application mobile développée en Flutter connectant les étudiants entre eux, affichant l'emploi du temps en temps réel et les annonces du campus.",
        year: "2025",
        type: "solution",
        status: "En cours",
        highlight: true,
      },
      {
        title: "AgroSense CI",
        description: "Prototype IoT de surveillance agricole utilisant des capteurs low-cost pour alerter les petits agriculteurs ivoiriens des variations de sol.",
        year: "2024",
        type: "invention",
        status: "Terminé",
        highlight: true,
      },
      {
        title: "Hackathon Abidjan Tech Week — 1er Prix",
        description: "Le club a remporté le 1er prix national avec leur solution de détection automatique de fraudes dans les paiements mobile money.",
        year: "2024",
        type: "event",
        status: "Terminé",
      },
      {
        title: "Bot d'orientation UPB",
        description: "Chatbot IA entraîné sur le règlement et les programmes de l'UPB pour aider les nouveaux étudiants à s'orienter.",
        year: "2023",
        type: "solution",
        status: "Terminé",
      },
      {
        title: "DataViz Côte d'Ivoire",
        description: "Dashboard open-source de visualisation des données économiques et sociales de la Côte d'Ivoire à partir de sources publiques.",
        year: "2023",
        type: "publication",
        status: "Terminé",
      },
    ],
    coreTeam: [
      { name: "Konan Koffi", role: "Président", filiere: "Génie Logiciel L3", avatar: "#2f3e9e" },
      { name: "Amina Touré", role: "Vice-Présidente", filiere: "Data Science M1", avatar: "#4f6ef7" },
      { name: "Yao Mensah", role: "Responsable Projets", filiere: "Réseaux & Télécoms L2", avatar: "#7c3aed" },
    ],
    socialLinks: [
      { platform: "GitHub", url: "#" },
      { platform: "LinkedIn", url: "#" },
    ],
    joinInfo: "Ouvert à tous les étudiants de l'UPB, quel que soit le niveau ou la filière. Première réunion de découverte gratuite et sans engagement.",
    schedule: "Mardis & Jeudis 17h30 — Salle Informatique B204",
    contactEmail: "club.info@upb.edu.ci",
  },
  {
    id: 2,
    slug: "artistique",
    name: "Club Artistique",
    tag: "Arts & Créativité",
    tagline: "Crée. Expose. Transforme.",
    description:
      "Peinture, sculpture, design graphique et arts numériques. Un espace de liberté créative ouvert à toutes les expressions artistiques.",
    longDescription:
      "Le Club Artistique de l'UPB est un refuge pour toutes celles et ceux qui portent en eux le besoin impérieux de créer. Ici, pas de jugement — seulement de l'encre, de la couleur, des pixels et des mains qui façonnent un monde plus beau. Chaque semestre, le club organise une exposition qui rassemble toute l'université autour des œuvres de ses membres.",
    members: 85,
    eventsPerYear: 24,
    founded: "2017",
    iconName: "Palette",
    color: "#c0392b",
    accent: "#e74c3c",
    bgDark: "#1a0808",
    image: "/assets/image/home/star/motivation.jpg",
    galleryImages: [
      "/assets/image/home/star/motivation.jpg",
      "/assets/image/home/star/image.jpg",
      "/assets/image/home/collectif.jpg",
      "/assets/image/home/star/etudiant.jpg",
    ],
    tags: ["Peinture", "Design", "Arts numériques", "Sculpture", "Illustration"],
    activities: [
      {
        title: "Atelier peinture & aquarelle",
        description: "Séances hebdomadaires animées par des artistes expérimentés. Toutes techniques bienvenues — acrylique, huile, aquarelle, encre de Chine.",
        frequency: "Hebdomadaire",
        emoji: "🎨",
      },
      {
        title: "Design graphique & branding",
        description: "Formation aux outils professionnels (Adobe Suite, Figma) pour créer des identités visuelles, des affiches et des contenus digitaux.",
        frequency: "Bi-mensuel",
        emoji: "💻",
      },
      {
        title: "Exposition semestrielle",
        description: "Grande exposition ouverte à toute l'université et au grand public. Les œuvres des membres sont présentées et certaines mises en vente.",
        frequency: "Semestriel",
        emoji: "🖼️",
      },
      {
        title: "Murale campus",
        description: "Projet collectif de décoration des murs du campus. Chaque promotion laisse une trace visuelle permanente sur les bâtiments de l'UPB.",
        frequency: "Annuel",
        emoji: "🧱",
      },
    ],
    projects: [
      {
        title: "Murales « Identités » — Bâtiment A",
        description: "Fresque de 40m² illustrant la diversité des cultures africaines, réalisée collectivement par 30 membres sur le mur principal du campus.",
        year: "2025",
        type: "invention",
        status: "Terminé",
        highlight: true,
      },
      {
        title: "Identité visuelle UPB Junior",
        description: "Refonte complète du branding de l'association UPB Junior Entreprise, incluant logo, charte graphique et templates de présentation.",
        year: "2024",
        type: "solution",
        status: "Terminé",
        highlight: true,
      },
      {
        title: "Exposition « Demain » — 1er Prix régional",
        description: "Participation et victoire au concours d'art universitaire régional avec une série de peintures sur le thème du futur de l'Afrique.",
        year: "2024",
        type: "event",
        status: "Terminé",
      },
      {
        title: "NFT Art Collection UPB",
        description: "Initiative expérimentale de tokenisation d'œuvres numériques pour sensibiliser à l'économie créative du Web3.",
        year: "2023",
        type: "invention",
        status: "Terminé",
      },
    ],
    coreTeam: [
      { name: "Fatoumata Diallo", role: "Présidente", filiere: "Communication Visuelle M1", avatar: "#c0392b" },
      { name: "Serge Aka", role: "Responsable Expositions", filiere: "Architecture L3", avatar: "#e74c3c" },
      { name: "Nadia Ouédraogo", role: "Directrice Artistique", filiere: "Design Graphique L2", avatar: "#9b2335" },
    ],
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "Behance", url: "#" },
    ],
    joinInfo: "Aucun prérequis artistique. Le seul critère est l'envie de créer. Venez avec ou sans expérience.",
    schedule: "Mercredis 16h — Salle Arts & Créativité, Bâtiment C",
    contactEmail: "club.art@upb.edu.ci",
  },
  {
    id: 3,
    slug: "sportif",
    name: "Club Sportif",
    tag: "Sports & Performance",
    tagline: "Dépasse tes limites. Chaque jour.",
    description:
      "Football, basketball, athlétisme, arts martiaux. Dépassement de soi, esprit d'équipe et compétitions inter-universitaires au programme.",
    longDescription:
      "Le Club Sportif de l'UPB est le plus grand club de l'université avec plus de 210 membres actifs. Doté d'infrastructures modernes — terrain de football homologué, salle de musculation, piste d'athlétisme — il est le moteur d'une culture du dépassement personnel. Nos équipes participent aux championnats inter-universitaires nationaux depuis 2018.",
    members: 210,
    eventsPerYear: 40,
    founded: "2015",
    iconName: "Dumbbell",
    color: "#27ae60",
    accent: "#2ecc71",
    bgDark: "#041a0d",
    image: "/assets/image/home/star/sortie.jpg",
    galleryImages: [
      "/assets/image/home/star/sortie.jpg",
      "/assets/image/home/collectif.jpg",
      "/assets/image/home/campus/2O4A7455.webp",
      "/assets/image/home/star/etudiant.jpg",
    ],
    tags: ["Football", "Basketball", "Athlétisme", "Arts Martiaux", "Fitness"],
    activities: [
      {
        title: "Entraînements football",
        description: "Sessions techniques et tactiques sur terrain homologué. Équipes masculines et féminines. Préparation aux inter-universités nationales.",
        frequency: "3× / semaine",
        emoji: "⚽",
      },
      {
        title: "Basketball & sports de salle",
        description: "Entraînements et matchs amicaux. La salle couverte accueille également le volleyball et le badminton.",
        frequency: "2× / semaine",
        emoji: "🏀",
      },
      {
        title: "Athlétisme & course à pied",
        description: "Programme de préparation physique générale avec coaching. Participation aux meetings régionaux.",
        frequency: "Hebdomadaire",
        emoji: "🏃",
      },
      {
        title: "Tournoi interne UPB",
        description: "Tournoi multi-disciplines entre départements. L'occasion de découvrir de nouveaux sports et de renforcer la cohésion entre filières.",
        frequency: "Semestriel",
        emoji: "🏆",
      },
    ],
    projects: [
      {
        title: "Équipe nationale étudiante — Football",
        description: "L'équipe de football de l'UPB a atteint les demi-finales du championnat national inter-universitaire 2024, une première pour l'école.",
        year: "2024",
        type: "event",
        status: "Terminé",
        highlight: true,
      },
      {
        title: "Programme Bien-être étudiant",
        description: "Initiative de sport-santé avec un médecin du sport partenaire. Bilans physiques gratuits, prévention des blessures, nutrition sportive.",
        year: "2025",
        type: "solution",
        status: "En cours",
        highlight: true,
      },
      {
        title: "Sport & Inclusion — Handicap",
        description: "Développement d'activités sportives adaptées pour les étudiants en situation de handicap. Premier programme du genre dans une université ivoirienne.",
        year: "2024",
        type: "invention",
        status: "En cours",
      },
    ],
    coreTeam: [
      { name: "Jean-Baptiste Koné", role: "Président", filiere: "STAPS L3", avatar: "#27ae60" },
      { name: "Awa Diabaté", role: "Capitaine Féminine", filiere: "Management L2", avatar: "#2ecc71" },
      { name: "Thierry Kouassi", role: "Coach Principal", filiere: "Génie Civil M2", avatar: "#1a8a45" },
    ],
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "Facebook", url: "#" },
    ],
    joinInfo: "Tests d'admission pour les équipes de compétition. Accès libre aux entraînements récréatifs sur simple inscription.",
    schedule: "Lundi, Mercredi, Vendredi — Terrain & Salle de sport, dès 17h",
    contactEmail: "club.sport@upb.edu.ci",
  },
  {
    id: 4,
    slug: "culturel",
    name: "Club Culturel",
    tag: "Culture & Diversité",
    tagline: "Nos racines, notre force. Nos différences, notre richesse.",
    description:
      "Célébration des cultures africaines et mondiales. Festivals, soirées thématiques, danses traditionnelles et échanges interculturels.",
    longDescription:
      "Le Club Culturel de l'UPB est le gardien de la mémoire et de la diversité. Dans un campus qui réunit des étudiants de plus de 12 nationalités, ce club tisse des ponts entre les cultures, célèbre les traditions et construit un sentiment d'appartenance commun. Ses événements sont parmi les plus attendus de l'année universitaire.",
    members: 150,
    eventsPerYear: 30,
    founded: "2016",
    iconName: "Globe",
    color: "#f6a623",
    accent: "#f39c12",
    bgDark: "#1a1000",
    image: "/assets/image/home/collectif.jpg",
    galleryImages: [
      "/assets/image/home/collectif.jpg",
      "/assets/image/home/star/sortie.jpg",
      "/assets/image/home/star/etudiant.jpg",
      "/assets/image/home/campus/2O4A7455.webp",
    ],
    tags: ["Festivals", "Danse", "Échanges", "Gastronomie", "Traditions"],
    activities: [
      {
        title: "Soirées culturelles thématiques",
        description: "Chaque mois, un pays ou une région à l'honneur. Tenues traditionnelles, plats typiques, musique et danses — une immersion totale.",
        frequency: "Mensuel",
        emoji: "🌍",
      },
      {
        title: "Atelier de danse traditionnelle",
        description: "Apprentissage des danses ivoiriennes, sénégalaises, congolaises et d'autres régions. Transmis par des membres passionnés.",
        frequency: "Hebdomadaire",
        emoji: "💃",
      },
      {
        title: "Festival des nations UPB",
        description: "Grand événement annuel ouvert au public réunissant toutes les cultures représentées sur le campus. Scène, gastronomie, artisanat.",
        frequency: "Annuel",
        emoji: "🎪",
      },
      {
        title: "Cercle de langues",
        description: "Cours informels de langues locales (dioula, bété, éwé) et internationales animés par les étudiants natifs.",
        frequency: "Bi-mensuel",
        emoji: "🗣️",
      },
    ],
    projects: [
      {
        title: "Festival des Nations 2025 — 1 200 visiteurs",
        description: "La 5ème édition du Festival des Nations a accueilli 1 200 personnes extérieures en plus des étudiants, devenant un événement culturel majeur de Bingerville.",
        year: "2025",
        type: "event",
        status: "Terminé",
        highlight: true,
      },
      {
        title: "Archives orales de Côte d'Ivoire",
        description: "Projet documentaire de collecte et préservation de contes, proverbes et récits traditionnels en collaboration avec des anciens du village.",
        year: "2024",
        type: "invention",
        status: "En cours",
        highlight: true,
      },
      {
        title: "Guide interculturel UPB",
        description: "Publication d'un guide pratique pour les étudiants internationaux arrivant à l'UPB, traduit en 4 langues.",
        year: "2023",
        type: "publication",
        status: "Terminé",
      },
    ],
    coreTeam: [
      { name: "Mariam Coulibaly", role: "Présidente", filiere: "Lettres & Langues M1", avatar: "#f6a623" },
      { name: "Blessing Osei", role: "Responsable Événements", filiere: "Relations Internationales L3", avatar: "#f39c12" },
      { name: "Kouamé Adou", role: "Responsable Danse", filiere: "Sociologie L2", avatar: "#d4890f" },
    ],
    socialLinks: [
      { platform: "Facebook", url: "#" },
      { platform: "TikTok", url: "#" },
    ],
    joinInfo: "Club ouvert à tous. Aucune connaissance culturelle préalable requise — juste la curiosité et l'ouverture d'esprit.",
    schedule: "Vendredis 17h — Amphithéâtre B",
    contactEmail: "club.culture@upb.edu.ci",
  },
  {
    id: 5,
    slug: "theatre",
    name: "Club Théâtre",
    tag: "Scène & Expression",
    tagline: "Monte sur scène. Deviens toi-même.",
    description:
      "Improvisation, mise en scène et spectacles. Le théâtre comme outil d'expression personnelle, de confiance en soi et de prise de parole.",
    longDescription:
      "Le Club Théâtre de l'UPB croit que monter sur scène transforme les êtres. Que ce soit pour surmonter la timidité, développer le leadership, ou simplement explorer d'autres vies le temps d'un soir — notre scène est un espace de liberté absolue. Nos productions mêlent textes classiques, créations contemporaines et théâtre-forum.",
    members: 60,
    eventsPerYear: 12,
    founded: "2018",
    iconName: "Drama",
    color: "#8e44ad",
    accent: "#9b59b6",
    bgDark: "#150a1f",
    image: "/assets/image/home/star/etudiant.jpg",
    galleryImages: [
      "/assets/image/home/star/etudiant.jpg",
      "/assets/image/home/star/sortie.jpg",
      "/assets/image/home/star/motivation.jpg",
      "/assets/image/home/collectif.jpg",
    ],
    tags: ["Improvisation", "Spectacles", "Mise en scène", "Théâtre-Forum"],
    activities: [
      {
        title: "Atelier d'improvisation",
        description: "Jeux théâtraux, exercices de confiance et d'écoute. La base absolue pour tout comédien et tout bon orateur.",
        frequency: "Hebdomadaire",
        emoji: "🎭",
      },
      {
        title: "Répétitions de spectacle",
        description: "Travail sur texte, mise en espace et jeu scénique pour la production du semestre. Ouvert à tous les niveaux.",
        frequency: "2× / semaine",
        emoji: "📜",
      },
      {
        title: "Théâtre-forum & engagement social",
        description: "Utilisation du théâtre comme outil de sensibilisation sur des problématiques sociales : harcèlement, genre, bien-être mental.",
        frequency: "Trimestriel",
        emoji: "📢",
      },
    ],
    projects: [
      {
        title: "«  Héritage » — Création originale 2025",
        description: "Pièce de théâtre originale en deux actes écrite et mise en scène par les membres, explorant la question de l'identité entre tradition et modernité.",
        year: "2025",
        type: "invention",
        status: "En cours",
        highlight: true,
      },
      {
        title: "Théâtre-Forum Anti-Harcèlement",
        description: "Série de représentations dans les lycées de Bingerville sur le thème du cyberharcèlement. Touché plus de 800 lycéens.",
        year: "2024",
        type: "solution",
        status: "Terminé",
        highlight: true,
      },
      {
        title: "Molière en Côte d'Ivoire",
        description: "Adaptation en français ivoirien du « Bourgeois Gentilhomme ». Sold-out en deux représentations.",
        year: "2023",
        type: "event",
        status: "Terminé",
      },
    ],
    coreTeam: [
      { name: "Yves-Marie Goba", role: "Président & Metteur en scène", filiere: "Lettres L3", avatar: "#8e44ad" },
      { name: "Sandra Amoikon", role: "Directrice du Jeu", filiere: "Communication L2", avatar: "#9b59b6" },
      { name: "Boris Tanoh", role: "Responsable Décors", filiere: "Architecture L1", avatar: "#6c3483" },
    ],
    socialLinks: [
      { platform: "YouTube", url: "#" },
      { platform: "Instagram", url: "#" },
    ],
    joinInfo: "Pas d'audition requise pour rejoindre. Chaque semestre, une audition ouverte pour les rôles principaux du prochain spectacle.",
    schedule: "Mardis & Jeudis 17h30 — Salle Polyvalente",
    contactEmail: "club.theatre@upb.edu.ci",
  },
  {
    id: 6,
    slug: "musique",
    name: "Club Musique",
    tag: "Sons & Rythmes",
    tagline: "La musique parle là où les mots échouent.",
    description:
      "Chorale, instruments, beatmaking et concerts. La musique comme langage universel qui unit les étudiants de toutes filières.",
    longDescription:
      "Du gospel à l'afrobeat, du classique au hip-hop ivoirien — le Club Musique de l'UPB est ouvert à tous les genres et à tous les niveaux. Que vous soyez chanteur confirmé, guitariste débutant ou beatmaker autodidacte, vous trouverez ici votre place dans une famille musicale chaleureuse et créative.",
    members: 90,
    eventsPerYear: 20,
    founded: "2016",
    iconName: "Music",
    color: "#1abc9c",
    accent: "#16a085",
    bgDark: "#021a15",
    image: "/assets/image/home/star/image.jpg",
    galleryImages: [
      "/assets/image/home/star/image.jpg",
      "/assets/image/home/collectif.jpg",
      "/assets/image/home/star/etudiant.jpg",
      "/assets/image/home/star/sortie.jpg",
    ],
    tags: ["Chorale", "Concerts", "Beatmaking", "Afrobeat", "Gospel"],
    activities: [
      {
        title: "Répétitions de la Chorale UPB",
        description: "Ensemble vocal mixte préparant des répertoires variés — gospel, a cappella, chants traditionnels, reprises afrobeat.",
        frequency: "2× / semaine",
        emoji: "🎵",
      },
      {
        title: "Studio beatmaking",
        description: "Accès au mini-studio du club pour composer, enregistrer et mixer. Initiation à FL Studio, Ableton et la production musicale.",
        frequency: "Sur rendez-vous",
        emoji: "🎛️",
      },
      {
        title: "Concert de fin de semestre",
        description: "Grande soirée musicale ouverte à tout le campus. Chaque membre peut se produire seul, en groupe ou avec la chorale.",
        frequency: "Semestriel",
        emoji: "🎤",
      },
    ],
    projects: [
      {
        title: "EP « Racines » — Album collaboratif",
        description: "Premier album collaboratif du club réunissant 12 titres composés et produits entièrement par les membres. Disponible sur les plateformes de streaming.",
        year: "2024",
        type: "invention",
        status: "Terminé",
        highlight: true,
      },
      {
        title: "Musique thérapie — Résidence ESUPS",
        description: "Programme de musicothérapie pour les étudiants en situation de stress chronique, en partenariat avec le service médical de l'université.",
        year: "2025",
        type: "solution",
        status: "En cours",
        highlight: true,
      },
      {
        title: "Hymne officiel de l'UPB",
        description: "Composition et enregistrement de l'hymne officiel de l'université, adopté lors de la cérémonie de remise des diplômes 2024.",
        year: "2024",
        type: "invention",
        status: "Terminé",
      },
    ],
    coreTeam: [
      { name: "Christelle Yao", role: "Présidente & Chef de chœur", filiere: "Musicologie M1", avatar: "#1abc9c" },
      { name: "Désiré Kouadio", role: "Directeur Artistique", filiere: "Communication L3", avatar: "#16a085" },
      { name: "Rachelle Brou", role: "Responsable Studio", filiere: "Génie Logiciel L2", avatar: "#0d7a63" },
    ],
    socialLinks: [
      { platform: "Spotify", url: "#" },
      { platform: "YouTube", url: "#" },
    ],
    joinInfo: "Audition informelle de 5 minutes pour évaluer votre niveau et vous orienter vers les activités les plus adaptées.",
    schedule: "Mercredis & Samedis 15h — Salle de musique, Bâtiment D",
    contactEmail: "club.musique@upb.edu.ci",
  },
  {
    id: 7,
    slug: "environnement",
    name: "Club Environnement",
    tag: "Écologie & Avenir",
    tagline: "Agir maintenant. Pour demain.",
    description:
      "Sensibilisation au développement durable, nettoyage du campus, jardinage urbain et projets éco-responsables pour un campus vert.",
    longDescription:
      "Face à l'urgence climatique, le Club Environnement de l'UPB est convaincu que les jeunes africains seront au premier rang de la solution. Nous agissons à notre échelle : un campus plus vert, une génération plus consciente, des projets concrets transférables à l'échelle nationale.",
    members: 75,
    eventsPerYear: 15,
    founded: "2019",
    iconName: "Leaf",
    color: "#16a085",
    accent: "#1abc9c",
    bgDark: "#021a10",
    image: "/assets/image/home/campus/campus1.jpg",
    galleryImages: [
      "/assets/image/home/campus/campus1.jpg",
      "/assets/image/home/collectif.jpg",
      "/assets/image/home/star/sortie.jpg",
      "/assets/image/home/campus/2O4A7455.webp",
    ],
    tags: ["Développement durable", "Campus vert", "Jardinage", "Énergie propre", "Sensibilisation"],
    activities: [
      {
        title: "Journées de nettoyage campus",
        description: "Opérations de collecte et de tri des déchets. Sensibilisation des autres étudiants aux bonnes pratiques de gestion des déchets.",
        frequency: "Mensuel",
        emoji: "🧹",
      },
      {
        title: "Jardin potager UPB",
        description: "Gestion d'un jardin potager collectif sur le campus. Production de légumes consommés à la cafétéria et expérimentation en agroécologie.",
        frequency: "Hebdomadaire",
        emoji: "🌱",
      },
      {
        title: "Conférences climat & développement",
        description: "Discussions et débats autour de la COP, des engagements africains et des solutions locales à la crise climatique.",
        frequency: "Trimestriel",
        emoji: "🌡️",
      },
    ],
    projects: [
      {
        title: "Campus Zéro Plastique",
        description: "Initiative visant l'élimination totale du plastique à usage unique sur le campus d'ici 2026. Remplacement par des alternatives biodégradables.",
        year: "2025",
        type: "solution",
        status: "En cours",
        highlight: true,
      },
      {
        title: "Panneaux solaires — Salle de lecture",
        description: "Installation de 6 panneaux solaires pour alimenter la salle de lecture en énergie propre. Projet 100% financé et réalisé par les membres du club.",
        year: "2024",
        type: "invention",
        status: "Terminé",
        highlight: true,
      },
      {
        title: "Forêt UPB — 500 arbres",
        description: "Plantation de 500 arbres endémiques en périphérie du campus en partenariat avec les communautés locales de Bingerville.",
        year: "2023",
        type: "event",
        status: "Terminé",
      },
    ],
    coreTeam: [
      { name: "Adjoua Niamkey", role: "Présidente", filiere: "Sciences de l'Environnement M1", avatar: "#16a085" },
      { name: "Franck Assi", role: "Responsable Projets", filiere: "Génie Civil L3", avatar: "#1abc9c" },
      { name: "Salimata Traoré", role: "Responsable Sensibilisation", filiere: "Droit L2", avatar: "#0e7a63" },
    ],
    socialLinks: [
      { platform: "LinkedIn", url: "#" },
      { platform: "Instagram", url: "#" },
    ],
    joinInfo: "Ouvert à tous sans restriction. Le club accueille aussi bien les éco-warriors aguerris que les débutants curieux.",
    schedule: "Samedis 8h30 — Point de rassemblement : Entrée principale du campus",
    contactEmail: "club.env@upb.edu.ci",
  },
  {
    id: 8,
    slug: "debat",
    name: "Club Débat & Éloquence",
    tag: "Rhétorique & Leadership",
    tagline: "La parole est une arme. Apprenez à vous en servir.",
    description:
      "Prises de parole, joutes oratoires et débats contradictoires. Former les leaders de demain à l'art de convaincre et d'argumenter.",
    longDescription:
      "Le Club Débat & Éloquence forme les futurs leaders, entrepreneurs et décideurs à l'art de la parole. Dans un monde où savoir convaincre est une compétence critique, nous entraînons nos membres à structurer leur pensée, gérer le stress de la prise de parole et défendre une position avec rigueur et charisme.",
    members: 65,
    eventsPerYear: 22,
    founded: "2018",
    iconName: "BookOpen",
    color: "#2980b9",
    accent: "#3498db",
    bgDark: "#050f1a",
    image: "/assets/image/home/star/images.jpg",
    galleryImages: [
      "/assets/image/home/star/images.jpg",
      "/assets/image/home/star/etudiant.jpg",
      "/assets/image/home/collectif.jpg",
      "/assets/image/home/star/motivation.jpg",
    ],
    tags: ["Débats", "Éloquence", "Leadership", "Argumentation", "Prise de parole"],
    activities: [
      {
        title: "Entraînement débat contradictoire",
        description: "Chaque session, deux équipes défendent des positions opposées sur un sujet tiré au sort. L'objectif : argumenter vite, bien et convaincre.",
        frequency: "Hebdomadaire",
        emoji: "⚖️",
      },
      {
        title: "Atelier prise de parole en public",
        description: "Exercices de respiration, de posture, de gestion du trac et de techniques oratoires. Suivi individuel par les membres expérimentés.",
        frequency: "Bi-mensuel",
        emoji: "🎙️",
      },
      {
        title: "Tournoi inter-universités",
        description: "Compétition de débat en français et en anglais regroupant les clubs de rhétorique des universités de la région.",
        frequency: "Annuel",
        emoji: "🏆",
      },
    ],
    projects: [
      {
        title: "Champion du Tournoi National 2024",
        description: "L'équipe de l'UPB a remporté le tournoi national inter-universitaires de débat organisé par l'Union Nationale des Étudiants.",
        year: "2024",
        type: "event",
        status: "Terminé",
        highlight: true,
      },
      {
        title: "Programme « Parole aux lycéens »",
        description: "Ateliers de prise de parole et de culture du débat animés dans 5 lycées de Bingerville et d'Abidjan pour démocratiser l'éloquence.",
        year: "2025",
        type: "solution",
        status: "En cours",
        highlight: true,
      },
      {
        title: "Guide du jeune orateur ivoirien",
        description: "Manuel pratique gratuit disponible en PDF, couvrant les techniques d'argumentation adaptées au contexte africain et francophone.",
        year: "2024",
        type: "publication",
        status: "Terminé",
      },
    ],
    coreTeam: [
      { name: "Aristide Konan", role: "Président", filiere: "Droit M1", avatar: "#2980b9" },
      { name: "Ghislaine Tano", role: "Vice-Présidente", filiere: "Sciences Po L3", avatar: "#3498db" },
      { name: "Ibrahim Doumbia", role: "Coach Débat", filiere: "Philosophie M2", avatar: "#1f6598" },
    ],
    socialLinks: [
      { platform: "LinkedIn", url: "#" },
      { platform: "YouTube", url: "#" },
    ],
    joinInfo: "Aucun niveau requis. Un entretien informel de 10 minutes pour évaluer vos objectifs et vous orienter dans le programme.",
    schedule: "Lundis 18h & Vendredis 16h — Salle de conférence A101",
    contactEmail: "club.debat@upb.edu.ci",
  },
  {
    id: 9,
    slug: "photo-video",
    name: "Club Photo & Vidéo",
    tag: "Image & Storytelling",
    tagline: "Chaque image raconte une histoire. Quelle est la tienne ?",
    description:
      "Photographie, vidéographie, montage et storytelling visuel. Capturer les moments forts de la vie universitaire à travers un objectif.",
    longDescription:
      "Le Club Photo & Vidéo de l'UPB est l'œil de l'université. Ses membres documentent la vie du campus, produisent des films courts, des reportages et du contenu pour les réseaux sociaux. Un tremplin idéal pour ceux qui veulent construire un portfolio professionnel tout en étudiant.",
    members: 55,
    eventsPerYear: 16,
    founded: "2019",
    iconName: "Camera",
    color: "#d35400",
    accent: "#e67e22",
    bgDark: "#1a0800",
    image: "/assets/image/home/campus/2O4A7455.webp",
    galleryImages: [
      "/assets/image/home/campus/2O4A7455.webp",
      "/assets/image/home/star/laboratoire.jpg",
      "/assets/image/home/collectif.jpg",
      "/assets/image/home/star/motivation.jpg",
    ],
    tags: ["Photo", "Vidéo", "Montage", "Drone", "Reportage"],
    activities: [
      {
        title: "Sorties photo hebdomadaires",
        description: "Explorations photographiques du campus, de Bingerville et d'Abidjan. Chaque sortie a un thème et un brief créatif.",
        frequency: "Hebdomadaire",
        emoji: "📸",
      },
      {
        title: "Atelier montage vidéo",
        description: "Formation à Premiere Pro, DaVinci Resolve et After Effects. De la prise de vue au rendu final en passant par le color grading.",
        frequency: "Bi-mensuel",
        emoji: "🎬",
      },
      {
        title: "Projection annuelle",
        description: "Festival interne de courts-métrages et de séries photographiques. Jury composé de professionnels et vote du public.",
        frequency: "Annuel",
        emoji: "🎞️",
      },
    ],
    projects: [
      {
        title: "Documentaire « Génération UPB »",
        description: "Film documentaire de 35 minutes sur la vie étudiante à l'UPB, ses succès, ses défis et ses espoirs. Projeté en avant-première lors de la remise des diplômes.",
        year: "2024",
        type: "invention",
        status: "Terminé",
        highlight: true,
      },
      {
        title: "Archives photographiques du campus",
        description: "Projet de documentation systématique du campus et de ses transformations depuis 2019. Plus de 12 000 photos archivées.",
        year: "2025",
        type: "solution",
        status: "En cours",
        highlight: true,
      },
      {
        title: "Campagne sociale « Regards de Bingerville »",
        description: "Série photographique documentant les habitants et artisans de Bingerville. Exposition itinérante dans 3 communes d'Abidjan.",
        year: "2024",
        type: "invention",
        status: "Terminé",
      },
    ],
    coreTeam: [
      { name: "Pierrot Gnaly", role: "Président & Directeur Photo", filiere: "Communication Visuelle M1", avatar: "#d35400" },
      { name: "Viviane Kra", role: "Directrice Vidéo", filiere: "Journalisme L3", avatar: "#e67e22" },
      { name: "Marius Ekra", role: "Responsable Drone", filiere: "Génie Électrique L2", avatar: "#a84300" },
    ],
    socialLinks: [
      { platform: "Instagram", url: "#" },
      { platform: "Vimeo", url: "#" },
    ],
    joinInfo: "Venez avec ou sans matériel. Le club dispose d'appareils photo et de caméras prêtables. Seule condition : la passion.",
    schedule: "Jeudis 17h & Samedis 9h — Studio photo, Bâtiment Médias",
    contactEmail: "club.photo@upb.edu.ci",
  },
];

export function getClubBySlug(slug: string): Club | undefined {
  return CLUBS.find((c) => c.slug === slug);
}

export function getClubById(id: number): Club | undefined {
  return CLUBS.find((c) => c.id === id);
}
