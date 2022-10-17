import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProductList } from "@ikas/storefront";

import Pagination from "src/components/components/pagination";

type Props = {
  productList: IkasProductList;
};

const ProductListPagination = ({ productList }: Props) => {
  const getPage = async (page: number) => {
    if (productList.isLoading) return;
    await productList.getPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Pagination
      page={productList.page}
      pageCount={productList.pageCount}
      count={productList.count}
      hasNext={productList.hasNext}
      hasPrev={productList.hasPrev}
      loading={productList.isLoading}
      getPage={getPage}
    />
  );
};

export default observer(ProductListPagination);
