'use client';

// https://www.misha.studio/snowflaker/

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useResizeObserver from 'use-resize-observer';
import { useVirtualizer } from '@tanstack/react-virtual';
import { random } from '@/utils/random';
import { useDebouncedCallback } from 'use-debounce';
import { twMerge } from 'tailwind-merge';
import { animated } from '@react-spring/web';

type FlakeInfo = {
  scaleFactor: number;
  top: number;
  left: number;
  opacity: number;
  degrees: number;
  type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
};

const OVERSCAN = 1;

const SCROLL_FACTOR = 0.5;
const OPACITY_FACTOR = 2;

const BASE_FLAKE_SIZE = 100;
const MIN_SCALE_FACTOR = 10;
const MAX_SCALE_FACTOR = 100;
const FLAKES_PER_ROW_FACTOR = 0.4;

const MAX_FLAKE_OPACITY = 30;
const MIN_FLAKE_OPACITY = 1;

const WIND_AMPLITUDE = 50;
const WIND_FREQUENCY = 0.001;

type Props = {
  className?: string;
};

export default function Snowflakes({ className }: Props) {
  const { ref: containerRef, width = 0, height = 0 } = useResizeObserver();
  const listRef = useRef<HTMLDivElement>(null);
  const [flakesPerRow, setFlakesPerRow] = useState(0);
  const [flakeRows, setFlakeRows] = useState<FlakeInfo[][]>([]);
  const [parallaxScrollY, setParallaxScrollY] = useState(0);

  const rowHeight = useMemo(() => height / 3, [height]);

  const addFlakeRow = useCallback(() => {
    if (rowHeight === 0) return;
    setFlakeRows(prev => [
      ...prev,
      Array(flakesPerRow)
        .fill(null)
        .map<FlakeInfo>(() => ({
          scaleFactor: random(MIN_SCALE_FACTOR, MAX_SCALE_FACTOR) / 100,
          top: random(rowHeight, 0),
          left: random(0, width - BASE_FLAKE_SIZE),
          degrees: random(0, 45),
          opacity: random(MIN_FLAKE_OPACITY, MAX_FLAKE_OPACITY) / 100,
          type: random(1, 9).toString() as FlakeInfo['type'],
        })),
    ]);
  }, [flakesPerRow, rowHeight, width]);

  const rowVirtualizer = useVirtualizer({
    count: flakeRows.length + 1,
    getScrollElement: useCallback(() => listRef.current, []),
    overscan: OVERSCAN,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useLayoutEffect(() => {
    const onScroll = () => {
      const parallaxScroll = Math.round(window.scrollY * SCROLL_FACTOR);
      setParallaxScrollY(parallaxScroll);
      listRef.current?.scroll({ top: parallaxScroll });
    };

    window.addEventListener('scroll', onScroll, false);
    return () => window.removeEventListener('scroll', onScroll, false);
  }, []);

  const debouncedResetFlakes = useDebouncedCallback(
    useCallback(() => {
      setFlakesPerRow(
        Math.ceil(width / (BASE_FLAKE_SIZE * FLAKES_PER_ROW_FACTOR)),
      );
      setFlakeRows([]);
    }, [width]),
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
    <div ref={containerRef} className={twMerge('snowflakes', className)}>
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
              const bottomStart = height + parallaxScrollY;
              return !flakeInfos ? null : (
                <div
                  key={virtualRow.key}
                  className='absolute will-change-transform'
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
                    ) => {
                      const leftTranslate =
                        left +
                        Math.sin(
                          parallaxScrollY * WIND_FREQUENCY - rowStart + height,
                        ) *
                          WIND_AMPLITUDE;

                      const topTranslate =
                        rowStart >= bottomStart
                          ? top
                          : top -
                            opacity *
                              OPACITY_FACTOR *
                              (parallaxScrollY - rowStart + height);

                      return (
                        <animated.div
                          key={`${virtualRow.key}-${index}`}
                          className='absolute will-change-transform'
                        >
                          <Image
                            src={`/snowflake-${type}.svg`}
                            width={80}
                            height={60}
                            style={{
                              opacity,
                              transform: `
                              translate(${leftTranslate}px, ${topTranslate}px)
                              scale(${-(BASE_FLAKE_SIZE * scaleFactor)}%)
                              rotate(${degrees}deg)
                              `,
                            }}
                            alt='snowflake'
                          />
                        </animated.div>
                      );
                    },
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
