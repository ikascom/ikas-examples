import { useEffect } from "react";
import { debounce } from "../debounce";

const DEBOUNCE_TIME = 300; //ms
function useScreenResize(callback: () => void) {
  useEffect(() => {
    const handleResize = () => callback();
    const debouncedHandleResize = debounce(handleResize, DEBOUNCE_TIME);

    document.addEventListener("resize", debouncedHandleResize);
    return () => document.removeEventListener("resize", debouncedHandleResize);
  }, []);
}

export { useScreenResize };
