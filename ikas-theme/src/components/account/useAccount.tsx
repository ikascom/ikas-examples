import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IkasThemeJsonPageType, useStore } from "@ikas/storefront";

export default function useAccount() {
  const [hasCustomer, setHasCustomer] = useState(false);
  const router = useRouter();
  const store = useStore();

  const isAccount = store.currentPageType === IkasThemeJsonPageType.ACCOUNT;
  const isAddresses = store.currentPageType === IkasThemeJsonPageType.ADDRESSES;
  const isOrders = store.currentPageType === IkasThemeJsonPageType.ORDERS;
  const isOrderDetail =
    store.currentPageType === IkasThemeJsonPageType.ORDER_DETAIL;
  const isFavoriteProducts =
    store.currentPageType === IkasThemeJsonPageType.FAVORITE_PRODUCTS;

  useEffect(() => {
    store.customerStore.waitUntilInitialized().then(() => {
      if (!store.customerStore.customer) {
        router.push("/account/login");
        setHasCustomer(false);
      } else {
        setHasCustomer(true);
      }
    });
  }, [store.customerStore.customer]);

  return {
    isAccount,
    isAddresses,
    isOrders,
    isOrderDetail,
    isFavoriteProducts,
    hasCustomer,
  };
}
