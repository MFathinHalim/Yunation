// utils/useDraggable.ts
import { useEffect } from "react";

export const useDraggable = (
  headerRef: React.RefObject<HTMLElement>,
  containerRef: React.RefObject<HTMLElement>,
  positionRef: React.MutableRefObject<{ top: number; left: number }>
) => {
  useEffect(() => {
    const header = headerRef.current;
    const container = containerRef.current;
    if (!header || !container) return;

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;

      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
    };

    const elementDrag = (e: MouseEvent) => {
      e.preventDefault();

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      positionRef.current.top -= pos2;
      positionRef.current.left -= pos1;

      container.style.top = positionRef.current.top + "px";
      container.style.left = positionRef.current.left + "px";
    };

    const closeDragElement = () => {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    };

    header.addEventListener("mousedown", dragMouseDown);

    // cleanup on unmount
    return () => {
      header.removeEventListener("mousedown", dragMouseDown);
    };
  }, [headerRef, containerRef, positionRef]);
};
