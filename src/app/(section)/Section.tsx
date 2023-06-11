import {
  forwardRef,
  ComponentPropsWithoutRef,
  Ref,
  useLayoutEffect,
  useRef,
} from 'react';
import { HEADER_HEIGHT } from '../(nav-bar)/NavBar';
import { twMerge } from 'tailwind-merge';
import { mergeRefs } from '@/utils/mergeRefs';
import { NavItem } from '../(nav-bar)/NavBarItem';
import { useSetAtom } from 'jotai';
import { selectedNavItemAtom } from '../(nav-bar)/atoms';
import { classed } from '@tw-classed/react';

type Props = ComponentPropsWithoutRef<'section'> & {
  navItem: NavItem;
};

export const section = {
  h2: classed.header('text-2xl mb-4'),
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
        {
          rootMargin: `-25% 0px -75% 0px`,
        },
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return observer.disconnect;
    }, [navItem, setSelectedNavItem]);

    return (
      <section
        id={navItem.href.substring(1)}
        style={{ paddingTop: HEADER_HEIGHT + 8 }}
        className={twMerge('flex min-h-[100vh] flex-col p-2', className)}
        ref={mergeRefs(ref, sectionRef)}
        {...props}
      />
    );
  },
);
