import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "@ikas/storefront";

// Types
import { ProductReviewsProps } from "../__generated__/types";

// Components
import { Container } from "src/components/components/container";
import Detail from "./detail";

// Styles
import * as S from "./style";

export const NS = "product-reviews"; // for translation (i18n)

const ProductReviews = (props: ProductReviewsProps) => {
  const { t } = useTranslation();

  return (
    <S.ProductReviews>
      <Container>
        <S.Wrapper>
          <S.Title>{t(`${NS}:title`)}</S.Title>
          <Detail {...props} />
        </S.Wrapper>
      </Container>
    </S.ProductReviews>
  );
};

export default observer(ProductReviews);
