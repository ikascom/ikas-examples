import React from "react";
import { observer } from "mobx-react-lite";
import { IkasBrand, IkasCategory, IkasProductList } from "@ikas/storefront";

import { Container } from "src/components/components/container";
import Left from "./left";
import Right from "./right";

import * as S from "./style";

export type ProductListProps = {
  NS: string;
  source: "brand" | "category" | "search";
  category?: IkasCategory;
  brand?: IkasBrand;
  productList: IkasProductList;
};

function ProductList(props: ProductListProps) {
  return (
    <S.ProductList>
      <Container>
        <S.Wrapper>
          <Left />
          <Right {...props} />
        </S.Wrapper>
      </Container>
    </S.ProductList>
  );
}

export default observer(ProductList);
