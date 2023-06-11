import { SpringRef } from '@react-spring/web';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useLayoutEffect,
} from 'react';

const ScrollToContext = createContext((() => {}) as SpringRef<{ y: number }>);

export const useSetScrollY = () => {
  return useContext(ScrollToContext);
};

type Props = PropsWithChildren<{
  setY: SpringRef<{ y: number }>;
}>;

export default function ScrollToProvider({ children, setY }: Props) {
  // useLayoutEffect(() => {
  //   const onScroll = () => {
  //     console.log('scrollend');
  //     setY.set({ y: window.scrollY });
  //   };
  //
  //   window.addEventListener('scrollend', onScroll, false);
  //   return () => window.removeEventListener('scrollend', onScroll, false);
  // }, [setY]);

  return (
    <ScrollToContext.Provider value={setY}>{children}</ScrollToContext.Provider>
  );
}
