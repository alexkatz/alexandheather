'use client';

import { tw } from '@/utils/tw';
import { useHover } from '@use-gesture/react';
import { useSpringValue, AnimatedProps } from '@react-spring/web';
import { Fira_Code } from 'next/font/google';
import { useAtomValue } from 'jotai';
import { selectedNavItemAtom } from './atoms';
import { useNavItemOnClick } from './useNavItemOnClick';
import { AnimatedLink } from '@/utils/AnimatedLink';

const font = Fira_Code({ weight: '500', subsets: ['latin'] });

export type NavItem = {
  title: string;
  href: string;
};

type Props = AnimatedProps<{
  color?: string;
  navItem: NavItem;
}> & { className?: string };

export default function NavBarItem({ navItem, className, color }: Props) {
  const selectedNavItem = useAtomValue(selectedNavItemAtom);
  const scale = useSpringValue(1);

  const bindHover = useHover(({ active }) => {
    scale.start(active ? 1.1 : 1);
  });

  const handleOnClick = useNavItemOnClick();

  return (
    <AnimatedLink
      href={`/${navItem.href}`}
      onClick={handleOnClick}
      className={tw(
        'flex h-full cursor-pointer flex-row items-center justify-center px-2 text-[1rem]',
        selectedNavItem === navItem && 'underline-offset-3 underline',
        font.className,
        className,
      )}
      style={{ scale, color }}
      {...bindHover()}
    >
      {navItem.title}
    </AnimatedLink>
  );
}
