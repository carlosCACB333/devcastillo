'use client';
import notfound from '@/assets/img/not-found.svg';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';
import Image from 'next/image';

export const NotFound = () => {
  return (
    <div className='flex min-h-[80vh] w-full flex-col items-center justify-center'>
      <Image src={notfound} alt='not found' />
      <h2>
        <span className='text-2xl font-bold'>Oops, este recurso no existe</span>
      </h2>
      <br />
      <Button as={Link} href='/' color='primary' aria-label='voler a la pagina de inicio'>
        Volver a la página de inicio
      </Button>
    </div>
  );
};

export default NotFound;
