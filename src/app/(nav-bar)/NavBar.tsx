'use client';

import { tw } from '@/utils/tw';
import NavBarItem from './NavBarItem';
import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { NAV_ITEM_LIST } from './navItems';

export const HEADER_HEIGHT = 60;

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

  const [{ backgroundOpacity }] = useSpring(
    () => ({
      backgroundOpacity: isStuck ? 1 : 0,
    }),
    [isStuck],
  );

  return (
    <nav
      style={{ ...style, height: HEADER_HEIGHT }}
      className={tw(
        'relative flex w-full flex-row items-center justify-center gap-2 text-white',
        className,
      )}
    >
      <div ref={scoutRef} className='absolute -top-[2px] h-[1px] w-full' />

      <animated.div
        className='absolute inset-0 -z-10 bg-black/70 backdrop-blur-md'
        style={{ opacity: backgroundOpacity }}
      />

      {NAV_ITEM_LIST.map(navItem => (
        <NavBarItem key={navItem.title} navItem={navItem} />
      ))}
    </nav>
  );
}
