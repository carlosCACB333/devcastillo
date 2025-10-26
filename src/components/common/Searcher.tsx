'use client';

import { Input, InputProps } from '@heroui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

const TO_RESET_SEARCH_PARAMS = ['page'];

export const Search = ({ defaultValue, ...props }: InputProps) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    TO_RESET_SEARCH_PARAMS.forEach((param) => {
      params.delete(param);
    });

    const url = `${path}?${params.toString()}`;

    router.replace(url, { scroll: false });
  };

  return (
    <Input
      aria-label='Buscar'
      defaultValue={defaultValue}
      onValueChange={(value) => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        const newQuery = value.trim();
        if (newQuery === defaultValue) return;

        timerRef.current = setTimeout(() => {
          handleSearch(newQuery);
        }, 800);
      }}
      {...props}
    />
  );
};
