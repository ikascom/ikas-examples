import { observer } from "mobx-react-lite";
import React from "react";
import { ProductDetailProps } from "src/components/__generated__/types";

import * as S from "../style";

export const Price = observer((props: ProductDetailProps) => {
  const { price } = props.product.selectedVariant;
  return (
    <S.PriceWrapper>
      {price.hasDiscount && (
        <S.SellPrice>{price.formattedSellPrice}</S.SellPrice>
      )}
      <S.Price>{price.formattedFinalPrice}</S.Price>
    </S.PriceWrapper>
  );
});

Price.displayName = "Price";
