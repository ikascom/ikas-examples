import React, { useState } from "react";
import { IkasBaseStore, IkasProduct } from "@ikas/storefront";

export function useAddToCart() {
  const [loading, setLoading] = useState(false);

  const addToCart = async (product: IkasProduct, quantity: number) => {
    const store = IkasBaseStore.getInstance();

    const item = store.cartStore.cart?.items.find(
      (item) => item.variant.id === product.selectedVariant.id
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
