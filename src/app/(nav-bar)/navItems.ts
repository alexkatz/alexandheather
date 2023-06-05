import type { NavItem } from './NavBarItem';

export const NAV_ITEMS = {
  home: { title: 'HOME', href: '#home-section' },
  schedule: { title: 'SCHEDULE', href: '#schedule-section' },
  travel: { title: 'TRAVEL', href: '#travel-section' },
  registry: { title: 'REGISTRY', href: '#registry-section' },
  qa: { title: 'Q & A', href: '#qa-section' },
} as const satisfies Record<string, NavItem>;

export const NAV_ITEM_LIST = Object.values(NAV_ITEMS);
