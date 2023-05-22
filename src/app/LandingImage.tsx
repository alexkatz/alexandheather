'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

export default function LandingImage({ className }: Props) {
  return (
    <div
      className={twMerge('flex items-center justify-center p-12', className)}
    >
      <div className='relative aspect-4/3 h-full'>
        <Image
          className='shadow-even-heavy overflow-hidden opacity-80'
          fill
          src={'/alex-heather-bridge-1.jpeg'}
          alt='alex and heather proposal'
        />
      </div>
    </div>
  );
}
