import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProduct, useTranslation } from "@ikas/storefront";

import AlertComponent from "src/components/components/alert";

import Modal from "src/components/components/modal";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";
import Button from "src/components/components/button";

import useModalBackInStock from "./useModalBackInStock";

import { NS } from "src/components/product-detail";

import * as S from "./style";

type Props = {
  isModalVisible: boolean;
  product: IkasProduct;
  onClose: () => void;
};

const ModalBackInStock = ({ isModalVisible, product, onClose }: Props) => {
  const { t } = useTranslation();
  const {
    pending,
    model,
    formAlert,
    status,
    validator,
    onFormAlertClose,
    onSubmit,
  } = useModalBackInStock({ product });
  const SUB_NS = `${NS}:detail.addToCart.backInStockModal`;
  const i18nText = (key: string) => t(`${SUB_NS}.${key}`);

  return (
    <Modal visible={isModalVisible} title={i18nText("title")} onClose={onClose}>
      <S.Text>{i18nText("text")}</S.Text>
      {formAlert && (
        <AlertComponent
          closable
          status={formAlert.status}
          text={formAlert.text}
          title={formAlert.title}
          onClose={onFormAlertClose}
        />
      )}
      {!formAlert && (
        <Form onSubmit={onSubmit}>
          <FormItem
            help={validator.results.email.errorMessage}
            status={status.email}
          >
            <Input
              type="text"
              placeholder={i18nText("form.email")}
              value={model.email}
              status={status.email}
              onChange={(event) => (model.email = event.target.value)}
            />
          </FormItem>
          <Button block loading={pending} disabled={pending}>
            {i18nText("form.submit")}
          </Button>
        </Form>
      )}
    </Modal>
  );
};

export default observer(ModalBackInStock);
