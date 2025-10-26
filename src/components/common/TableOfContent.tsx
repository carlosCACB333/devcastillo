'use client';
import { Toc } from '@/interfaces';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Link } from '@heroui/link';

interface Props {
  toc: Toc[];
}

export const TableOfContent = ({ toc }: Props) => {
  return (
    <Card className='mx-auto mb-4 max-w-md'>
      <CardHeader>
        <h3 className='text-primary text-center text-2xl font-bold'>Contenido</h3>
      </CardHeader>
      <CardBody>
        <ul>
          {toc.map((item) => (
            <li key={item.title}>
              <LinkItem title={item.title} url={item.url} />
              <ol className='ps-4'>
                {item.children.map((subitem) => (
                  <li key={subitem.title}>
                    <LinkItem title={subitem.title} url={subitem.url} />
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

export const LinkItem = ({ title, url }: { title: string; url: string }) => {
  return (
    <Link
      className="before:bg-primary relative ml-[0.4rem] ps-2 font-semibold before:absolute before:top-[.5rem] before:left-[-0.4rem] before:h-[0.4rem] before:w-[0.4rem] before:rounded-full before:content-['']"
      color='foreground'
      size='sm'
      href={url}
      aria-label={title}
    >
      {title}
    </Link>
  );
};
