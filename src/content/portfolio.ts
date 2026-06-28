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
  /** optional screenshot path in /public, e.g. "/projects/foo.png"; null shows the placeholder */
  image?: string | null;
  /** tech badges shown on the card */
  tech: string[];
  /** live demo URL (use "#" as a placeholder) */
  live?: string;
  /** source code URL (use "#" as a placeholder) */
  repo?: string;
  /** marks the project rendered large at the top of the section */
  featured?: boolean;
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
  /** optional path to the centered hero photo placed in /public; null shows a placeholder */
  photo: "/gugel.jpeg" as string | null,
  /** the two faint photos on the side glass panels [left, right] */
  heroSidePhotos: ["/sindoro.jpeg", "/lawu.jpeg"],
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
    items: ["React / Next.js", "TypeScript", "HTML", "CSS", "Tailwind"],
  },
  {
    tag: "~/backend",
    title: "Backend",
    items: ["Node.js / Express", "Python", "PHP", "MySQL", "REST APIs"],
  },
  {
    tag: "~/web3",
    title: "Web3",
    items: ["Solidity", "Ethers.js / Wagmi", "Smart Contracts", "Wallet Integration"],
  },
  {
    tag: "~/tools",
    title: "Tools",
    items: ["Git & GitHub", "Docker", "Figma", "Vercel", "Claude", "Antigravity"],
  },
];

export const projects: ProjectCard[] = [
  {
    tag: "WEB3 · STELLAR · HACKATHON",
    title: "SettleZK",
    desc: "Private settlement on Stellar: companies see only the net difference they owe each other, never each invoice. A zero-knowledge proof shows the math is honest without ever revealing who owes whom.",
    thumb: "[ replace screenshot ]",
    image: "/projects/settlezk.png",
    tech: ["Next.js", "Stellar / Soroban", "Circom", "Groth16 ZK"],
    live: "https://settlezk.vercel.app",
    repo: "https://github.com/McYeremia/settlezk",
    featured: true,
  },
  {
    tag: "WEB3 · TEE · HACKATHON",
    title: "TrustDrop",
    desc: "Aid that can't be skimmed, faked, or leaked. Eligibility is verified by AI while identity stays sealed inside a secure enclave, and every disbursement is permanently audited on-chain.",
    thumb: "[ replace screenshot ]",
    image: "/projects/trustdrop.png",
    tech: ["Next.js", "Rust / WASM", "TEE Enclave", "Groq AI"],
    live: "https://trustdrop26.vercel.app",
    repo: "https://github.com/McYeremia/TrustDrop",
  },
  {
    tag: "WEB3 · SUI · HACKATHON",
    title: "Verified Agent Records",
    desc: "Verified Agent Records: a tamper-proof ledger for AI agent activity. Every action an agent takes is recorded and cryptographically verifiable, so you can audit what an autonomous agent actually did, not just what it claims.",
    thumb: "[ replace screenshot ]",
    image: "/projects/varwc.png",
    tech: ["Next.js", "Sui", "Walrus Memory", "Groq AI"],
    live: "https://varwc2026.vercel.app",
    repo: "https://github.com/McYeremia/verifiedagentrecords",
  },
  {
    tag: "FULLSTACK · AI · FINTECH",
    title: "IDXAnalyst",
    desc: "AI-powered Indonesian stock trading terminal that pits your manual strategy against Gemini and Claude AI in a portfolio battleground. Features 10 back-tested quant algorithms, techno-fundamental intelligence, and MCP integration for autonomous AI trading.",
    thumb: "[ replace screenshot ]",
    image: "/projects/idxanalyst.png",
    tech: ["Next.js", "FastAPI", "Tailwind", "Gemini / Claude AI"],
    repo: "https://github.com/McYeremia/IDXAnalyst",
  },
];

export const allProjectsUrl = "/projects";

export const contacts: ContactLink[] = [
  {
    label: "yeremia10.work@gmail.com",
    url: "mailto:yeremia10.work@gmail.com",
    icon: "mail",
  },
  {
    label: "github.com/McYeremia",
    url: "https://github.com/McYeremia",
    icon: "github",
  },
  {
    label: "linkedin.com/in/yeremia-wicaksana",
    url: "https://www.linkedin.com/in/yeremia-wicaksana-67b474331",
    icon: "linkedin",
  },
  {
    label: "@JerryTheMaus10",
    url: "https://x.com/JerryTheMaus10",
    icon: "x",
  },
];
