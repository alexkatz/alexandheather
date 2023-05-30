'use client';

import { twMerge } from 'tailwind-merge';
import { useHover } from '@use-gesture/react';
import { useSpringValue, animated, AnimatedProps } from '@react-spring/web';
import { Arimo } from 'next/font/google';
import Link from 'next/link';
import { useCallback, MouseEvent } from 'react';

const font = Arimo({ weight: '400', subsets: ['latin'] });

export type NavItem = {
  title: string;
  href: string;
};

type Props = AnimatedProps<{
  color?: string;
  navItem: NavItem;
}> & { className?: string };

export default function NavBarItem({ navItem, className, color }: Props) {
  const scale = useSpringValue(1);
  const bindHover = useHover(({ active }) => {
    scale.start(active ? 1.1 : 1);
  });

  const handleOnClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('href')?.split('#').at(1);
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  return (
    <Link href={navItem.href} onClick={handleOnClick}>
      <animated.div
        className={twMerge(
          'flex h-full cursor-pointer flex-row items-center justify-center px-2 shadow-black/60',
          className,
          font.className,
        )}
        style={{ scale, color }}
        {...bindHover()}
      >
        {navItem.title}
      </animated.div>
    </Link>
  );
}
