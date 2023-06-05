import { atom } from 'jotai';
import { NavItem } from './NavBarItem';
import { NAV_ITEMS } from './navItems';

export const selectedNavItemAtom = atom<NavItem>(NAV_ITEMS.home);
export const isSideMenuOpenAtom = atom<boolean>(false);
