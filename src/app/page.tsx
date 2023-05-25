import bridgeSelfie1 from '../../public/bridgeselfie1.jpeg';
import bridgeSelfie2 from '../../public/bridgeselfie2.jpeg';
import happyring1 from '../../public/happyring1.jpeg';
import happyring2 from '../../public/happyring2.jpeg';
import Snowflakes from './Snowflakes';
import { Amatic_SC } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import NavBar from './(nav-bar)/NavBar';
import Image from 'next/image';

const headerFont = Amatic_SC({ weight: '400', subsets: ['latin'] });

export default function Home() {
  return (
    <main className='flex flex-col'>
      <Snowflakes className='fixed -z-10 h-[100vh] w-[100vw]' />
      <header className='flex h-[calc(50vh-2.5rem)] flex-col items-center'>
        <div className='flex flex-1 flex-col items-center justify-center'>
          <h1
            className={twMerge(
              headerFont.className,
              'p-4 text-9xl shadow-black/60 text-shadow-lg short:text-5xl',
            )}
          >
            Alex & Heather
          </h1>

          <h2
            className={twMerge(
              headerFont.className,
              'text-6xl shadow-black/60 text-shadow-lg short:text-3xl',
            )}
          >
            February 18th, 2024
          </h2>

          <h3
            className={twMerge(
              headerFont.className,
              'text-4xl shadow-black/60 text-shadow-lg short:text-xl',
            )}
          >
            Pier Sixty, Manhattan
          </h3>
        </div>
      </header>
      <NavBar className='sticky top-0 z-10 h-[2.5rem]' />

      <div className='flex h-[50vh] w-full gap-10 p-10'>
        <div className='relative flex-1'>
          <Image
            src={happyring1}
            alt='Heather smiling and showing off her engagement ring'
            className='object-contain'
            fill
          />
        </div>

        <div className='relative flex-1'>
          <Image
            src={bridgeSelfie1}
            alt='Heather and Alex smiling in front of a wooden covered bridge'
            className='object-contain'
            fill
          />
        </div>

        <div className='relative flex-1'>
          <Image
            src={happyring2}
            alt='Heather showing off her engagement ring again'
            className='object-contain'
            fill
          />
        </div>
      </div>

      <div className='h-[3000px] w-full text-5xl'>
        THE REST OF THE WEBSITE LOL
      </div>
    </main>
  );
}
