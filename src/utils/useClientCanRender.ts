import { useEffect, useState } from 'react';

export const useClientCanRender = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(true);
  }, []);

  return canRender;
};
