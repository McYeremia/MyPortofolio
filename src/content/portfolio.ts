// Static content source for the portfolio.
// Edit this file to update your copy, skills, projects, and contact links.

export interface SkillCategory {
  /** mono-style tag shown top-right, e.g. "~/frontend" */
  tag: string;
  title: string;
  items: string[];
}

export interface ProjectCard {
  /** mono-style label, e.g. "WEB · REACT" */
  tag: string;
  title: string;
  desc: string;
  /** placeholder text shown in the thumbnail area until you add an image */
  thumb: string;
  url: string;
}

export type ContactIcon = "mail" | "github" | "linkedin" | "x";

export interface ContactLink {
  label: string;
  url: string;
  icon: ContactIcon;
}

export const profile = {
  name: "Yeremia Christopher Wicaksana",
  nickname: "Jerry",
  initials: "YCW",
  /** highlighted phrase in the hero intro */
  focus: "fullstack development",
  /** rotating role labels cycled in the hero */
  roles: ["Fullstack Developer", "Web3 Explorer", "Problem Solver"],
  /** optional path to a hero photo placed in /public; null shows a placeholder */
  photo: null as string | null,
};

export const about = {
  intro: "Fullstack developer with a growing focus on Web3.",
  body: "I'm a fresh graduate and a fullstack developer focused on building things end to end, from clean interfaces to the APIs behind them. Right now I'm sharpening my fullstack craft while exploring Web3: smart contracts, wallets, and decentralized applications.",
  /** words in `body` rendered in the accent color */
  highlight: "Web3",
};

export const skills: SkillCategory[] = [
  {
    tag: "~/frontend",
    title: "Frontend",
    items: ["React / Next.js", "TypeScript", "Tailwind / CSS", "Framer Motion"],
  },
  {
    tag: "~/backend",
    title: "Backend",
    items: ["Node.js / Express", "PostgreSQL", "REST & GraphQL", "Prisma"],
  },
  {
    tag: "~/web3",
    title: "Web3",
    items: ["Solidity", "Ethers.js / Wagmi", "Smart Contracts", "Wallet Integration"],
  },
  {
    tag: "~/tools",
    title: "Tools",
    items: ["Git & GitHub", "Docker", "Figma", "Vercel"],
  },
];

export const projects: ProjectCard[] = [
  {
    tag: "WEB · REACT",
    title: "Project One",
    desc: "Short description of what this project does. Edit me.",
    thumb: "[ replace screenshot ]",
    url: "#",
  },
  {
    tag: "WEB3 · SOLIDITY",
    title: "Project Two",
    desc: "Short description of what this project does. Edit me.",
    thumb: "[ replace screenshot ]",
    url: "#",
  },
  {
    tag: "FULLSTACK",
    title: "Project Three",
    desc: "Short description of what this project does. Edit me.",
    thumb: "[ replace screenshot ]",
    url: "#",
  },
  {
    tag: "API · NODE",
    title: "Project Four",
    desc: "Short description of what this project does. Edit me.",
    thumb: "[ replace screenshot ]",
    url: "#",
  },
];

export const allProjectsUrl = "#";

export const contacts: ContactLink[] = [
  { label: "you@email.com", url: "mailto:yeremia.christopher@gmail.com", icon: "mail" },
  { label: "github.com/you", url: "https://github.com/McYeremia", icon: "github" },
  { label: "linkedin.com/in/you", url: "#", icon: "linkedin" },
  { label: "@you", url: "#", icon: "x" },
];
