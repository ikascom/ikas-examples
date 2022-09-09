import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "@ikas/storefront";

import { ProductListProps } from "..";

import Product from "./product";
import Sort from "./sort";

import * as S from "./style";

function Right({ NS, productList }: ProductListProps) {
  const { t } = useTranslation();

  return (
    <S.Main>
      <S.Header>
        <S.TotalProductCount>
          {t(`${NS}:productList.totalProductCount`, {
            count: productList.count,
          })}
        </S.TotalProductCount>
        <Sort NS={NS} productList={productList} />
      </S.Header>
      <S.Products>
        {productList.data.map((product) => (
          <Product key={product.selectedVariant.id} product={product} />
        ))}
      </S.Products>
    </S.Main>
  );
}

export default observer(Right);
