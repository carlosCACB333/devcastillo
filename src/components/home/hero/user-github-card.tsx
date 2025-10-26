import { useAuthor } from '@/hooks';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Link } from '@heroui/link';
import { clsx } from '@heroui/shared-utils';
import Image from 'next/image';
import { FC } from 'react';

interface UserTwitterCardProps {
  className?: string;
}

export const UserGitHubCard: FC<UserTwitterCardProps> = ({ className }) => {
  const { author } = useAuthor();

  return (
    <Card className={clsx('max-w-[300px]', className)}>
      <CardHeader className='justify-between'>
        <div className='flex gap-5'>
          <Image
            alt={author.firstName + ' ' + author.lastName}
            style={{
              objectPosition: 'top',
            }}
            src={author.photos![0].url}
            width={50}
            height={50}
            className={clsx('h-12 w-12 rounded-full', 'object-cover', 'object-center', 'border-2', 'border-primary')}
          />
          <div className='flex flex-col items-start justify-center'>
            <h4 className='text-sm leading-none font-semibold'>
              {author.firstName} {author.lastName}
            </h4>
            <Link className='text-sm' href={author.github!.toString()} target='_blank' aria-label='Github'>
              @carloscb333
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardBody className='px-3 py-0'>
        <p className='pl-px text-sm'>
          Desarrollador Full-stack &nbsp;
          <span aria-label='confetti' role='img'>
            🎉
          </span>
        </p>
      </CardBody>
      <CardFooter className='gap-3'>
        <div className='flex gap-1'>
          <p className='text-xs font-semibold'>45</p>
          <p className='text-xs'>Respositorios</p>
        </div>
      </CardFooter>
    </Card>
  );
};
