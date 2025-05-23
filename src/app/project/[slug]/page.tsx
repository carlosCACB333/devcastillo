import { MDXContent } from "@/components/md/MDXContent";
import { ProjectCarrousel } from "@/components/project/ProjectCarrousel";
import { Project, Stage } from "@/generated/graphql";
import { PageProps } from "@/interfaces";
import { GRAPH_SDK } from "@/utils/sdk";
import { Metadata, ResolvedMetadata } from "next";
import { notFound } from "next/navigation";

const ProjectPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { project } = await GRAPH_SDK.projectBySlug({
    slug: slug,
    stage: Stage.Published,
  });

  if (!project) {
    notFound();
  }

  return (
    <>
      <div className="relative -mt-16">
        <ProjectCarrousel project={project as Project} />
      </div>
      <main className="max-w-4xl mx-auto p-6 prose dark:prose-invert">
        <MDXContent>{project?.detail}</MDXContent>
      </main>
    </>
  );
};

export default ProjectPage;

export async function generateStaticParams() {
  // not  generating static params for this page (Error: Too Many Requests in build time). Create page in first visit
  return [];
}

export const revalidate = 36000; // 1 hour
export const dynamicParams = true;

export async function generateMetadata(
  { params }: PageProps,
  parent: Promise<ResolvedMetadata>
): Promise<Metadata> {
  const { slug } = await params;
  const { project } = await GRAPH_SDK.projectBySlug({
    slug: slug,
    stage: Stage.Published,
  });
  const projectTitle = project?.title || "Contenido no encontrado";
  return {
    title: project?.title || "Proyecto",
    description: project?.abstract || "",
    keywords: project?.abstract.split(" ") || [],
    openGraph: {
      type: "website",
      locale: "es_PE",
      siteName: "carloscb",
      title: projectTitle,
      description: project?.abstract || "",
      images: [
        {
          url: project?.pictures[0].url || "/banner.png",
          width: project?.pictures[0].height || 1540,
          height: project?.pictures[0].width || 806,
          alt: projectTitle,
        },
      ],
    },
  };
}
