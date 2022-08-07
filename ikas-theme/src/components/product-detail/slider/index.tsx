import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Image } from "@ikas/storefront";

import SliderStore from "src/store/slider-store";

import { ProductDetailProps } from "src/components/__generated__/types";
import breakpoints from "src/styles/break-points";

import * as S from "./style";

function Slider(props: ProductDetailProps) {
  return (
    <S.SliderWrapper>
      <Thumbnails {...props} />
      <MainImage {...props} />
    </S.SliderWrapper>
  );
}

export default observer(Slider);

const Thumbnails = observer((props: ProductDetailProps) => {
  const sliderStore = SliderStore.getInstance();
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    sliderStore.activeImageId = id;
  };

  useEffect(() => {
    // set mainImage on initial load
    sliderStore.activeImageId =
      props.product.selectedVariant.mainImage?.image?.id;
  }, []);

  return (
    <S.Thumbnails>
      {props.product.selectedVariant.images?.map((image, index) => (
        <S.Thumbnail
          key={index}
          data-id={image.image?.id}
          $selected={sliderStore.activeImageId === image.image?.id}
          onClick={onClick}
        >
          <Image
            image={image.image!}
            layout="intrinsic"
            width={96}
            height={113}
            objectFit="contain"
            sizes={`(min-width: ${breakpoints.sm}) ${breakpoints.sm}, (min-width: ${breakpoints.md}) ${breakpoints.md}, (min-width: ${breakpoints.lg}) calc(${breakpoints.lg} / 2), (min-width: ${breakpoints.xl}) calc(${breakpoints.xl} / 2), (min-width: ${breakpoints.xxl}) calc(${breakpoints.xxl} / 2), 100vw`}
          />
        </S.Thumbnail>
      ))}
    </S.Thumbnails>
  );
});

const MainImage = observer((props: ProductDetailProps) => {
  const sliderStore = SliderStore.getInstance();
  const image = props.product.selectedVariant.images?.find(
    (image) => image.imageId === sliderStore.activeImageId
  )?.image;

  if (!image) return null;
  return (
    <S.MainImage>
      <Image
        useBlur
        image={image}
        layout="responsive"
        width={960}
        height={1130}
        objectFit="contain"
        sizes={`(min-width: ${breakpoints.sm}) ${breakpoints.sm}, (min-width: ${breakpoints.md}) ${breakpoints.md}, (min-width: ${breakpoints.lg}) calc(${breakpoints.lg} / 2), (min-width: ${breakpoints.xl}) calc(${breakpoints.xl} / 2), (min-width: ${breakpoints.xxl}) calc(${breakpoints.xxl} / 2), 100vw`}
      />
    </S.MainImage>
  );
});
