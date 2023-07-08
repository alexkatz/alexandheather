'use client';

// https://www.misha.studio/snowflaker/

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useResizeObserver from 'use-resize-observer';
import { useVirtualizer } from '@tanstack/react-virtual';
import { random } from '@/utils/random';
import { useDebouncedCallback } from 'use-debounce';
import { tw } from '@/utils/tw';
import { SpringValue, animated, useScroll } from '@react-spring/web';

const AnimatedImage = animated(Image);

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

type FlakeInfo = {
  scaleFactor: number;
  top: number;
  left: number;
  opacity: number;
  degrees: number;
  type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
};

const OVERSCAN = 2;

const SCROLL_FACTOR = 0.5;
const OPACITY_SCROLL_FACTOR = 3;

const MIN_SCALE_FACTOR = 10;
const MAX_SCALE_FACTOR = 100;
const FLAKES_PER_ROW_FACTOR = 0.3;

const MAX_FLAKE_OPACITY = 50;
const MIN_FLAKE_OPACITY = 20;

const WIND_AMPLITUDE = 100;
const WIND_FREQUENCY = 0.001;

const getParallaxScrollY = (scrollY: number) =>
  Math.round(scrollY * SCROLL_FACTOR);

type Props = {
  className?: string;
};

export default function Snowflakes({ className }: Props) {
  const { ref: containerRef, width = 0, height = 0 } = useResizeObserver();
  const listRef = useRef<HTMLDivElement>(null);
  const [flakesPerRow, setFlakesPerRow] = useState(0);
  const [flakeRows, setFlakeRows] = useState<FlakeInfo[][]>([]);

  const baseFlakeSize = useMemo(() => Math.min(width / 4, 200), [width]);

  const rowHeight = useMemo(() => height / 2, [height]);

  const addFlakeRow = useCallback(() => {
    if (rowHeight === 0) return;
    setFlakeRows(prev => [
      ...prev,
      Array(flakesPerRow)
        .fill(null)
        .map<FlakeInfo>(() => ({
          scaleFactor: random(MIN_SCALE_FACTOR, MAX_SCALE_FACTOR) / 100,
          top: random(rowHeight, 0),
          left: random(0, width - baseFlakeSize),
          degrees: random(0, 45),
          opacity: random(MIN_FLAKE_OPACITY, MAX_FLAKE_OPACITY) / 100,
          type: random(1, 9).toString() as FlakeInfo['type'],
        })),
    ]);
  }, [baseFlakeSize, flakesPerRow, rowHeight, width]);

  const rowVirtualizer = useVirtualizer({
    count: flakeRows.length + 1,
    getScrollElement: useCallback(() => listRef.current, []),
    overscan: OVERSCAN,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  const { scrollY } = useScroll({
    onChange({ value }: OnChangeProps) {
      const parallaxScroll = getParallaxScrollY(value.scrollY);
      if (listRef.current) listRef.current.scrollTop = parallaxScroll;
    },
  });

  const debouncedResetFlakes = useDebouncedCallback(
    useCallback(() => {
      setFlakesPerRow(
        Math.ceil(width / (baseFlakeSize * FLAKES_PER_ROW_FACTOR)),
      );
      setFlakeRows([]);
    }, [baseFlakeSize, width]),
    300,
  );

  useEffect(() => {
    debouncedResetFlakes();
  }, [width, rowHeight, debouncedResetFlakes]);

  useEffect(() => {
    const lastItem = virtualItems.at(-1);
    if (
      flakeRows.length === 0 ||
      (lastItem && lastItem.index >= flakeRows.length - 1)
    ) {
      addFlakeRow();
    }
  }, [addFlakeRow, flakeRows.length, virtualItems]);

  return (
    <div
      ref={containerRef}
      className={tw(
        'snowflakes',
        'bg-gradient-to-t from-white to-sky-600',
        className,
      )}
    >
      {height > 0 && (
        <div
          ref={listRef}
          className='overflow-hidden will-change-scroll'
          style={{ width, height }}
        >
          <div
            className='relative w-full'
            style={{ height: rowVirtualizer.getTotalSize() }}
          >
            {virtualItems.map(virtualRow => {
              const flakeInfos = flakeRows[virtualRow.index];
              const rowStart = virtualRow.start;
              return !flakeInfos ? null : (
                <div
                  key={virtualRow.key}
                  className='absolute'
                  style={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: virtualRow.size,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {flakeInfos.map(
                    (
                      { type, scaleFactor, left, top, opacity, degrees },
                      index,
                    ) => (
                      <AnimatedImage
                        key={`${virtualRow.key}-${index}`}
                        className='absolute will-change-transform'
                        style={{
                          translateX: scrollY.to(value => {
                            const parallaxScroll = getParallaxScrollY(value);
                            return (
                              left +
                              Math.sin(
                                parallaxScroll * WIND_FREQUENCY -
                                  rowStart +
                                  height,
                              ) *
                                WIND_AMPLITUDE
                            );
                          }),
                          translateY: scrollY.to(value => {
                            const parallaxScroll = getParallaxScrollY(value);
                            const bottomStart = height + parallaxScroll;
                            return rowStart - rowHeight * 2 >= bottomStart
                              ? top
                              : top -
                                  opacity *
                                    OPACITY_SCROLL_FACTOR *
                                    (parallaxScroll -
                                      (rowStart - rowHeight * 2) +
                                      height);
                          }),
                          opacity,
                          scale: `${-(baseFlakeSize * scaleFactor)}%`,
                          rotate: `${degrees}deg`,
                        }}
                        src={`/snowflake-white-${type}.png`}
                        width={80}
                        height={60}
                        alt='snowflake'
                      />
                    ),
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
