import { CategoryList, PostList, PostPaginated } from '@/components/post';
import { Category, Post, Stage } from '@/generated/graphql';
import { GRAPH_SDK } from '@/utils/sdk';

const BlogsHome = async () => {
  const { firstPosts, categories } = await GRAPH_SDK.blogsPage({
    stage: Stage.Published,
  });

  const sortedCategories = [...categories].sort((a, b) => b.posts.length - a.posts.length).slice(0, 4);

  return (
    <main className='p-6'>
      <PostList posts={firstPosts as Post[]} />
      <CategoryList categories={sortedCategories as Category[]} />
      <PostPaginated />
    </main>
  );
};

export default BlogsHome;

export const revalidate = 36000; // 1 hour
