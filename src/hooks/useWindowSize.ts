import { useEffect, useState, useCallback } from "react";

interface IUseWindowSizeReturn {
  width: number;
  height: number;
}

export const useWindowSize = (): IUseWindowSizeReturn => {
  const isClient = typeof window === "object";

  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : -1,
      height: isClient ? window.innerHeight : -1,
    }),
    [isClient]
  );

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getSize, isClient]);

  return {
    ...windowSize,
  };
};

export default useWindowSize;
