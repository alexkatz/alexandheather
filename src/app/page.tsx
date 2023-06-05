'use client';

import bridgeSelfie1 from '../../public/bridgeselfie1.jpeg';
import happyring1 from '../../public/happyring1.jpeg';
import happyring2 from '../../public/happyring2.jpeg';
import Snowflakes from './Snowflakes';
import { twMerge } from 'tailwind-merge';
import NavBar from './(nav-bar)/NavBar';
import Image from 'next/image';
import Section from './(section)/Section';
import { NAV_ITEMS } from './(nav-bar)/navItems';
import MenuButton from './(nav-bar)/MenuButton';
import SideMenu from './(nav-bar)/SideMenu';

// const headerFont = Amatic_SC({ weight: '400', subsets: ['latin'] });

const HEADER_HEIGHT = 60;

export default function Home() {
  return (
    <main className='flex flex-col'>
      <MenuButton className='fixed left-1 top-2 self-start md:hidden' />
      <SideMenu className='fixed bottom-0 left-0 top-0 z-10 md:hidden' />

      <Snowflakes className='fixed -z-10 h-[100vh] w-[100vw]' />
      {/* <SnowflakesSpring className='fixed z-20 h-[100vh] w-[100vw] bg-purple-500' /> */}
      <Section className='min-h-min' navItem={NAV_ITEMS.home}>
        <header className='flex h-[calc(50vh-2.5rem)] flex-col items-center'>
          <div className='flex flex-1 flex-col items-center justify-center'>
            <h1
              className={twMerge(
                // headerFont.className,
                'p-4 text-2xl',
              )}
            >
              Alex & Heather
            </h1>

            <h2
              className={twMerge(
                // headerFont.className,
                'text-xl',
              )}
            >
              February 18th, 2024
            </h2>

            <h3
              className={twMerge(
                // headerFont.className,
                'text-xl',
              )}
            >
              Pier Sixty, Manhattan
            </h3>
          </div>
        </header>
      </Section>

      <NavBar
        style={{ height: HEADER_HEIGHT }}
        className='sticky top-0 z-10 hidden md:flex'
      />

      <div className='flex h-[50vh] w-full gap-2 p-10 sm:gap-5 lg:gap-10'>
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

      <Section navItem={NAV_ITEMS.schedule}>
        <header>Schedule</header>
      </Section>

      <Section navItem={NAV_ITEMS.travel}>some travel stuff</Section>

      <Section navItem={NAV_ITEMS.registry}>some registry stuff</Section>

      <Section navItem={NAV_ITEMS.qa}>some q+a stuff</Section>
    </main>
  );
}
