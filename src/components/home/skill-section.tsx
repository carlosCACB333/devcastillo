'use client';

import { sectionWrapper, subtitle, title } from '@/components';
import { Category } from '@/generated/graphql';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Tooltip } from '@heroui/tooltip';
import { useState } from 'react';
import { GradientBox } from '../common/gradient-box';
import { Icon, IconName } from '../common/icon';

interface Props {
  categories: Category[];
}

export const SkillSection = ({ categories }: Props) => {
  const [selected, setSelected] = useState(categories[0]);

  return (
    <section className={sectionWrapper({ class: 'z-20 mt-16 lg:mt-44' })}>
      <div className='flex flex-col gap-8'>
        <div>
          <div className='text-center md:text-start'>
            <h1 className={title({ size: 'lg' })}>Mis &nbsp;</h1>
            <h1 className={title({ color: 'green', size: 'lg' })}>Habilidades</h1>
            <div className='flex flex-col items-center md:flex-row'>
              <h1 className={title({ size: 'lg' })}>tecnológicas&nbsp;</h1>
              <Icon
                className='text-success animate-heartbeat'
                height={50}
                width={50}
                name='ia'
                style={{
                  animationDuration: '2.5s',
                }}
              />
            </div>
          </div>
          <p className={subtitle()}>
            Mis habilidades tecnológicas para el desarrollo de software
            <span className='text-green-500 dark:text-green-400'> Full-Stack </span>
            escalables, robustas y seguras.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <div className='grid h-min grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'>
            {categories.map((item) => (
              <Button
                size='lg'
                key={item.id}
                onClick={() => setSelected(item)}
                startContent={
                  <Icon
                    name={item.icon as IconName}
                    style={{
                      height: 30,
                      width: 30,
                    }}
                  />
                }
                className='justify-start'
                color={selected.id === item.id ? 'success' : 'default'}
                aria-label={item.name}
              >
                {item.name}
              </Button>
            ))}
          </div>

          <GradientBox
            className='min-h-[200px] flex-wrap items-start gap-4 p-8 lg:min-h-[390px]'
            color='green'
            to='right'
          >
            {selected.skills?.map((skill) => (
              <Tooltip
                key={skill.id}
                content={
                  <div className='max-w-xs px-1 py-2'>
                    <div className='text-small font-bold'>{skill.name}</div>
                    <div className='text-tiny'>{skill.detail}</div>
                  </div>
                }
              >
                <Card className='cursor-pointer'>
                  <CardBody>
                    <Icon
                      name={skill.icon as IconName}
                      className='text-foreground fill-foreground'
                      style={{
                        height: 30,
                        width: 30,
                      }}
                    />
                  </CardBody>
                </Card>
              </Tooltip>
            ))}
          </GradientBox>
        </div>
      </div>
    </section>
  );
};
