import { useCallback, useRef } from "react";

export const useObserver = <TElement extends HTMLElement>(
  callback: () => void,
  canObserve: boolean = true
) => {
  const observer = useRef<IntersectionObserver>();

  const observe = useCallback(
    (node: TElement) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && canObserve) {
          callback();
        }
      });
      if (node) observer.current.observe(node);
    },
    [callback, canObserve]
  );

  return observe;
};

export default useObserver;
