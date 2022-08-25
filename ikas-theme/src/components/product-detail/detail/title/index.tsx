import React from "react";
import { ProductDetailProps } from "src/components/__generated__/types";
import * as S from "../style";

export const Title = (props: ProductDetailProps) => {
  return <S.Title>{props.product.name}</S.Title>;
};
