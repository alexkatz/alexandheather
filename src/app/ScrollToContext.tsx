import { SpringRef } from '@react-spring/web';
import { PropsWithChildren, createContext, useContext } from 'react';

const ScrollToContext = createContext(
  undefined as unknown as SpringRef<{ y: number }>,
);

export const useSetScrollY = () => {
  return useContext(ScrollToContext);
};

type Props = PropsWithChildren<{
  setY: SpringRef<{ y: number }>;
}>;

export default function ScrollToProvider({ children, setY }: Props) {
  return (
    <ScrollToContext.Provider value={setY}>{children}</ScrollToContext.Provider>
  );
}
