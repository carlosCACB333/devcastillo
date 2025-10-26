'use client';

import { clsx } from '@heroui/shared-utils';

import { useIsMounted } from '@/hooks/use-is-mounted';

export const BgLooper = () => {
  const isMounted = useIsMounted();

  return (
    <div
      className={clsx(
        'absolute -top-20 left-0 h-[calc(100%+5rem)] w-screen',
        '-z-1 opacity-50 transition-opacity',
        "bg-[url('/gradients/looper-pattern.svg')] bg-left bg-no-repeat"
      )}
      data-mounted={isMounted}
    />
  );
};
