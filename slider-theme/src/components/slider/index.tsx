import * as React from "react";
import { observer } from "mobx-react-lite";
import { Image, Link } from "@ikas/storefront";

import { Position, Slide, SliderProps } from "../__generated__/types";

import {
  ArrowLeft as IconArrowLeft,
  ArrowRight as IconArrowRight,
} from "./components/icons";
import useSlider from "./hooks/useSlider";

import styles from "./style.module.css";

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const { sliderRef, prevSlide, nextSlide, hasPrevSlide, hasNextSlide } =
    useSlider({
      slides,
    });

  const getPositionClass = React.useCallback((slide: Slide) => {
    switch (slide.position) {
      case Position.LEFT:
        return styles.positionLeft;
      case Position.CENTER:
        return styles.positionCenter;
      case Position.RIGHT:
        return styles.positionRight;
      default:
        return styles.positionCenter;
    }
  }, []);

  return (
    <div className={styles.container}>
      <div ref={sliderRef} className={styles.slider}>
        {slides?.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <Image
              layout="fill"
              objectFit="cover"
              alt=""
              image={slide.image}
              useBlur={true}
              sizes="100vw"
            />
            <div className={`${styles.content} ${getPositionClass(slide)}`}>
              <div className={styles.title}>{slide.title}</div>
              {slide.buttonLink && (
                <Link href={slide.buttonLink?.href} passHref>
                  <a className={styles.button}>{slide.buttonLink.label}</a>
                </Link>
              )}
            </div>
            {hasPrevSlide && (
              <div
                className={`${styles.slideButton} ${styles.prevButton}`}
                onClick={prevSlide}
              >
                <IconArrowLeft />
              </div>
            )}
            {hasNextSlide && (
              <div
                className={`${styles.slideButton} ${styles.nextButton}`}
                onClick={nextSlide}
              >
                <IconArrowRight />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Slider);
