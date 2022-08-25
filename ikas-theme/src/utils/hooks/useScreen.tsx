import { useCallback, useEffect, useState } from "react";
import { point } from "src/styles/breakpoints";
import { useScreenResize } from "./useScreenResize";

export function useScreen() {
  const [width, setWidth] = useState(0);
  const handleResize = useCallback(() => {
    setWidth(() => window.innerWidth);
  }, []);
  useScreenResize(handleResize);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return {
    width,
    isMobile: innerWidth < point.lg,
    isDesktop: innerWidth >= point.lg,
  };
}
