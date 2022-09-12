import React from "react";
import { observer } from "mobx-react-lite";

import { ProductListProps } from "..";

import Product from "./product";

import * as S from "./style";
import { Header } from "./header";
import { Pagination } from "../components/pagination";

const Right = observer(({ productList }: ProductListProps) => {
  return (
    <S.Main>
      <Header productList={productList} />
      <S.Products>
        {productList.data.map((product) => (
          <Product key={product.selectedVariant.id} product={product} />
        ))}
      </S.Products>
      <Pagination productList={productList} />
    </S.Main>
  );
});

export default Right;
