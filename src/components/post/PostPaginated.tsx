"use client";
import { searchPosts } from "@/action";

import { Post, Stage } from "@/generated/graphql";
import { useDebounce } from "@/hooks";
import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "../common/icon";
import { PostCard } from "./PostCard";

const PAGE_SIZE = 6;

const fetchPost = async (query: string, category: string, page: number) => {
  const data = await searchPosts(
    query,
    PAGE_SIZE,
    (page - 1) * PAGE_SIZE,
    Stage.Published,
    category
  );
  const posts = data.edges.map(({ node }) => node);
  const page_size = Math.ceil(data.aggregate.count / PAGE_SIZE);
  return { posts, page_size };
};

export const PostPaginated = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [input, setInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  const query = useDebounce(input);

  const onSearch = (query: string, category: string, page = 1) => {
    setLoading(true);
    fetchPost(query, category, page)
      .then(({ posts, page_size }) => {
        setPosts(posts);
        setTotalPages(page_size);
        setPage(page);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    onSearch(query, category);
  }, [query, category]);

  return (
    <div>
      <div className="max-w-lg mx-auto ">
        <Input
          startContent={<Icon name="search" />}
          aria-label="Buscar"
          placeholder="Buscar publicaciones"
          size="lg"
          isDisabled={loading}
          value={input}
          onValueChange={setInput}
        />
      </div>
      <br />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <br />
      <Pagination
        key={category + query + page}
        showControls
        showShadow
        className="flex justify-end"
        total={totalPages}
        page={page}
        onChange={(page) => onSearch(query, category, page)}
        isDisabled={loading || totalPages < 1}
      />
    </div>
  );
};
