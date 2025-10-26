'use client';
import { Project } from '@/generated/graphql';
import { Button } from '@heroui/button';
import NextLink from 'next/link';
import { FC } from 'react';
import { FaProjectDiagram } from 'react-icons/fa';
import { sectionWrapper, subtitle, title, titleWrapper } from '..';
import { Icon } from '../common/icon';
import { ProjectCard } from '../project/ProjectCard';

export interface Props {
  projects: Project[];
}

export const ProjectSection: FC<Props> = ({ projects }) => {
  return (
    <section
      className={sectionWrapper({
        class: 'z-20 mt-16 flex flex-col lg:mt-44',
      })}
      id='home-projects'
    >
      <div className={titleWrapper({ class: 'items-center text-center' })}>
        <div className='flex flex-col items-center md:inline-flex md:flex-row'>
          <h1 className={title({ size: 'lg' })}>Mis&nbsp;</h1>
          <h1 className={title({ size: 'lg', color: 'yellow' })}>proyectos&nbsp;</h1>
          <h1 className={title({ size: 'lg' })}>personales&nbsp;</h1>
          <FaProjectDiagram
            className='text-warning animate-heartbeat'
            size={50}
            style={{
              animationDuration: '2.5s',
            }}
          />
        </div>
      </div>
      <p
        className={subtitle({
          class: 'flex items-center justify-center md:w-full',
        })}
      >
        Aquí encontrarás los proyectos que he desarrollado y que he contribuido.
      </p>

      <br />
      <br />

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((item) => (
          <div key={item.id}>
            <ProjectCard project={item} />
          </div>
        ))}
      </div>
      <div>
        <Button
          variant='shadow'
          color='warning'
          href='/project'
          size='lg'
          endContent={<Icon name='right' />}
          aria-label='Ver más proyectos'
          as={NextLink}
        >
          Ver más
        </Button>
      </div>
    </section>
  );
};
