import { IkasProduct, useStore } from "@ikas/storefront";
import React, { useState, useEffect } from "react";

export default function useFavoriteProducts() {
  const store = useStore();
  const [isPending, setPending] = useState(true);
  const [products, setProducts] = useState<IkasProduct[]>([]);

  const getFavoriteProducts = async () => {
    try {
      const result = await store.customerStore.getFavoriteProducts();
      result.forEach((p) => {
        p.selectedVariantValues = p.variants[0].variantValues;
      });
      setProducts(result);
    } catch (error) {
      console.error("Error on getFavoriteProducts");
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    getFavoriteProducts();
  }, []);

  return {
    isPending,
    products,
    getFavoriteProducts,
  };
}
