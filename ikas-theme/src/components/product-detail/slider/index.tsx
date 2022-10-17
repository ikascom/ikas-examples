import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Image } from "@ikas/storefront";

import { ProductDetailProps } from "src/components/__generated__/types";
import breakpoints, { point } from "src/styles/breakpoints";
import formatImageAspectRatio from "src/utils/formatImageAspectRatio";

import * as S from "./style";

type ActiveImageIdType = string | null;
type ActiveImage = ReturnType<typeof useActiveImage>;

function useActiveImage() {
  const [id, set] = useState<ActiveImageIdType>(null);
  return { id, set };
}

const Slider = (props: ProductDetailProps) => {
  const activeImage = useActiveImage();

  useEffect(() => {
    const mainImageId = props.product.selectedVariant.mainImage?.image?.id;
    mainImageId && activeImage.set(mainImageId);
  }, [props.product.selectedVariant]);

  return (
    <S.SliderWrapper>
      <Thumbnails activeImage={activeImage} {...props} />
      <MainImage activeImage={activeImage} {...props} />
    </S.SliderWrapper>
  );
};

export default observer(Slider);

type ThumbnailsProps = {
  activeImage: ActiveImage;
} & ProductDetailProps;

const Thumbnails = observer((props: ThumbnailsProps) => {
  const { activeImage, product } = props;
  const { width, height } = formatImageAspectRatio(props.imageAspectRatio);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id;
    id && activeImage.set(id);
  };

  return (
    <S.Thumbnails>
      {product.selectedVariant.images?.map((image, index) => (
        <S.Thumbnail
          key={index}
          data-id={image.image?.id}
          $selected={activeImage.id === image.image?.id}
          onClick={onClick}
        >
          <Image
            useBlur
            image={image.image!}
            layout="responsive"
            width={width}
            height={height}
            objectFit="contain"
            sizes="100px"
          />
        </S.Thumbnail>
      ))}
    </S.Thumbnails>
  );
});

type MainImageProps = {
  activeImage: ActiveImage;
} & ProductDetailProps;

const MainImage = observer((props: MainImageProps) => {
  const { product, activeImage } = props;
  const { width, height } = formatImageAspectRatio(props.imageAspectRatio);

  const image = product.selectedVariant.images?.find(
    (image) => image.imageId === activeImage.id
  )?.image;

  if (!image) return null;
  return (
    <S.MainImage>
      <Image
        useBlur
        image={image}
        layout="responsive"
        width={width}
        height={height}
        objectFit="contain"
        sizes={`(max-width: ${breakpoints.lg}) 100vw, ${point.xxl / 2}px`}
      />
    </S.MainImage>
  );
});
