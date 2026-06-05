import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      bio: "Deeply immersed in software development since 2018. I build scalable, maintainable systems with a focus on clean architecture and engineering discipline — blending technical precision with thoughtful design.",
      skills: ["Next.js", "TypeScript", "React", "Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
      stats: [
        { value: "50+", label: "Deployments" },
        { value: "10+", label: "Regions" },
        { value: "99.9%", label: "Uptime" },
      ],
    },
  });

  const projects = [
    { title: "Neural Network Viz", category: "Data Visualization", year: "2024", description: "Real-time visualization of neural network layers and weight distributions.", githubUrl: "#", liveUrl: "#", order: 1 },
    { title: "Quantum Ledger", category: "Fintech / Web3", year: "2024", description: "Decentralized finance dashboard with quantum-resistant encryption patterns.", githubUrl: "#", liveUrl: "#", order: 2 },
    { title: "Cyber-Security OS", category: "Security Tool", year: "2023", description: "Web-based terminal interface for monitoring network security and vulnerabilities.", githubUrl: "#", liveUrl: "#", order: 3 },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.order },
      update: {},
      create: project,
    });
  }

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
