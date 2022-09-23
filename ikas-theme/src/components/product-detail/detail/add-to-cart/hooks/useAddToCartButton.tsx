import React from "react";
import { IkasProduct, useTranslation } from "@ikas/storefront";

import useBackInStock from "./useBackInStock";
import { useAddToCart } from "src/utils/hooks/useAddToCart";
import { ProductOptionsStore } from "src/components/product-detail/detail/product-options";
import { useBackInStockStore } from "../back-in-stock/backInStockStore";

import { NS } from "src/components/product-detail";

type Props = {
  product: IkasProduct;
  quantity: number;
};

export default function useAddToCartButton({ product, quantity }: Props) {
  const { t } = useTranslation();
  const backInStockStore = useBackInStockStore();
  const { loading: addToCartLoading, addToCart } = useAddToCart();
  const {
    isBackInStockEnabled,
    isBackInStockReminderSaved,
    handleBackInStockClick,
  } = useBackInStock({ product });

  const hasStock = product.selectedVariant.hasStock;
  const loading = addToCartLoading || backInStockStore.pending;
  const disabled = hasStock
    ? addToCartLoading
    : !isBackInStockEnabled ||
      isBackInStockReminderSaved ||
      backInStockStore.pending;

  const buttonText = hasStock
    ? t(`${NS}:detail.addToCart.text`)
    : isBackInStockEnabled
    ? isBackInStockReminderSaved
      ? t(`${NS}:detail.addToCart.backInStockReminderSaved`)
      : t(`${NS}:detail.addToCart.remindOnBackInStock`)
    : t(`${NS}:detail.addToCart.soldOut`);

  const buttonState: "addToCart" | "backInStock" =
    isBackInStockEnabled && !hasStock ? "backInStock" : "addToCart";

  const handleAddToCartClick = async () => {
    if (!product.isAddToCartEnabled) {
      ProductOptionsStore.getInstance().showOptionError = true;
      return;
    }
    addToCart(product, quantity);
  };

  const onButtonClick =
    buttonState === "backInStock"
      ? handleBackInStockClick
      : handleAddToCartClick;

  return {
    loading,
    hasStock,
    isBackInStockReminderSaved,
    disabled,
    buttonState,
    buttonText,
    onButtonClick,
  };
}
