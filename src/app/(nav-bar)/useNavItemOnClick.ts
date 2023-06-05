import { useCallback, MouseEvent } from 'react';

export const useNavItemOnClick = () =>
  useCallback((e: MouseEvent) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute('href')?.split('#').at(1);
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  }, []);
