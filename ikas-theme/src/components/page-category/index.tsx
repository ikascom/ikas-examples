import React from "react";
import { observer } from "mobx-react-lite";

import ProductList from "../product-list";
import { PageCategoryProps } from "../__generated__/types";

const NS = "page-category";

const PageCategory = (props: PageCategoryProps) => {
  return (
    <ProductList
      NS={NS}
      category={props.category}
      productList={props.productList}
      source="category"
    />
  );
};

export default observer(PageCategory);
