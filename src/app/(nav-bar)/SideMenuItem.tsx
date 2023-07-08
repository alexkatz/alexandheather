import { tw } from '@/utils/tw';
import { NavItem } from './NavBarItem';
import { useSpringValue } from '@react-spring/web';
import { useHover } from '@use-gesture/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { isSideMenuOpenAtom, selectedNavItemAtom } from './atoms';
import { useNavItemOnClick } from './useNavItemOnClick';
import { AnimatedLink } from '@/utils/AnimatedLink';
import { Fira_Code } from 'next/font/google';

const font = Fira_Code({ weight: '400', subsets: ['latin'] });

type Props = {
  className?: string;
  navItem: NavItem;
};

export default function SideMenuItem({ className, navItem }: Props) {
  const selectedNavItem = useAtomValue(selectedNavItemAtom);
  const setIsMenuOpen = useSetAtom(isSideMenuOpenAtom);

  const handleOnClick = useNavItemOnClick();

  const scale = useSpringValue(1);
  const bindHover = useHover(({ active }) => {
    scale.start(active ? 1.05 : 1);
  });

  return (
    <AnimatedLink
      {...bindHover()}
      href={navItem.href}
      onClick={e => {
        handleOnClick(e);
        setIsMenuOpen(false);
      }}
      style={{ scale }}
      className={tw(
        'block cursor-pointer rounded-md p-1 py-2',
        selectedNavItem.href === navItem.href && 'underline underline-offset-4',
        font.className,
        className,
      )}
    >
      {navItem.title}
    </AnimatedLink>
  );
}
