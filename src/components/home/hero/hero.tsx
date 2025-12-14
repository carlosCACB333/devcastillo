'use client';

import { subtitle, title } from '@/components';
import { Feature, FeaturesGrid } from '@/components/common/features-grid';
import { useAuthor } from '@/hooks';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { AiOutlineHeart, AiOutlinePaperClip } from 'react-icons/ai';
import { FloatingComponents } from './floating-components';

const BgLooper = dynamic(() => import('./bg-looper').then((mod) => mod.BgLooper), {
  ssr: false,
});

interface Props {
  features: Feature[];
}

export const Hero: FC<Props> = ({ features }) => {
  const { author } = useAuthor();

  // const [firstWord = '', secondWord = '', thirdWord = '', fourthWord = '', fifthWord = ''] =
  //   author.profession!.split(' ');
  return (
    <>
      <section className='relative flex min-h-[calc(100vh-4rem)] w-full flex-col justify-evenly gap-4'>
        <div className='flex h-full w-full flex-nowrap items-center justify-between'>
          <div className='relative z-20 flex w-full flex-col gap-6 md:w-1/2 xl:mt-10'>
            <div className={subtitle({ fullWidth: true })}>👋 ¡Hola! soy </div>
            <h1 className={title({ size: 'lg' })}>
              {author.firstName} {author.lastName.split(' ').at(0)}
            </h1>
            <h2 className={subtitle({ fullWidth: true })}>{author.detail}</h2>
            <div className='flex flex-col items-center gap-4 md:flex-row'>
              <Button
                variant='shadow'
                className='w-full md:w-auto'
                color='primary'
                aria-label='boton sobre mí'
                endContent={
                  <AiOutlineHeart
                    className='outline-hidden transition-transform group-data-[hover=true]:translate-x-0.5'
                    strokeWidth={2}
                  />
                }
                href='#home-about-me'
                size='lg'
              >
                Sobre mí
              </Button>

              <Button
                fullWidth
                isExternal
                as={Link}
                className='w-full md:w-auto'
                href={author.cv?.url}
                size='lg'
                aria-label='boton descargar cv'
                startContent={
                  <AiOutlinePaperClip
                    className='outline-hidden transition-transform group-data-[hover=true]:translate-x-0.5'
                    strokeWidth={2}
                  />
                }
                variant='bordered'
              >
                Descargar CV
              </Button>
            </div>
          </div>
          <FloatingComponents />
        </div>
        <BgLooper />
        <FeaturesGrid features={features} />
      </section>
    </>
  );
};
