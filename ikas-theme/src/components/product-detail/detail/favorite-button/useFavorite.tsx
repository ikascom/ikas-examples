import { IkasProduct, useStore } from "@ikas/storefront";
import { useEffect, useState } from "react";

type Props = {
  productId: IkasProduct["id"];
};

export default function useFavorite({ productId }: Props) {
  const store = useStore();
  const [pending, setPending] = useState(false);
  const [showLoginModal, setLoginModal] = useState(false);
  const [isProductFavorite, setIsProductFavorite] = useState(false);

  useEffect(() => {
    if (store.customerStore.customer) fetchIsProductFavorite();
  }, [store.customerStore.customer]);

  const closeLoginModal = () => setLoginModal(false);

  const fetchIsProductFavorite = async () => {
    try {
      setPending(true);
      const result = await store.customerStore.isProductFavorite(productId);
      setIsProductFavorite(result);
    } finally {
      setPending(false);
    }
  };

  const toggleFavorite = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!store.customerStore.customer) {
      setLoginModal(true);
      return;
    }

    try {
      setPending(true);
      if (isProductFavorite) {
        await store.customerStore.removeProductFromFavorites(productId);
      } else {
        await store.customerStore.addProductToFavorites(productId);
      }
      fetchIsProductFavorite();
    } finally {
      setPending(false);
    }
  };

  return {
    pending,
    showLoginModal,
    closeLoginModal,
    isProductFavorite,
    toggleFavorite,
  };
}
