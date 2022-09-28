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

    let result: IkasCartOperationResult;

    setLoading(true);
    if (item) {
      result = await store.cartStore.changeItemQuantity(
        item,
        item.quantity + quantity
      );
    } else {
      result = await store.cartStore.addItem(
        product.selectedVariant,
        product,
        quantity
      );
    }
    setLoading(false);

    if (result.response?.graphQLErrors) {
      maxQuantityPerCartHandler({
        productName: product.name,
        errors: result.response?.graphQLErrors,
      });
    }
  };

  return {
    loading,
    addToCart,
  };
}

import { GraphQLError } from "graphql";
import UIStore from "src/store/ui-store";
import { IkasCartOperationResult } from "@ikas/storefront/build/store/cart";

type MaxQuantityPerCartHandlerProps = {
  productName: string;
  errors?: readonly GraphQLError[];
};

export const maxQuantityPerCartHandler = ({
  productName,
  errors,
}: MaxQuantityPerCartHandlerProps) => {
  if (!errors?.length) return;
  const uiStore = UIStore.getInstance();
  const isMaxQuantityPerCartError = errors?.findIndex(
    (error) => error.extensions.code === "MAX_QUANTITY_PER_CART_LIMIT_REACHED"
  );

  if (isMaxQuantityPerCartError !== -1) {
    uiStore.maxQuantityPerCartProductErrorModal = {
      visible: true,
      productName,
    };
  }
};
