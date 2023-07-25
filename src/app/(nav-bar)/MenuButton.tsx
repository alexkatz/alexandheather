import {
  AnimatedProps,
  animated,
  useSpring,
  useSpringValue,
} from '@react-spring/web';
import { useHover } from '@use-gesture/react';
import { useAtom } from 'jotai';
import { ComponentPropsWithoutRef, Ref, forwardRef } from 'react';
import { tw } from '@/utils/tw';
import { isSideMenuOpenAtom } from './atoms';

type Props = AnimatedProps<ComponentPropsWithoutRef<'button'>> & {
  className?: string;
};

export default forwardRef(
  ({ className }: Props, ref: Ref<HTMLButtonElement>) => {
    const scale = useSpringValue(1);
    const [isOpen, setIsOpen] = useAtom(isSideMenuOpenAtom);

    const first = useSpring({
      transform: isOpen
        ? 'translate(5px, 32px) rotate(-45deg)'
        : 'translate(2px, 7px) rotate(0deg)',
    });

    const second = useSpring({
      transform: isOpen
        ? 'translate(10px, 4px) rotate(45deg)'
        : 'translate(2px, 19px) rotate(0deg)',
    });

    const third = useSpring({
      transform: isOpen
        ? 'translate(5px, 32px) rotate(-45deg)'
        : 'translate(2px, 31px) rotate(0deg)',
    });

    const bindHover = useHover(({ active }) => {
      scale.start(active ? 1.05 : 1);
    });

    return (
      <animated.button
        aria-label='Menu'
        style={{ scale }}
        {...bindHover()}
        className={tw(
          'relative z-20 overflow-hidden rounded-md p-1',
          className,
        )}
        ref={ref}
      >
        {!isOpen && (
          <div className='absolute inset-0 -z-10 bg-black/70 backdrop-blur-sm' />
        )}
        <svg
          onClick={() => setIsOpen(prev => !prev)}
          width='40'
          height='32'
          stroke='white'
          fill='white'
          viewBox='0 0 44 44'
          xmlns='http://www.w3.org/2000/svg'
        >
          <animated.rect width='40' height='4' rx='2' style={first} />
          <animated.rect width='40' height='4' rx='2' style={second} />
          <animated.rect width='40' height='4' rx='2' style={third} />
        </svg>
      </animated.button>
    );
  },
);
