'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { LinkProps } from '@heroui/link';
import { LinkIcon } from '@heroui/shared-icons';
import { SlotsToClasses } from '@heroui/theme';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

const styles = tv({
  slots: {
    base: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
    card: 'border-transparent bg-white/5 dark:bg-default-300/10 backdrop-blur-lg backdrop-saturate-[1.5]',
    header: 'gap-2 pb-0',
    body: '',
    iconWrapper: 'flex justify-center p-2 rounded-full items-center bg-primary text-primary-900',
    title: 'text-base font-semibold',
    description: 'font-bold text-3xl text-center',
  },
});

export type FeaturesGridSlots = keyof ReturnType<typeof styles>;

export interface Feature extends LinkProps {
  title: string;
  icon: ReactNode;
  description?: string | ReactNode;
}

interface FeaturesGridProps {
  features: Feature[];
  classNames?: SlotsToClasses<FeaturesGridSlots>;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ features, classNames, ...props }) => {
  const router = useRouter();

  const slots = styles();

  const handleClick = (feat: Feature) => {
    if (!feat.href) {
      return;
    }

    if (feat.isExternal) {
      window.open(feat.href, '_blank');
      return;
    }

    router.push(feat.href);
  };

  return (
    <div className={slots.base({ class: classNames?.base })} {...props}>
      {features.map((feat: Feature, index: number) => (
        <Card
          key={`${feat.title}_${index}`}
          isBlurred
          className={slots.card({ class: classNames?.card })}
          isPressable={!!feat.href}
          onPress={() => handleClick(feat)}
        >
          <CardHeader className={slots.header({ class: classNames?.header })}>
            <div className={slots.iconWrapper({ class: classNames?.iconWrapper })}>{feat.icon}</div>
            <p className={slots.title({ class: classNames?.title })}>{feat.title}</p>
            {feat.isExternal && <LinkIcon className='text-white' height={18} width={18} />}
          </CardHeader>
          {feat.description ? (
            <CardBody className={slots.body({ class: classNames?.body })}>
              <p
                className={slots.description({
                  class: classNames?.description,
                })}
              >
                {feat.description}
              </p>
            </CardBody>
          ) : null}
        </Card>
      ))}
    </div>
  );
};
