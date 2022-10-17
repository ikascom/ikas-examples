import React from "react";
import { observer } from "mobx-react-lite";
import UIStore from "src/store/ui-store";
import Modal from "../modal";
import { useTranslation } from "@ikas/storefront";

const MaxQuantityPerCartModal = () => {
  const uiStore = UIStore.getInstance();
  const { t } = useTranslation();
  const onClose = () => {
    uiStore.maxQuantityPerCartProductErrorModal = {
      visible: false,
      productName: "",
    };
  };
  return (
    <Modal
      visible={uiStore.maxQuantityPerCartProductErrorModal.visible}
      title={t(`maxQuantityPerCartModal.title`)}
      onClose={onClose}
    >
      <p>
        {t("maxQuantityPerCartModal.text", {
          productName: uiStore.maxQuantityPerCartProductErrorModal.productName,
        })}
      </p>
    </Modal>
  );
};

export default observer(MaxQuantityPerCartModal);
