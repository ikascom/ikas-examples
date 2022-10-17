import React from "react";
import { observer } from "mobx-react-lite";

import { ProductDetailProps } from "src/components/__generated__/types";

import { Title } from "./title";
import { FavoriteButton } from "./favorite-button";
import { Price } from "./price";
import { Variants } from "./variants";
import { AddToCart } from "./add-to-cart";
import { Description } from "./description";
import { ProductOptions } from "./product-options";
import { SocialShare } from "./social-share";
import { ProductAttributes } from "./product-attributes";

import * as S from "./style";

const Detail = (props: ProductDetailProps) => {
  return (
    <S.Wrapper>
      <Title {...props} />
      <FavoriteButton {...props} />
      <Price {...props} />
      <Variants {...props} />
      <ProductOptions {...props} />
      <AddToCart {...props} />
      <ProductAttributes {...props} />
      <Description {...props} />
      <SocialShare {...props} />
    </S.Wrapper>
  );
};

export default observer(Detail);
