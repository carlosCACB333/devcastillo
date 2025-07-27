import { sizes } from "@/assets";
import { title } from "@/components";
import { IMG } from "@/components/common/IMG";
import { MDXContent } from "@/components/md/MDXContent";
import { Stage } from "@/generated/graphql";
import { PageProps } from "@/interfaces";
import { formatDate } from "@/utils";
import { GRAPH_SDK } from "@/utils/sdk";
import { Button } from "@heroui/button";
import { Metadata, ResolvedMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const BlogPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { post } = await GRAPH_SDK.postBySlug({
    slug: slug,
    stage: Stage.Published,
  });

  if (!post) return notFound();

  return (
    <>
      <section className="relative aspect-square md:aspect-video">
        <IMG src={post.banner.url} alt={post.title} sizes={sizes.lg} priority />
        <div className="absolute bottom-0 left-0 p-4 bg-linear-to-t from-background dark:from-dark to-transparent w-full h-full flex flex-col justify-end">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm">{formatDate(post.updatedAt)}</p>
            <h1 className={title()}>{post.title}</h1>
            <div className="rounded-lg italic my-4">{post.summary}</div>

            <Button
              color="primary"
              startContent={<FaArrowLeft />}
              href="/blog"
              as={Link}
              aria-label="Volver"
            >
              Volver
            </Button>
          </div>
        </div>
      </section>
      <section className="max-w-4xl mx-auto p-6 prose dark:prose-invert">
        <MDXContent>{post.content}</MDXContent>
      </section>
    </>
  );
};

export default BlogPage;

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
  const { post } = await GRAPH_SDK.postBySlug({
    slug: slug,
    stage: Stage.Published,
  });

  const postTitle = post?.title || "Contenido no encontrado";
  return {
    title: postTitle,
    description: post?.summary || "",
    keywords: post?.summary.split(" ") || [],
    openGraph: {
      type: "website",
      locale: "es_PE",
      siteName: "carloscb",
      title: postTitle,
      description: post?.summary || "",
      images: [
        {
          url: post?.banner.url || "/banner.png",
          width: post?.banner.height || 1540,
          height: post?.banner.width || 806,
          alt: postTitle,
        },
      ],
    },
  };
}
