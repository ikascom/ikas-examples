import { useEffect } from "react";
import { debounce } from "../debounce";

const DEBOUNCE_TIME = 300; //ms
function useScreenResize(callback: () => void) {
  useEffect(() => {
    const handleResize = () => callback();
    const debouncedHandleResize = debounce(handleResize, DEBOUNCE_TIME);

    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);
}

export { useScreenResize };
