'use client';

import { twMerge } from 'tailwind-merge';
import NavBarItem, { NavItem } from './NavBarItem';
import { useLayoutEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';

const ITEMS: NavItem[] = [
  { title: 'SCHEDULE', href: '#schedule-section' },
  { title: 'TRAVEL', href: '#travel-section' },
  { title: 'REGISTRY', href: '#registry-section' },
  { title: 'Q & A', href: '#qa-section' },
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

      {ITEMS.map(navItem => (
        <NavBarItem
          className={twMerge(!isStuck && 'text-shadow-sm')}
          key={navItem.title}
          navItem={navItem}
          color={textColor}
        />
      ))}
    </animated.nav>
  );
}
