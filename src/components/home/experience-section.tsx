'use client';

import { sectionWrapper, subtitle, title } from '@/components';
import { ReactNode } from 'react';
import { MdCheck, MdWorkHistory } from 'react-icons/md';

export const ExperienceSection = () => {
  return (
    <>
      <section
        className={sectionWrapper({
          class: 'z-20 mt-16 max-w-5xl lg:mt-44',
        })}
      >
        <div className='text-center md:text-start mb-12'>
          <div className='flex flex-col items-center md:items-start gap-2 mb-4'>
            <div className='flex flex-wrap items-center justify-center md:justify-start gap-2'>
              <h1 className={title({ size: 'lg' })}>Mi</h1>
              <h1 className={title({ color: 'pink', size: 'lg' })}>Experiencia</h1>
              <h1 className={title({ size: 'lg' })}>profesional</h1>
              <MdWorkHistory
                className='animate-heartbeat text-pink-500'
                size={50}
                style={{
                  animationDuration: '2.5s',
                }}
              />
            </div>
          </div>
          <p className={subtitle({ class: 'max-w-2xl' })}>
            Mi trayectoria profesional en el desarrollo de software
            <span className='text-pink-500'> Full-Stack</span>, trabajando con tecnologías modernas
            y equipos multidisciplinarios.
          </p>
        </div>

        <Wizard>
          <WizardItem>
            <div className='group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-pink-300 dark:hover:border-pink-700'>
              <div className='absolute inset-0 bg-linear-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              
              <div className='relative'>
                <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6'>
                  <h3 className={title({ size: 'xs', class: 'flex-1' })}>
                    <span className='text-pink-500'>Desarrollador Frontend</span>
                    <span className=''> • </span>
                    <span className=''>Gestfy</span>
                  </h3>
                  <span className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium border border-green-500/20'>
                    <span className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                    Actualidad
                  </span>
                </div>

                <time className='text-foreground-500 mb-6 block text-sm font-medium'>
                  Noviembre 2025 - Actualidad
                </time>

                <ul className='text-foreground-600 dark:text-foreground-400 flex flex-col gap-3 text-sm md:text-base leading-relaxed'>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Desarrollé interfaces frontend con React y React Router para navegación fluida entre módulos de la plataforma.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Implementé dashboards interactivos con gráficas y tablas para monitoreo de métricas operativas y comerciales del ISP.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Integré calendarios para gestión de eventos, instalaciones y programación de tareas.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Consumí APIs REST mediante queries para obtener y actualizar información en tiempo real.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Gestioné el estado de la aplicación con Zustand y Redux para una experiencia de usuario fluida y consistente.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Utilicé Bootstrap para crear interfaces responsivas adaptadas a múltiples dispositivos.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Implementé mapas para visualización geográfica de clientes, zonas de cobertura y operaciones.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Optimicé componentes reutilizables mejorando mantenibilidad, rendimiento y escalabilidad del frontend.</span>
                  </li>
                </ul>
              </div>
            </div>
          </WizardItem>

          <WizardItem>
            <div className='group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-pink-300 dark:hover:border-pink-700'>
              <div className='absolute inset-0 bg-linear-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              
              <div className='relative'>
                <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6'>
                  <h3 className={title({ size: 'xs', class: 'flex-1' })}>
                    <span className='text-pink-500'>Desarrollador Full-Stack</span>
                    <span className=''> • </span>
                    <span className=''>TypeSubs</span>
                  </h3>
                  <span className='inline-flex items-center px-4 py-2 rounded-full bg-gray-500/10 text-gray-600 dark:text-gray-400 text-sm font-medium border border-gray-500/20'>
                    1 año
                  </span>
                </div>

                <time className='text-foreground-500 mb-6 block text-sm font-medium'>
                  Octubre 2024 - Octubre 2025
                </time>

                <ul className='text-foreground-600 dark:text-foreground-400 flex flex-col gap-3 text-sm md:text-base leading-relaxed'>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Desarrollé interfaces modernas, accesibles, intuitivas, escalables y mantenibles.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Implementé pagos mediante Mercado Pago e integré sistemas de autenticación seguros con Auth0.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Optimicé la experiencia del usuario mediante streaming de datos, reduciendo tiempos de carga.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Apliqué estrategias de renderizado (SSR, SSG, ISR) para mejorar rendimiento y SEO.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Diseñé y desarrollé la arquitectura del sistema utilizando Next.js y React.js.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Implementé microservicios escalables usando Node.js y Nest.js.</span>
                  </li>
                </ul>
              </div>
            </div>
          </WizardItem>

          <WizardItem>
            <div className='group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-pink-300 dark:hover:border-pink-700'>
              <div className='absolute inset-0 bg-linear-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              
              <div className='relative'>
                <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6'>
                  <h3 className={title({ size: 'xs', class: 'flex-1' })}>
                    <span className='text-pink-500'>Desarrollador Backend</span>
                    <span className=''> • </span>
                    <span className=''>Regob EIRL (Cliente BIM)</span>
                  </h3>
                  <span className='inline-flex items-center px-4 py-2 rounded-full bg-gray-500/10 text-gray-600 dark:text-gray-400 text-sm font-medium border border-gray-500/20'>
                    2 años
                  </span>
                </div>

                <time className='text-foreground-500 mb-6 block text-sm font-medium'>
                  Enero 2023 - Diciembre 2024
                </time>

                <ul className='text-foreground-600 dark:text-foreground-400 flex flex-col gap-3 text-sm md:text-base leading-relaxed'>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Desarrollé e implementé microservicios escalables para la billetera digital BIM, asegurando alta disponibilidad y mantenibilidad.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Optimicé el rendimiento de consultas a bases de datos y endpoints de APIs, mejorando tiempos de respuesta y reduciendo carga del sistema.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Colaboré en la implementación de interoperabilidad con otras billeteras digitales, facilitando integraciones seguras y eficientes.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Colaboré en el desarrollo del nuevo core backend capaz de manejar peticiones concurrentes a gran escala.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Participé en la migración de la deuda técnica del sistema, usando arquitectura hexagonal y principios de arquitectura limpia.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Implementé pruebas automatizadas para garantizar la calidad y estabilidad del software.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Construí soluciones robustas orientadas a rendimiento con tecnologías modernas.</span>
                  </li>
                  <li className='flex gap-3 group/item'>
                    <span className='text-pink-500 mt-1 text-xs'>▹</span>
                    <span className='group-hover/item:translate-x-1 transition-transform duration-300'>Desarrollé soluciones que soporten alta concurrencia y transaccionalidad.</span>
                  </li>
                </ul>
              </div>
            </div>
          </WizardItem>
        </Wizard>
      </section>
    </>
  );
};

const Wizard = ({ children }: { children: ReactNode }) => {
  return (
    <ol className='relative flex max-w-4xl list-inside flex-col gap-8 md:gap-12 border-s-2 border-pink-500/30 dark:border-pink-500/20'>
      {children}
    </ol>
  );
};

const WizardItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className='ms-12 md:ms-16 group/timeline'>
      <span className='absolute -start-3 md:-start-4 flex items-center justify-center rounded-full bg-linear-to-br from-pink-500 to-pink-600 p-2.5 md:p-3 ring-4 md:ring-8 ring-pink-100 dark:ring-pink-950/50 shadow-lg shadow-pink-500/50 group-hover/timeline:scale-110 group-hover/timeline:ring-pink-200 dark:group-hover/timeline:ring-pink-900 transition-all duration-500'>
        <MdCheck className='text-white' size={20} />
      </span>
      {children}
    </li>
  );
};
