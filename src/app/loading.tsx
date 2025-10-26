'use client';
import { CircularProgress } from '@heroui/progress';

export default function Loading() {
  return (
    <div className='flex h-[80vh] flex-col items-center justify-center p-8'>
      <CircularProgress size='lg' color='primary' label='Cargando contenido...' />
    </div>
  );
}
