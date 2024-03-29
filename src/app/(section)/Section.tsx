'use client';

import {
  forwardRef,
  ComponentPropsWithoutRef,
  Ref,
  useLayoutEffect,
  useRef,
} from 'react';
import { HEADER_HEIGHT } from '../(nav-bar)/NavBar';
import { tw } from '@/utils/tw';
import { mergeRefs } from '@/utils/mergeRefs';
import { NavItem } from '../(nav-bar)/NavBarItem';
import { useSetAtom } from 'jotai';
import { selectedNavItemAtom } from '../(nav-bar)/atoms';
import { classed } from '@tw-classed/react';
import { Fira_Code } from 'next/font/google';
import { NAV_ITEMS } from '../(nav-bar)/navItems';

const subheaderFont = Fira_Code({ weight: '400', subsets: ['latin'] });

type Props = ComponentPropsWithoutRef<'section'> & {
  navItem: NavItem;
};

export const section = {
  h2: classed.header(
    'text-[2.5rem] text-white shadow-black text-shadow-sm',
    subheaderFont.className,
  ),
  h3: classed.h3('text-lg font-bold mt-2'),
  p: classed.p('mb-2'),
  ul: classed.ul('list-disc list-inside'),
  li: classed.li(),
} as const;

export default forwardRef(
  ({ className, navItem, ...props }: Props, ref: Ref<HTMLDivElement>) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const setSelectedNavItem = useSetAtom(selectedNavItemAtom);

    useLayoutEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setSelectedNavItem(navItem);
          }
        },
        { rootMargin: `-25% 0px -75% 0px` },
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return observer.disconnect;
    }, [navItem, setSelectedNavItem]);

    return (
      <section
        id={navItem.href.substring(1)}
        style={{
          paddingTop:
            navItem.href === NAV_ITEMS.home.href ? 0 : HEADER_HEIGHT + 8,
        }}
        className={tw(
          'm-auto flex min-h-[100vh] w-10/12 flex-col p-2',
          className,
        )}
        ref={mergeRefs(ref, sectionRef)}
        {...props}
      />
    );
  },
);
