import React, { useEffect } from "react";
import { IkasProductList } from "@ikas/storefront";

import UIStore from "src/store/ui-store";

export default function useProductList(productList: IkasProductList) {
  const uiStore = UIStore.getInstance();

  useEffect(() => {
    productList.searchKeyword = uiStore.searchKeyword;
  }, [uiStore.searchKeyword]);
}
