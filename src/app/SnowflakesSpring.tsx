'use client';

import { random } from '@/utils/random';
import { SpringValue, animated, useScroll } from '@react-spring/web';
import { useCallback, useMemo, useRef } from 'react';
import { tw } from '@/utils/tw';
import useResizeObserver from 'use-resize-observer';

type UseScrollReturn = ReturnType<typeof useScroll>;

type OnChangeProps = {
  value: {
    [K in keyof UseScrollReturn]: UseScrollReturn[K] extends SpringValue<
      infer T
    >
      ? T
      : never;
  };
};

type Flake = {
  id: string | number;
  scaleFactor: number;
  top: number;
  left: number;
  opacity: number;
  degrees: number;
  type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
};

const PARALLAX_FACTOR = 0.5;
const OPACITY_FACTOR = 2;

const BASE_FLAKE_SIZE = 100;
const MIN_SCALE_FACTOR = 10;
const MAX_SCALE_FACTOR = 100;
const FLAKES_PER_ROW_FACTOR = 0.4;

const MAX_FLAKE_OPACITY = 100;
const MIN_FLAKE_OPACITY = 1;

const WIND_AMPLITUDE = 50;
const WIND_FREQUENCY = 0.001;

type Props = {
  className?: string;
};

export default function Snowflakes({ className }: Props) {
  const { ref, height = 0, width = 0 } = useResizeObserver();

  const flakes = useMemo(() => {
    return Array(2)
      .fill(0)
      .map<Flake>((_, index) => ({
        id: index,
        scaleFactor: random(MIN_SCALE_FACTOR, MAX_SCALE_FACTOR) / 100,
        top: random(0, height),
        left: random(0, width - BASE_FLAKE_SIZE),
        degrees: random(0, 45),
        opacity: random(MIN_FLAKE_OPACITY, MAX_FLAKE_OPACITY) / 100,
        type: random(1, 9).toString() as Flake['type'],
      }));
  }, [height, width]);

  const getFlakeTranslate = useCallback(
    ({ y, flake }: { y: number; flake: Flake }) => {
      const flakeRunwayHeight = height * 2;
      const parallaxY = y * PARALLAX_FACTOR;
      const translateY =
        height +
        flake.top -
        flake.opacity *
          OPACITY_FACTOR *
          ((parallaxY % flakeRunwayHeight) + BASE_FLAKE_SIZE);

      return [flake.left, translateY];
    },
    [height],
  );

  console.log('rendering');

  const { scrollY } = useScroll({
    onChange({ value }: OnChangeProps) {
      const parallaxHeight = window.innerHeight * PARALLAX_FACTOR;
      const pageProgress = (value.scrollY % parallaxHeight) / parallaxHeight;
    },
  });

  return (
    <div ref={ref} className={tw(className)}>
      {width != 0 &&
        height != 0 &&
        flakes.map(flake => (
          <animated.div
            key={flake.id}
            className='absolute h-10 w-10 bg-red-600'
            style={{
              opacity: flake.opacity,
              transform: scrollY.to(y => {
                const [xTrans, yTrans] = getFlakeTranslate({ y, flake });
                return `translate(${xTrans}px, ${yTrans}px)`;
              }),
            }}
          />
        ))}
    </div>
  );
}
