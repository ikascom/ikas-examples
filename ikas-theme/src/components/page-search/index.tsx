import React from "react";
import { observer } from "mobx-react-lite";

import ProductList from "../product-list";
import { PageSearchProps } from "../__generated__/types";

const NS = "page-search";

const PageSearch = (props: PageSearchProps) => {
  return (
    <ProductList NS={NS} source="search" productList={props.productList} />
  );
};

export default observer(PageSearch);
