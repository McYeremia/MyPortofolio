import { notFound } from "next/navigation";
import { getProject } from "@/content/portfolio";
import ProjectDetail from "./ProjectDetail";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = parseInt(id);
  if (isNaN(projectId)) notFound();

  const project = getProject(projectId);
  if (!project) notFound();

  return (
    <ProjectDetail
      project={project}
      sections={project.sections}
      gallery={project.gallery}
    />
  );
}
