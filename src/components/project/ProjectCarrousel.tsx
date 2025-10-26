'use client';
import { sizes } from '@/assets';
import { Project } from '@/generated/graphql';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import 'swiper/css';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Icon } from '../common/icon';
import { IMG } from '../common/IMG';

interface Props {
  project: Project;
}
export const ProjectCarrousel: FC<Props> = ({ project }) => {
  const router = useRouter();

  return (
    <div className='relative'>
      <Swiper
        slidesPerView={1}
        effect='creative'
        autoplay={{
          delay: 2500,
        }}
        modules={[Autoplay, EffectCreative]}
        centeredSlides={true}
        loop={true}
      >
        {project.pictures.map(({ id, url }, idx) => (
          <SwiperSlide key={id}>
            <div className={clsx('relative flex aspect-square flex-col items-center justify-center md:aspect-video')}>
              <IMG src={url} alt={project.title} fill sizes={sizes.xl} priority={idx === 0} />
              <div
                className={clsx(
                  'absolute bottom-0 h-1/2 w-full',
                  'from-background dark:from-dark bg-linear-to-t to-transparent'
                )}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='relative z-10 -mt-60 flex h-full w-full flex-col justify-end p-4'>
        <div className='mx-auto max-w-4xl p-4'>
          <h1 className='mb-4 text-2xl font-bold'>{project.title}</h1>
          <div className='my-4 rounded-lg italic'>{project.abstract}</div>
          <div className='flex flex-col gap-1 md:flex-row'>
            <Button
              color='primary'
              startContent={<FaArrowLeft />}
              onClick={() => {
                router.back();
              }}
              aria-label='Volver'
            >
              Volver
            </Button>
            {project.gitHub && (
              <Button
                color='primary'
                variant='ghost'
                as={Link}
                href={project.gitHub}
                isExternal
                aria-label='Ver en GitHub'
                startContent={
                  <Icon
                    name='git'
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                }
              >
                Ver en GitHub
              </Button>
            )}
            {project.webSide && (
              <Button
                color='primary'
                variant='ghost'
                as={Link}
                href={project.webSide}
                isExternal
                aria-label='Ver en la web'
                startContent={
                  <Icon
                    name='world'
                    style={{
                      height: 20,
                      width: 20,
                    }}
                  />
                }
              >
                Ver en la web
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
