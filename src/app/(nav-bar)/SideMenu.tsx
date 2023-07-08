import { useAtomValue } from 'jotai';
import { tw } from '@/utils/tw';
import { isSideMenuOpenAtom } from './atoms';
import { animated, useSpring } from '@react-spring/web';
import useResizeObserver from 'use-resize-observer';
import { useClientCanRender } from '@/utils/useClientCanRender';
import SideMenuItem from './SideMenuItem';
import { NAV_ITEM_LIST } from './navItems';

type Props = {
  className?: string;
};

export default function SideMenu({ className }: Props) {
  const isOpen = useAtomValue(isSideMenuOpenAtom);
  const { width = 0, ref } = useResizeObserver({ box: 'border-box' });

  const { left } = useSpring({
    left: isOpen ? width : 0,
  });

  const canRender = useClientCanRender();

  return !canRender ? null : (
    <animated.div
      ref={ref}
      style={{
        left: -width,
        translateX: left,
      }}
      className={tw(
        'relative min-w-[12rem] p-2 pt-12 shadow-xl',
        className,
      )}
    >
      <div className='absolute inset-0 -z-10 bg-white/70 backdrop-blur-sm' />
      {NAV_ITEM_LIST.map(navItem => (
        <SideMenuItem key={navItem.href} navItem={navItem} />
      ))}
    </animated.div>
  );
}
