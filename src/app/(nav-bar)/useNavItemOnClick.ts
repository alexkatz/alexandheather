import { useCallback, MouseEvent } from 'react';
import { useSetScrollY } from '../ScrollToContext';

export const useNavItemOnClick = () => {
  const setY = useSetScrollY();
  return useCallback(
    (e: MouseEvent) => {
      const id = e.currentTarget.getAttribute('href')?.split('#').at(1);
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          setY.set({ y: window.scrollY });
          setY.start({ y: element.offsetTop });
        }
      }
    },
    [setY],
  );
};
