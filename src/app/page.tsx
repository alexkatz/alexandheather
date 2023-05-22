import { Amatic_SC } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import Snowflakes from './Snowflakes';
import LandingImage from './LandingImage';

const headerFont = Amatic_SC({ weight: '400', subsets: ['latin'] });

export default function Home() {
  return (
    <main className='flex flex-col'>
      <Snowflakes />

      <header
        className={twMerge(
          headerFont.className,
          'flex h-[100vh] flex-col items-center',
        )}
      >
        <div className='flex flex-1 flex-col items-center justify-center'>
          <h1 className='p-4 text-9xl shadow-black/60 text-shadow-lg'>
            Alex & Heather
          </h1>

          <h2
            className={twMerge(
              headerFont.className,
              'text-6xl shadow-black/60 text-shadow-lg',
            )}
          >
            February 18th, 2024
          </h2>

          <h3
            className={twMerge(
              headerFont.className,
              'text-4xl shadow-black/60 text-shadow-lg',
            )}
          >
            Chelsea Piers, Manhattan
          </h3>
        </div>
      </header>
      <div className='h-[300000px]'></div>
    </main>
  );
}
// <LandingImage className='w-full flex-1' />
