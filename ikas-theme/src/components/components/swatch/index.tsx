import React from "react";
import { IkasImage } from "@ikas/storefront";

import * as S from "./style";

type SwatchProps = {
  selected: boolean;
  title: string;
  image?: IkasImage | null;
  colorCode?: string | null;
  onClick: () => void;
};

export const Swatch = ({
  title,
  selected,
  colorCode,
  image,
  onClick,
}: SwatchProps) => {
  if (image?.id) {
    return (
      <S.ImageSwatch title={title} onClick={onClick}>
        <S.ImageSwatchImg src={image?.thumbnailSrc} $isSelected={selected} />
      </S.ImageSwatch>
    );
  }

  return (
    <S.ColorSwatch
      title={title}
      $isSelected={selected}
      $color={colorCode || ""}
      onClick={onClick}
    />
  );
};
