'use client';

import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number = 500) => {
  const cleanValue = value.trim();
  const [debouncedValue, setDebouncedValue] = useState(cleanValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(cleanValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [cleanValue, delay]);

  return debouncedValue;
};
