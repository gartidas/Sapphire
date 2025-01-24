import { useCallback, useEffect, useLayoutEffect, useState } from "react";

export const useDragScroll = (useOnMobile: boolean = false) => {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const scrollContainerRef = useCallback((nodeEl: HTMLElement | null) => {
    setNode(nodeEl);
  }, []);

  const checkOverflow = useCallback(() => {
    if (!node) return;

    setHasOverflow(
      node.scrollWidth > node.clientWidth ||
        node.scrollHeight > node.clientHeight
    );
  }, [node]);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!node || !hasOverflow) {
        return;
      }

      e.preventDefault();
      updateCursor(node);

      const startPos = {
        left: node.scrollLeft,
        top: node.scrollTop,
        x: e.clientX,
        y: e.clientY,
      };

      const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;

        node.scrollTop = startPos.top - dy;
        node.scrollLeft = startPos.left - dx;
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        resetCursor(node);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [hasOverflow, node]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!node || !hasOverflow) {
        return;
      }

      e.preventDefault();
      updateCursor(node);

      const touch = e.touches[0];

      const startPos = {
        left: node.scrollLeft,
        top: node.scrollTop,
        x: touch.clientX,
        y: touch.clientY,
      };

      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const dx = touch.clientX - startPos.x;
        const dy = touch.clientY - startPos.y;

        node.scrollTop = startPos.top - dy;
        node.scrollLeft = startPos.left - dx;
      };

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);

        resetCursor(node);
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    },
    [hasOverflow, node]
  );

  const updateCursor = (el: HTMLElement) => {
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const resetCursor = (el: HTMLElement) => {
    el.style.cursor = "grab";
    el.style.removeProperty("user-select");
  };

  useLayoutEffect(() => {
    checkOverflow();

    if (node) {
      const observer = new MutationObserver(() => {
        checkOverflow();
      });

      observer.observe(node, {
        childList: true,
        subtree: true,
        attributes: true,
      });

      window.addEventListener("resize", checkOverflow);

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", checkOverflow);
      };
    }
  }, [node, checkOverflow]);

  useEffect(() => {
    if (!node || !hasOverflow) {
      return;
    }

    node.addEventListener("mousedown", handleMouseDown);
    useOnMobile && node.addEventListener("touchstart", handleTouchStart);

    return () => {
      node.removeEventListener("mousedown", handleMouseDown);
      useOnMobile && node.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleMouseDown, handleTouchStart, hasOverflow, node, useOnMobile]);

  return { scrollContainerRef, hasOverflow };
};
