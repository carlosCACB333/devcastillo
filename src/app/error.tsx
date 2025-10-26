'use client';

import { Button } from '@heroui/button';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex h-full min-h-[80vh] w-full flex-col items-center justify-center gap-4 text-center'>
      <h2 className='text-2xl font-bold'>Oops,Algo salió mal</h2>
      <Button aria-label='Intentar de nuevo' color='primary' onClick={() => reset()}>
        Intentar de nuevo
      </Button>
    </div>
  );
}
