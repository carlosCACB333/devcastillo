'use client';
import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import { FC } from 'react';

export interface ImgProps extends ImageProps {
  alt: string;
}

export const IMG: FC<ImgProps> = ({ alt, className, ...props }) => {
  return (
    <div className='relative h-full w-full'>
      <Image className={clsx('object-cover object-top', className)} alt={alt} fill {...props} />
    </div>
  );
};
