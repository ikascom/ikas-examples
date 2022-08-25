import React from "react";
import { observer } from "mobx-react-lite";

import { Container } from "../components/container";
import { ProductDetailProps } from "../__generated__/types";
import Detail from "./detail";
import Slider from "./slider";

import * as S from "./style";

export const NS = "product-detail"; // for translation (i18n)

function ProductDetail(props: ProductDetailProps) {
  return (
    <S.ProductDetail>
      <Container>
        <S.InnerContainer>
          <Slider {...props} />
          <Detail {...props} />
        </S.InnerContainer>
      </Container>
    </S.ProductDetail>
  );
}

export default observer(ProductDetail);
