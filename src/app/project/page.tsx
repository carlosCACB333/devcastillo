import { searchProjects } from "@/action";
import { sizes } from "@/assets";
import { Pagination } from "@/components/common/Pagination";
import { Search } from "@/components/common/Searcher";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Project, Stage } from "@/generated/graphql";
import { PageProps } from "@/interfaces";
import { AiOutlineSearch } from "react-icons/ai";
const PAGE_SIZE = 4;

const ProjectPage = async ({ searchParams }: PageProps) => {
  const search = await searchParams;
  const page = parseInt(search.page || "1");
  const query = (search.query || "").trim();
  const skip = (page - 1) * PAGE_SIZE;
  const data = await searchProjects(query, PAGE_SIZE, skip, Stage.Published);
  const totalPages = Math.ceil(data.aggregate.count / PAGE_SIZE);

  return (
    <div className="container mx-auto mt-20 p-6">
      <div className="max-w-lg mx-auto ">
        <Search
          startContent={<AiOutlineSearch />}
          defaultValue={query}
          size="lg"
          placeholder="Buscar proyectos..."
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-8">
        {data?.edges.map(({ node }) => (
          <div key={node.id}>
            <ProjectCard project={node as Project} sizes={sizes.md} />
          </div>
        ))}
      </div>
      <br />

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        className="flex justify-end"
      />
    </div>
  );
};

export default ProjectPage;
