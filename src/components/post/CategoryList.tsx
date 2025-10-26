'use client';
import { Category } from '@/generated/graphql';

import { Card, CardFooter } from '@heroui/card';
import Image from 'next/image';
import { FC } from 'react';
import { subtitle, title } from '..';

interface Props {
  categories: Category[];
}
export const CategoryList: FC<Props> = ({ categories }) => {
  return (
    <div className='my-40'>
      <div className='text-center'>
        <h1 className={title({ size: 'lg' })}>Categorías &nbsp;</h1>
        <h1 className={title({ color: 'green', size: 'lg' })}>más &nbsp;</h1>
        <h1 className={title({ size: 'lg' })}>publicadas </h1>
      </div>
      <br />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {categories.map((item) => (
          <Card key={item.id} isFooterBlurred className='relative h-[200px]'>
            <Image
              width={150}
              height={150}
              alt={item.name}
              className='h-full w-full object-cover'
              src={item.img!.url}
            />
            <CardFooter className='bg-primary-50/60 absolute bottom-0 z-10 gap-4'>
              <div className='flex grow items-center gap-2'>
                <div className='flex flex-col'>
                  <p className={subtitle({ class: 'text-foreground' })}>{item.name}</p>
                  <p className=''>{item.posts.length} Posts</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
