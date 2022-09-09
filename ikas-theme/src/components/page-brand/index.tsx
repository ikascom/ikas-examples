import React from "react";
import { observer } from "mobx-react-lite";

import ProductList from "../product-list";
import { PageBrandProps } from "../__generated__/types";

const NS = "page-brand";

function PageBrand(props: PageBrandProps) {
  return (
    <ProductList
      NS={NS}
      brand={props.brand}
      productList={props.productList}
      source="brand"
    />
  );
}

export default observer(PageBrand);
