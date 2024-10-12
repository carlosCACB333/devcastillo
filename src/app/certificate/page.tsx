import { searchCertification } from "@/action";
import { sizes } from "@/assets";
import { IMG } from "@/components/common/IMG";
import { Pagination } from "@/components/common/Pagination";
import { Search } from "@/components/common/Searcher";
import { Stage } from "@/generated/graphql";
import { PageProps } from "@/interfaces";
const PAGE_SIZE = 12;
const Certification = async ({ searchParams }: PageProps) => {
  const page = parseInt(searchParams.page || "1");
  const query = (searchParams.query || "").trim();
  const skip = (page - 1) * PAGE_SIZE;
  const data = await searchCertification(
    query,
    PAGE_SIZE,
    skip,
    Stage.Published
  );
  const totalPages = Math.ceil(data.aggregate.count / PAGE_SIZE);
  return (
    <>
      <div className="container mx-auto mt-20 p-6">
        <div className="max-w-lg mx-auto mb-8 ">
          <Search
            defaultValue={query}
            size="lg"
            placeholder="Buscar certificados"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
          {data?.edges?.map(({ node }) => (
            <div key={node.id} className="relative w-full aspect-[4/3]">
              <IMG
                src={node.picture.url}
                alt={node.name}
                fill
                className="rounded-xl"
                sizes={sizes.sm}
              />
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
    </>
  );
};

export default Certification;
