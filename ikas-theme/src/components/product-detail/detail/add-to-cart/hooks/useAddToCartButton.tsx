import React from "react";
import { useRouter } from "next/router";
import { IkasProduct, useStore, useTranslation } from "@ikas/storefront";

import { NS } from "src/components/product-detail";
import { useAddToCart } from "src/utils/hooks/useAddToCart";

type Props = {
  product: IkasProduct;
  quantity: number;
};

export default function useAddToCartButton({ product, quantity }: Props) {
  const store = useStore();
  const router = useRouter();
  const { t } = useTranslation();
  const { loading, addToCart } = useAddToCart();

  const {
    isBackInStockEnabled,
    isBackInStockReminderSaved,
    isBackInStockCustomerLoginRequired,
  } = product.selectedVariant;
  const hasStock = product.selectedVariant.hasStock;
  const disabled = hasStock
    ? !product.isAddToCartEnabled || loading
    : !isBackInStockEnabled || loading;

  const buttonText = hasStock
    ? t(`${NS}:detail.addToCart.text`)
    : isBackInStockEnabled
    ? isBackInStockReminderSaved
      ? t(`${NS}:detail.addToCart.backInStockReminderSaved`)
      : t(`${NS}:detail.addToCart.remindOnBackInStock`)
    : t(`${NS}:detail.addToCart.soldOut`);

  const showBackInStockIcon =
    !hasStock && isBackInStockEnabled && !isBackInStockReminderSaved;
  const showBackInStockReminderSavedIcon =
    !hasStock && isBackInStockEnabled && isBackInStockReminderSaved;

  const handleAddToCartClick = async () => {
    if (showBackInStockIcon) {
      const customer = store.customerStore.customer;
      if (isBackInStockCustomerLoginRequired && !customer?.id) {
        router.push("/account/login?redirect=");
      }
    }

    addToCart(product, quantity);
  };

  return {
    loading,
    hasStock,
    buttonText,
    disabled,
    showBackInStockIcon,
    showBackInStockReminderSavedIcon,
    handleAddToCartClick,
  };
}
