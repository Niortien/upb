export type TypeOffre = "stage" | "emploi" | "alternance";

export interface Offre {
  id: number;
  type: TypeOffre;
  titre: string;
  entreprise: string;
  secteur: string;
  lieu: string;
  duree?: string;
  remuneration?: string;
  formations: string[];
  description: string;
  missions: string[];
  profil: string[];
  datePublication: string;
  dateExpiration: string;
}

export interface Partenaire {
  nom: string;
  secteur: string;
  logo?: string;
}

export const OFFRES: Offre[] = [
  {
    id: 1,
    type: "emploi",
    titre: "Développeur Full Stack",
    entreprise: "TechCIV Solutions",
    secteur: "Technologies de l'Information",
    lieu: "Abidjan, Côte d'Ivoire",
    remuneration: "350 000 – 500 000 FCFA/mois",
    formations: ["MIAGE", "Master Génie Logiciel", "Master IA"],
    description:
      "TechCIV Solutions recherche un développeur Full Stack pour renforcer son équipe produit. Vous contribuerez au développement d'applications web et mobiles à fort impact.",
    missions: [
      "Développer des fonctionnalités front-end (React/Next.js)",
      "Concevoir et maintenir des API REST (Node.js / Python)",
      "Participer aux revues de code et aux sprints agile",
      "Assurer la qualité et les tests unitaires",
    ],
    profil: [
      "Bac+3 à Bac+5 en informatique (MIAGE, GL, IA)",
      "Maîtrise de React, TypeScript et Node.js",
      "Connaissance de bases de données relationnelles et NoSQL",
      "Esprit d'équipe et capacité d'adaptation",
    ],
    datePublication: "2026-05-15",
    dateExpiration: "2026-07-31",
  },
  {
    id: 2,
    type: "stage",
    titre: "Stage Analyste de Données",
    entreprise: "BICI Banque",
    secteur: "Banque & Finance",
    lieu: "Abidjan, Plateau",
    duree: "6 mois",
    remuneration: "120 000 FCFA/mois",
    formations: ["Master Data Science", "Master Actuariat", "Master Banque-Finance"],
    description:
      "Au sein de la direction des risques de BICI Banque, vous participerez à l'analyse des données clients et à la construction de modèles prédictifs pour la gestion du risque de crédit.",
    missions: [
      "Collecter, nettoyer et analyser des jeux de données financières",
      "Construire des tableaux de bord Power BI / Tableau",
      "Développer des modèles de scoring crédit (Python / R)",
      "Présenter des rapports aux équipes métiers",
    ],
    profil: [
      "Étudiant en Master Data Science, Actuariat ou Banque-Finance",
      "Maîtrise de Python ou R et des outils BI",
      "Rigueur analytique et goût pour les chiffres",
      "Bonne communication écrite et orale",
    ],
    datePublication: "2026-05-20",
    dateExpiration: "2026-06-30",
  },
  {
    id: 3,
    type: "alternance",
    titre: "Chargé de Marketing Digital",
    entreprise: "Orange Côte d'Ivoire",
    secteur: "Télécommunications",
    lieu: "Abidjan, Cocody",
    duree: "12 mois",
    remuneration: "200 000 FCFA/mois",
    formations: ["SEG", "Master Marketing & Communication"],
    description:
      "Orange CI propose une alternance dans son département Marketing Digital. Vous serez impliqué dans la conception et le pilotage de campagnes digitales pour les offres grand public.",
    missions: [
      "Gérer les campagnes sur les réseaux sociaux et Google Ads",
      "Analyser les performances KPI et rédiger des rapports hebdomadaires",
      "Contribuer à la stratégie de contenu (blogs, vidéos, newsletters)",
      "Travailler avec les équipes créatives et techniques",
    ],
    profil: [
      "Étudiant en SEG ou Master Marketing (bac+3 à bac+5)",
      "Maîtrise des outils Meta Ads, Google Analytics, Canva",
      "Créativité et sens du détail",
      "Disponible en alternance (2 jours école / 3 jours entreprise)",
    ],
    datePublication: "2026-06-01",
    dateExpiration: "2026-07-15",
  },
  {
    id: 4,
    type: "emploi",
    titre: "Ingénieur Réseaux & Systèmes",
    entreprise: "SODECI",
    secteur: "Services & Infrastructure",
    lieu: "Abidjan, Treichville",
    remuneration: "400 000 – 550 000 FCFA/mois",
    formations: ["ASSRI", "Master Génie Logiciel", "MIAGE"],
    description:
      "La SODECI recrute un Ingénieur Réseaux et Systèmes pour piloter la maintenance et l'évolution de son infrastructure IT dans le cadre de sa transformation digitale.",
    missions: [
      "Administrer les serveurs Linux/Windows et les équipements réseau (Cisco)",
      "Mettre en place et maintenir les solutions de sécurité informatique",
      "Participer aux projets de migration cloud",
      "Assurer la supervision et les astreintes du SI",
    ],
    profil: [
      "Bac+3 à Bac+5 en ASSRI, réseaux ou systèmes",
      "Expérience ou stage significatif en administration systèmes",
      "Certifications CCNA ou équivalent appréciées",
      "Autonomie et sens des responsabilités",
    ],
    datePublication: "2026-05-10",
    dateExpiration: "2026-08-31",
  },
  {
    id: 5,
    type: "stage",
    titre: "Stage Juriste d'Entreprise",
    entreprise: "Cabinet Loi & Partenaires",
    secteur: "Droit & Conseil",
    lieu: "Abidjan, Cocody",
    duree: "3 mois",
    remuneration: "80 000 FCFA/mois",
    formations: ["SJAP"],
    description:
      "Le Cabinet Loi & Partenaires offre un stage en droit des affaires pour accompagner ses clients dans leurs opérations juridiques et contractuelles.",
    missions: [
      "Rédiger et analyser des contrats commerciaux",
      "Effectuer des recherches jurisprudentielles",
      "Assister aux consultations et réunions clients",
      "Participer au suivi des contentieux",
    ],
    profil: [
      "Étudiant en SJAP (Licence ou Master)",
      "Solide culture juridique en droit des affaires",
      "Rigueur rédactionnelle et discrétion",
      "Maîtrise des outils bureautiques",
    ],
    datePublication: "2026-06-05",
    dateExpiration: "2026-07-20",
  },
  {
    id: 6,
    type: "emploi",
    titre: "Data Scientist – NLP",
    entreprise: "AI4Africa Hub",
    secteur: "Intelligence Artificielle",
    lieu: "Abidjan (Télétravail partiel)",
    remuneration: "450 000 – 650 000 FCFA/mois",
    formations: ["Master IA", "Master Data Science"],
    description:
      "AI4Africa Hub développe des solutions d'IA adaptées aux réalités africaines. Vous rejoindrez l'équipe R&D pour travailler sur des modèles de traitement du langage naturel en langues locales.",
    missions: [
      "Entraîner et fine-tuner des modèles de langage (LLM, BERT)",
      "Constituer et annoter des jeux de données en langues africaines",
      "Publier et présenter les résultats de recherche",
      "Collaborer avec des universités partenaires",
    ],
    profil: [
      "Master IA ou Data Science",
      "Maîtrise de Python (HuggingFace, PyTorch, scikit-learn)",
      "Intérêt pour les langues et la recherche appliquée",
      "Publications ou projets open-source appréciés",
    ],
    datePublication: "2026-05-25",
    dateExpiration: "2026-09-30",
  },
  {
    id: 7,
    type: "stage",
    titre: "Stage Assistant Comptable",
    entreprise: "Groupe CFAO",
    secteur: "Commerce & Distribution",
    lieu: "Abidjan, Zone 4",
    duree: "4 mois",
    remuneration: "100 000 FCFA/mois",
    formations: ["SEG", "Master Banque-Finance", "Master Actuariat"],
    description:
      "Au sein de la direction financière du Groupe CFAO, vous assisterez l'équipe comptable dans le suivi des opérations financières et la préparation des états financiers.",
    missions: [
      "Saisir et contrôler les écritures comptables",
      "Participer à la clôture mensuelle et annuelle des comptes",
      "Gérer les rapprochements bancaires",
      "Préparer des tableaux de bord financiers",
    ],
    profil: [
      "Étudiant en SEG, Banque-Finance ou Gestion",
      "Notions en comptabilité générale (SYSCOHADA)",
      "Maîtrise d'Excel et de logiciels comptables (SAGE apprécié)",
      "Sérieux, ponctualité et esprit d'équipe",
    ],
    datePublication: "2026-06-10",
    dateExpiration: "2026-07-31",
  },
  {
    id: 8,
    type: "emploi",
    titre: "Ingénieur Environnement & HSE",
    entreprise: "CIE – Compagnie Ivoirienne d'Électricité",
    secteur: "Énergie & Environnement",
    lieu: "Abidjan",
    remuneration: "380 000 – 500 000 FCFA/mois",
    formations: ["SEA", "3EA"],
    description:
      "La CIE recherche un Ingénieur HSE pour mettre en œuvre sa politique de sécurité et de gestion environnementale dans le cadre de ses projets d'infrastructure électrique.",
    missions: [
      "Réaliser des audits HSE sur les sites de production et de distribution",
      "Élaborer les plans de prévention et les procédures de sécurité",
      "Sensibiliser et former le personnel aux bonnes pratiques HSE",
      "Préparer les rapports environnementaux réglementaires",
    ],
    profil: [
      "Bac+3 à Bac+5 en SEA, 3EA ou génie de l'environnement",
      "Connaissance des normes ISO 14001 et OHSAS 18001",
      "Aptitude au travail de terrain et en équipe",
      "Permis B souhaité",
    ],
    datePublication: "2026-05-18",
    dateExpiration: "2026-08-15",
  },
  {
    id: 9,
    type: "alternance",
    titre: "Développeur Mobile (React Native)",
    entreprise: "Moov Africa CI",
    secteur: "Télécommunications & Fintech",
    lieu: "Abidjan, Marcory",
    duree: "12 mois",
    remuneration: "180 000 FCFA/mois",
    formations: ["MIAGE", "Master Génie Logiciel", "Master IA"],
    description:
      "Moov Africa CI accueille un alternant développeur mobile pour contribuer au développement de son application de mobile money, utilisée par des millions d'abonnés.",
    missions: [
      "Développer et maintenir l'application mobile (React Native)",
      "Intégrer les API de paiement mobile et de portefeuille électronique",
      "Rédiger des tests automatisés (Jest / Detox)",
      "Participer aux sprints agile avec les équipes produit",
    ],
    profil: [
      "Étudiant en informatique (MIAGE, GL) en alternance",
      "Bases en React Native ou Flutter",
      "Curiosité technique et envie d'apprendre vite",
      "Disponible 3 jours/semaine en entreprise",
    ],
    datePublication: "2026-06-02",
    dateExpiration: "2026-07-31",
  },
  {
    id: 10,
    type: "emploi",
    titre: "Chargé de Ressources Humaines",
    entreprise: "Ecobank Côte d'Ivoire",
    secteur: "Banque & Finance",
    lieu: "Abidjan, Plateau",
    remuneration: "320 000 – 420 000 FCFA/mois",
    formations: ["SEG", "SJAP"],
    description:
      "Ecobank CI recrute un Chargé RH pour accompagner le développement humain de ses équipes et participer à la mise en place de la politique RH groupe.",
    missions: [
      "Gérer le recrutement (sourcing, entretiens, onboarding)",
      "Suivre les plans de formation et de développement des compétences",
      "Administrer les dossiers du personnel et la paie",
      "Contribuer aux projets SIRH et à la gestion prévisionnelle des emplois",
    ],
    profil: [
      "Bac+3 à Bac+5 en SEG, RH ou droit social (SJAP)",
      "Maîtrise des outils RH et de la législation ivoirienne du travail",
      "Excellentes capacités relationnelles et sens de la confidentialité",
      "Expérience de 1 à 3 ans en RH appréciée",
    ],
    datePublication: "2026-05-28",
    dateExpiration: "2026-08-31",
  },
];

export const PARTENAIRES: Partenaire[] = [
  { nom: "TechCIV Solutions", secteur: "Technologie" },
  { nom: "BICI Banque", secteur: "Banque & Finance" },
  { nom: "Orange Côte d'Ivoire", secteur: "Télécommunications" },
  { nom: "SODECI", secteur: "Infrastructure" },
  { nom: "AI4Africa Hub", secteur: "Intelligence Artificielle" },
  { nom: "Groupe CFAO", secteur: "Commerce" },
  { nom: "CIE", secteur: "Énergie" },
  { nom: "Moov Africa CI", secteur: "Fintech" },
  { nom: "Ecobank CI", secteur: "Banque" },
  { nom: "Cabinet Loi & Partenaires", secteur: "Droit" },
];
