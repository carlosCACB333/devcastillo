'use client';
import { Post } from '@/generated/graphql';
import { FC } from 'react';
import { PostCard } from './PostCard';
interface Props {
  posts: Post[];
}
export const PostList: FC<Props> = ({ posts }) => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {posts.map((item, idx) => (
        <PostCard key={item.id} post={item} idx={idx} />
      ))}
    </div>
  );
};
