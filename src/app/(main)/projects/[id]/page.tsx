import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectDetail from "./ProjectDetail";

export const revalidate = 0;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = parseInt(id);
  if (isNaN(projectId)) notFound();

  const [project, sections, gallery] = await Promise.all([
    prisma.project.findUnique({ where: { id: projectId } }).catch(() => null),
    prisma.projectSection
      .findMany({ where: { projectId }, orderBy: { order: "asc" } })
      .catch(() => []),
    prisma.projectImage
      .findMany({ where: { projectId }, orderBy: { order: "asc" } })
      .catch(() => []),
  ]);

  if (!project) notFound();

  return (
    <ProjectDetail project={project} sections={sections} gallery={gallery} />
  );
}
