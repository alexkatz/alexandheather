'use client';

import { twMerge } from 'tailwind-merge';
import NavBarItem from './NavBarItem';
import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { NAV_ITEM_LIST } from './navItems';

export const HEADER_HEIGHT = 40;

type Props = {
  className?: string;
  style?: CSSProperties;
};

export default function NavBar({ className, style }: Props) {
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

    return observer.disconnect;
  }, []);

  const [{ backgroundOpacity, textColor }] = useSpring(
    () => ({
      backgroundOpacity: isStuck ? 1 : 0,
      textColor: isStuck ? '#000' : '#000',
    }),
    [isStuck],
  );

  return (
    <nav
      style={style}
      className={twMerge(
        'relative flex w-full flex-row items-center justify-center gap-2',
        isStuck && 'shadow-md shadow-black/10',
        className,
      )}
    >
      <div ref={scoutRef} className='absolute -top-[2px] h-[1px] w-full' />

      <animated.div
        className='absolute inset-0 -z-10 bg-white/80 backdrop-blur-md'
        style={{
          opacity: backgroundOpacity,
        }}
      />

      {NAV_ITEM_LIST.map(navItem => (
        <NavBarItem
          className={twMerge(!isStuck && 'text-shadow-sm')}
          key={navItem.title}
          navItem={navItem}
          color={textColor}
        />
      ))}
    </nav>
  );
}
