'use client';

import { twMerge } from 'tailwind-merge';
import { useHover } from '@use-gesture/react';
import { useSpringValue, animated, AnimatedProps } from '@react-spring/web';
import { Arimo } from 'next/font/google';

const font = Arimo({ weight: '400', subsets: ['latin'] });

type Props = AnimatedProps<{
  title?: string;
  color?: string;
  children?: React.ReactNode;
}> & { className?: string };

export default function NavBarItem({ className, children, color }: Props) {
  const scale = useSpringValue(1);
  const bindHover = useHover(({ active }) => {
    scale.start(active ? 1.1 : 1);
  });

  return (
    <animated.div
      className={twMerge(
        'flex h-full cursor-pointer flex-row items-center justify-center px-2 shadow-black/60',
        className,
        font.className,
      )}
      style={{ scale, color }}
      {...bindHover()}
    >
      {children}
    </animated.div>
  );
}
