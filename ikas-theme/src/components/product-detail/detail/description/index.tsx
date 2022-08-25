import React from "react";
import { useTranslation } from "@ikas/storefront";

import { ProductDetailProps } from "src/components/__generated__/types";
import { NS } from "src/components/product-detail";

import * as S from "../style";

export const Description = (props: ProductDetailProps) => {
  const { t } = useTranslation();
  if (!props.product.description) return null;
  return (
    <S.DescriptionWrapper>
      <S.DescriptionTitle>
        {t(`${NS}:detail.description.title`)}
      </S.DescriptionTitle>
      <S.Description
        dangerouslySetInnerHTML={{ __html: props.product.description }}
      />
    </S.DescriptionWrapper>
  );
};
