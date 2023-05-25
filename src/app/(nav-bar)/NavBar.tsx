'use client';

import { twMerge } from 'tailwind-merge';
import NavBarItem from './NavBarItem';
import { useLayoutEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

type NavItem = {
  title: string;
};

const ITEMS: NavItem[] = [
  { title: 'SCHEDULE' },
  { title: 'TRAVEL' },
  { title: 'REGISTERY' },
  { title: 'Q & A' },
];

type Props = {
  className?: string;
};

export default function NavBar({ className }: Props) {
  const scoutRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useLayoutEffect(() => {
    const scout = scoutRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      setIsStuck(!entry.isIntersecting);
    });

    if (scout) {
      observer.observe(scout);
    }

    return () => (scout ? observer.unobserve(scout) : undefined);
  }, []);

  const [{ backgroundOpacity, textColor }] = useSpring(
    () => ({
      backgroundOpacity: isStuck ? 1 : 0,
      textColor: isStuck ? '#000' : '#fff',
    }),
    [isStuck],
  );

  return (
    <animated.nav
      className={twMerge(
        'relative flex w-full flex-row items-center justify-center gap-2',
        isStuck && 'shadow-md shadow-black/10',
        className,
      )}
    >
      <div ref={scoutRef} className='absolute -top-[2px] h-[1px] w-full' />
      <animated.div
        className='absolute inset-0 -z-10 bg-white'
        style={{
          opacity: backgroundOpacity,
        }}
      />

      {ITEMS.map(({ title }) => (
        <NavBarItem
          className={twMerge(!isStuck && 'text-shadow-sm')}
          key={title}
          color={textColor}
        >
          {title}
        </NavBarItem>
      ))}
    </animated.nav>
  );
}
