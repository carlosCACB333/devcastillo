'use client';

import { sectionWrapper, subtitle, title } from '@/components';
import { ReactNode } from 'react';
import { MdCheck, MdWorkHistory } from 'react-icons/md';

export const ExperienceSection = () => {
  return (
    <>
      <section
        className={sectionWrapper({
          class: 'z-20 mt-16 max-w-4xl lg:mt-44',
        })}
      >
        <div className='text-center md:text-start'>
          <h1 className={title({ size: 'lg' })}>Mi &nbsp;</h1>
          <h1 className={title({ color: 'pink', size: 'lg' })}>Experiencia</h1>
          <div className='flex flex-col items-center md:flex-row'>
            <h1 className={title({ size: 'lg' })}>profesional&nbsp;</h1>
            <MdWorkHistory
              className='animate-heartbeat text-pink-500'
              size={50}
              style={{
                animationDuration: '2.5s',
              }}
            />
          </div>
        </div>
        <p className={subtitle()}>
          Mi experiencia profesional en el desarrollo de software
          <span className='text-pink-500'> Full-Stack.</span>
        </p>

        <br />
        <br />

        <Wizard>
          <WizardItem>
            <h3 className={title({ size: 'xs' })}>
              <span className='text-pink-500'>Desarrollador FrontEnd</span>
              &nbsp;en TypeSubs
            </h3>

            <time className='text-foreground-500 mt-2 mb-8 block text-base leading-none italic'>
              Octubre 2024 - Actualidad
            </time>

            <ul className='text-foreground-500 ms-4 flex list-outside list-disc flex-col gap-2 marker:text-pink-500'>
              <li>Desarrollé interfaces modernas, accesibles, intuitivas, escalables y mantenibles.</li>
              <li>Implementé pagos mediante Mercado Pago e integré sistemas de autenticación seguros con Auth0.</li>
              <li>
                Optimizé la experiencia del usuario a través de streaming de datos, reduciendo los tiempos de carga.
              </li>
              <li>
                Implementé un sistema de chat en tiempo real utilizando WebSockets para mejorar la interacción del
                usuario.
              </li>
              <li>Apliqué diferentes estrategias de renderizado (SSR, SSG, ISR) para mejorar el rendimiento y SEO.</li>
              <li>Trabajé con Node.js, React.js, Next.js, Tailwind CSS, WebSockets, Zustand Redux y TypeScript.</li>
            </ul>
          </WizardItem>
          <WizardItem>
            <h3 className={title({ size: 'xs' })}>
              <span className='text-pink-500'>Desarrollador Backend </span>
              &nbsp;en Netdreams
            </h3>

            <time className='text-foreground-500 mt-2 mb-8 block text-base leading-none italic'>
              Enero 2021 - Diciembre 2024
            </time>

            <ul className='text-foreground-500 ms-4 flex list-outside list-disc flex-col gap-2 marker:text-pink-500'>
              <li>
                Desarrollé e implementé microservicios escalables para la billetera digital BIM, asegurando alta
                disponibilidad y mantenibilidad.
              </li>
              <li>
                Optimizé el rendimiento de consultas a bases de datos y endpoints de APIs, mejorando tiempos de
                respuesta y reduciendo la carga del sistema.
              </li>
              <li>
                Diseñé e implementé soluciones de interoperabilidad con otras billeteras digitales, facilitando
                integraciones seguras y eficientes.
              </li>
              <li>
                Desarrollé el nuevo core backend capaz de manejar peticiones concurrentes a gran escala, incluyendo una
                refactorización profunda del código legado.
              </li>
              <li>
                Utilicé tecnologías modernas como Python, FastAPI, PostgreSQL, MySQL, DynamoDB, AWS y Docker para
                construir soluciones robustas y orientadas a rendimiento.
              </li>
            </ul>
          </WizardItem>
        </Wizard>
      </section>
    </>
  );
};

const Wizard = ({ children }: { children: ReactNode }) => {
  return (
    <ol className='relative flex max-w-2xl list-inside flex-col gap-4 border-s border-gray-200 dark:border-gray-700'>
      {children}
    </ol>
  );
};

const WizardItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className='ms-8'>
      <span className='absolute -start-5 flex items-center justify-center rounded-full bg-pink-500 p-2 ring-8 ring-pink-200 dark:ring-pink-950'>
        <MdCheck className='text-background' size={20} />
      </span>
      {children}
    </li>
  );
};
