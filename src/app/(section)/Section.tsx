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

type Props = ComponentPropsWithoutRef<'section'> & {
  navItem: NavItem;
};

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
        style={{ paddingTop: HEADER_HEIGHT }}
        className={twMerge('min-h-[100vh]', className)}
        {...props}
        ref={mergeRefs(ref, sectionRef)}
      />
    );
  },
);
