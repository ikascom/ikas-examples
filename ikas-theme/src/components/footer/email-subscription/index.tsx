import React from "react";
import { useTranslation } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import useEmailSubscription from "./useEmailSubscription";
import Form from "src/components/components/form";
import Modal from "src/components/components/modal";
import Button from "src/components/components/button";
import Input from "src/components/components/input";
import FormItem from "src/components/components/form/form-item";
import GoogleCaptcha from "src/components/components/google-captcha";

import { NS } from "src/components/footer";

import * as S from "./style";

const EmailSubscription = () => {
  const { t } = useTranslation();
  const {
    pending,
    responseStatus,
    visible,
    onSubmit,
    isModalVisible,
    onModalClose,
    email,
    setEmail,
  } = useEmailSubscription();

  if (!visible) return null;
  return (
    <S.EmailSubscription>
      <S.Title>{t(`${NS}:emailSubscription.title`)}</S.Title>
      <Form onSubmit={onSubmit}>
        <FormItem label={t(`${NS}:emailSubscription.form.email`)}>
          <Input
            required
            type="email"
            value={email}
            placeholder={t(`${NS}:emailSubscription.form.email`)}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FormItem>
        <GoogleCaptcha i18nFileName="footer" />
        <Button block type="submit" size="small" disabled={!email || pending}>
          {t(`${NS}:emailSubscription.form.button`)}
        </Button>
      </Form>
      <Modal visible={isModalVisible} onClose={onModalClose}>
        {responseStatus && (
          <S.ResponseStatus $status={responseStatus}>
            {t(`${NS}:emailSubscription.responseStatus.${responseStatus}`)}
          </S.ResponseStatus>
        )}
      </Modal>
    </S.EmailSubscription>
  );
};

export default observer(EmailSubscription);
