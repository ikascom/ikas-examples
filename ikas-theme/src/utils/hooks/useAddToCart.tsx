import React, { useState } from "react";
import { IkasProduct, useStore } from "@ikas/storefront";

export function useAddToCart() {
  const [loading, setLoading] = useState(false);

  const addToCart = async (product: IkasProduct, quantity: number) => {
    const store = useStore();

    const item = store.cartStore.findExistingItem(
      product.selectedVariant,
      product
    );

    setLoading(true);
    if (item) {
      await store.cartStore.changeItemQuantity(item, item.quantity + quantity);
    } else {
      await store.cartStore.addItem(product.selectedVariant, product, quantity);
    }
    setLoading(false);
  };

  return {
    loading,
    addToCart,
  };
}
