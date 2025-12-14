'use client';
import { sizes } from '@/assets';
import { Certification } from '@/generated/graphql';
import { Button } from '@heroui/button';
import { ArrowRightIcon } from '@heroui/shared-icons';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, EffectCreative, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { sectionWrapper, subtitle, title } from '..';
import { IMG } from '../common/IMG';
interface Props {
  certifications: Certification[];
}
export const CertificateSection = ({ certifications }: Props) => {
  return (
    <section
      className={sectionWrapper({
        isBlurred: true,
        class: 'border-divider mt-16 flex items-center justify-center border-t border-b px-8 lg:mt-44',
      })}
      id='home-certifications'
    >
      <div className='z-20 mx-8 grid w-full grid-cols-12 items-center gap-6 py-10 md:gap-0'>
        <div className='col-span-12 flex flex-col gap-2 md:col-span-5'>
          <div className='text-center lg:text-start'>
            <h1 className={title({ size: 'lg' })}>Mis &nbsp;</h1>
            <div className='flex flex-col items-center lg:flex-row'>
              <h1 className={title({ color: 'violet', size: 'lg' })}>certificaciones&nbsp;</h1>
              <AiFillSafetyCertificate
                className='text-secondary animate-heartbeat'
                size={50}
                style={{
                  animationDuration: '2.5s',
                }}
              />
            </div>
          </div>
          <p className={subtitle({ class: 'text-base md:w-full lg:text-lg' })}>
            Aquí encontrarás las certificaciones que he obtenido a lo largo de mi carrera profesional.
          </p>
          <div className='flex flex-row justify-start gap-3'>
            <Button
              variant='shadow'
              className='text-sm'
              color='secondary'
              endContent={
                <ArrowRightIcon
                  className='outline-hidden transition-transform group-data-[hover=true]:translate-x-0.5'
                  strokeWidth={2}
                  aria-label='Ver más certificaciones'
                />
              }
              aria-label='Ver más certificaciones'
              href='/certificate'
              size='lg'
            >
              Ver más
            </Button>
          </div>
        </div>
        <div className='col-span-12 md:col-span-7'>
          <Swiper
            slidesPerView={'auto'}
            effect='creative'
            spaceBetween={30}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Autoplay, EffectCreative]}
          >
            {certifications.map(({ id, picture, name }) => (
              <SwiperSlide key={id}>
                <div className='aspect-4/3'>
                  <IMG src={picture.url} alt={name} sizes={sizes.md} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
