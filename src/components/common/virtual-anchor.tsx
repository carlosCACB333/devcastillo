'use client';
import { Link } from '@heroui/link';
import React, { startTransition, useEffect, useRef, useState } from 'react';
import { FaHashtag } from 'react-icons/fa';

export interface Props {
  id?: string;
  children?: React.ReactNode;
}

export const virtualAnchorEncode = (text?: string) => {
  if (!text) return undefined;

  return text.toLowerCase().replace(/ /g, '-');
};

export const VirtualAnchor: React.FC<Props> = ({ children, id }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [anchorId, setAnchorId] = useState<string | undefined>();

  useEffect(() => {
    if (!ref.current || !id) return;
    startTransition(() => {
      setAnchorId(virtualAnchorEncode(ref.current?.textContent || undefined));
    });
  }, [id]);

  return (
    <Link
      ref={ref}
      className='group relative flex w-fit items-center gap-1'
      href={`#${id || anchorId}`}
      style={{
        fontSize: 'inherit',
      }}
      aria-label={id || anchorId}
    >
      {children}
      <span className='opacity-0 transition-opacity group-hover:opacity-100'>
        <FaHashtag size={20} color='primary' />
      </span>
    </Link>
  );
};
