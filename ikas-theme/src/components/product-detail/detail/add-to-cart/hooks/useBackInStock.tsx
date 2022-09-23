import React from "react";
import { IkasProduct, useStore } from "@ikas/storefront";
import { useBackInStockStore } from "../back-in-stock/backInStockStore";

type Props = {
  product: IkasProduct;
};

export default function useBackInStock({ product }: Props) {
  const store = useStore();
  const backInStockStore = useBackInStockStore();

  const {
    isBackInStockEnabled,
    isBackInStockReminderSaved,
    isBackInStockCustomerLoginRequired,
  } = product.selectedVariant;

  const handleBackInStockClick = async () => {
    const isCustomerExist = !!store.customerStore.customer?.id;

    if (!isBackInStockCustomerLoginRequired && !isCustomerExist) {
      backInStockStore.visibleModal = "backInStock";
      return;
    }

    if (isBackInStockCustomerLoginRequired && !isCustomerExist) {
      backInStockStore.visibleModal = "loginRequired";
      return;
    }

    if (isCustomerExist) {
      backInStockStore.pending = true;
      const email = store.customerStore.customer?.email;
      if (email) await product.selectedVariant.saveBackInStockReminder(email);
      backInStockStore.pending = false;
    }
  };

  return {
    isBackInStockEnabled,
    isBackInStockReminderSaved,
    isBackInStockCustomerLoginRequired,
    handleBackInStockClick,
  };
}
