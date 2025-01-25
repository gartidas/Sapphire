import { useCallback, useEffect, useLayoutEffect, useState } from "react";

// NOTE: Controls speed of scroll (higher number = higher speed)
const SCROLL_SPEED = 30;

// NOTE: Controls speed of "speed decay" (higher number = higher speed)
const DECAY_SPEED = 0.98;

export const useDragScroll = (useOnMobile: boolean = false) => {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

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
      setIsDragging(true);

      const startPos = {
        left: node.scrollLeft,
        top: node.scrollTop,
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!node) return;

        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;

        node.scrollTop = startPos.top - dy;
        node.scrollLeft = startPos.left - dx;

        const now = Date.now();
        const timeDiff = now - startPos.time;

        setVelocity({
          x: dx / timeDiff,
          y: dy / timeDiff,
        });
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        if (node) resetCursor(node);

        setIsDragging(false);
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
      setIsDragging(true);

      const touch = e.touches[0];
      const startPos = {
        left: node.scrollLeft,
        top: node.scrollTop,
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!node) return;

        const touch = e.touches[0];
        const dx = touch.clientX - startPos.x;
        const dy = touch.clientY - startPos.y;

        node.scrollTop = startPos.top - dy;
        node.scrollLeft = startPos.left - dx;

        const now = Date.now();
        const timeDiff = now - startPos.time;

        setVelocity({
          x: dx / timeDiff,
          y: dy / timeDiff,
        });
      };

      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);

        if (node) resetCursor(node);

        setIsDragging(false);
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

    if (useOnMobile) node.addEventListener("touchstart", handleTouchStart);

    return () => {
      node.removeEventListener("mousedown", handleMouseDown);

      if (useOnMobile) node.removeEventListener("touchstart", handleTouchStart);
    };
  }, [handleMouseDown, handleTouchStart, hasOverflow, node, useOnMobile]);

  useEffect(() => {
    if (!isDragging && velocity.x !== 0 && velocity.y !== 0 && node) {
      const momentumInterval = setInterval(() => {
        if (Math.abs(velocity.x) < 0.1 && Math.abs(velocity.y) < 0.1) {
          clearInterval(momentumInterval);
          return;
        }

        node.scrollLeft -= velocity.x * SCROLL_SPEED;
        node.scrollTop -= velocity.y * SCROLL_SPEED;

        setVelocity((prev) => ({
          x: prev.x * DECAY_SPEED,
          y: prev.y * DECAY_SPEED,
        }));
      }, 16);

      return () => clearInterval(momentumInterval);
    }
  }, [isDragging, velocity, node]);

  return { scrollContainerRef, hasOverflow };
};
