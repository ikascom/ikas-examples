import React from "react";

import { Slide } from "../../__generated__/types";

export type UseSliderProps = {
  slides?: Slide[];
};

const useSlider = ({ slides }: UseSliderProps) => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);

  React.useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.addEventListener("scroll", handleScroll);

      return () => {
        sliderRef.current?.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleScroll = React.useCallback(() => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;

      setActiveImageIndex(Math.ceil(scrollLeft / window.innerWidth));
    }
  }, []);

  const scrollTo = React.useCallback((to: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: to,
        behavior: "smooth",
      });
    }
  }, []);

  const goToSlide = React.useCallback((to: number) => {
    scrollTo(to * window.innerWidth);
  }, []);

  const nextSlide = React.useCallback(() => {
    if (activeImageIndex + 1 !== (slides?.length || 0)) {
      goToSlide(activeImageIndex + 1);
    } else {
      goToSlide(0);
    }
  }, [activeImageIndex]);

  const prevSlide = React.useCallback(() => {
    if (activeImageIndex !== 0) {
      goToSlide(activeImageIndex - 1);
    }
  }, [activeImageIndex]);

  const hasPrevSlide = React.useMemo(() => {
    return activeImageIndex !== 0;
  }, [activeImageIndex]);

  const hasNextSlide = React.useMemo(() => {
    return slides?.length && activeImageIndex + 1 !== slides.length;
  }, [slides, activeImageIndex]);

  return {
    sliderRef,
    nextSlide,
    prevSlide,
    hasPrevSlide,
    hasNextSlide,
  };
};

export default useSlider;
