import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation, IkasProduct } from "@ikas/storefront";

import { NS } from "src/components/product-detail";
import ModalLoginRequired from "src/components/product-detail/detail/components/modal-login-required";
import ModalBackInStock from "./modal-back-in-stock";
import { useBackInStockStore } from "./backInStockStore";

type ModalBackInStockProps = {
  product: IkasProduct;
};

export const BackInStock = observer(({ product }: ModalBackInStockProps) => {
  const { t } = useTranslation();
  const store = useBackInStockStore();

  const modalLoginText = (key: string) =>
    t(`${NS}:detail.addToCart.loginModal.${key}`);

  if (!store.visibleModal) return null;
  return (
    <>
      {store.visibleModal === "loginRequired" && (
        <ModalLoginRequired
          isModalVisible={true}
          title={modalLoginText("title")}
          text={modalLoginText("text")}
          loginButtonText={modalLoginText("loginButtonText")}
          noAccountText={modalLoginText("noAccountText")}
          redirectUrl={product.href}
          onClose={() => (store.visibleModal = null)}
        />
      )}
      {store.visibleModal === "backInStock" && (
        <ModalBackInStock
          isModalVisible
          product={product}
          onClose={() => (store.visibleModal = null)}
        />
      )}
    </>
  );
});
