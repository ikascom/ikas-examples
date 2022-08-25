import React from "react";
import { IkasBaseStore, IkasProduct, useTranslation } from "@ikas/storefront";
import { NS } from "src/components/product-detail";
import { useAddToCart } from "src/utils/hooks/useAddToCart";
import { useRouter } from "next/router";

type Props = {
  product: IkasProduct;
  quantity: number;
};

// type ButtonState = "disabled" | "backInStockReminder" | "backInStockReminderSaved";

export default function useAddToCartButton({ product, quantity }: Props) {
  const { t } = useTranslation();
  const router = useRouter();
  const { loading, addToCart } = useAddToCart();
  const store = IkasBaseStore.getInstance();
  // const state: ButtonState =
  const {
    isBackInStockEnabled,
    isBackInStockReminderSaved,
    isBackInStockCustomerLoginRequired,
  } = product.selectedVariant;
  const hasStock = product.hasStock;
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
    console.log(product.isAddToCartEnabled);
    // store.cartStore.checkoutUrl && router.push(store.cartStore.checkoutUrl);
    return;
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
