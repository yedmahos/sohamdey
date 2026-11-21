export const PERSON = {
  fullName: "Soham Dey",
  brand: "Soham Dey",
  role: "Product Designer",
  company: "Loom Corporate",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "My Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

export const CONTACT_URL = "https://wa.me/919475565982";

export const EMAIL = "contact@sohamdey.me";

export const RESUME_URL = "https://drive.google.com/file/d/11anu0Yz9Cm-w0WeUE0I-u_nqJqrpC4jA/view";

export const HERO_IMAGE = {
  url: "/images/soham-portrait.webp",
  alt: "Soham Dey wearing glasses and a blazer",
  width: 1320,
  height: 1000,
} as const;

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  technologies: readonly string[];
  githubUrl: string;
  liveUrl: string;
  thumbnail: string;
  thumbnailAlt: string;
};

export const PROJECTS: Project[] = [
  {
    id: "trinetraa",
    name: "TRINETRAA",
    category: "AI / FINTECH",
    description: "A predictive anti-money-laundering framework with graph-native mule-chain detection, inductive GraphSAGE risk scoring, and a live 3D surveillance lab.",
    technologies: ["TypeScript", "React", "Python"],
    githubUrl: "https://github.com/SIH-2026-RRAKSS",
    liveUrl: "https://trinetraaa.vercel.app/",
    thumbnail: "/images/work-trinetraa.jpg",
    thumbnailAlt: "Trinetraa website showing its predictive anti-money-laundering headline and globe surveillance visual",
  },
  {
    id: "dharitri",
    name: "DHARITRI",
    category: "AGRI / HEALTH",
    description: "A complete cow healthcare platform empowering farmers with cattle tracking, vet access, products, and donations.",
    technologies: ["TypeScript", "React", "Vite"],
    githubUrl: "https://github.com/yedmahos/dharitri",
    liveUrl: "https://projectdhaaritri.vercel.app/",
    thumbnail: "/images/work-dharitri.jpg",
    thumbnailAlt: "Dharitri website showing its complete cow healthcare solution headline over a cattle photograph",
  },
  {
    id: "cluster-lens",
    name: "CLUSTER LENS",
    category: "ML / VISION",
    description: "An image segmentation tool using K-Means clustering to separate and visualize regions of an image.",
    technologies: ["Python", "HTML"],
    githubUrl: "https://github.com/yedmahos/cluster-lens",
    liveUrl: "https://github.com/yedmahos/cluster-lens",
    thumbnail: "/images/work-cluster-lens.jpg",
    thumbnailAlt: "Cluster Lens GitHub repository for image segmentation using K-Means clustering",
  },
];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/yedmahos", icon: "github" },
  { label: "Instagram", href: "https://www.instagram.com/yedmahos/", icon: "instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yedmahos/", icon: "linkedin" },
] as const;
