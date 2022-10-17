import React from "react";
import { observer } from "mobx-react-lite";
import { Link, useTranslation } from "@ikas/storefront";

import Alert from "src/components/components/alert";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";
import { Container } from "src/components/components/container";
import Button from "src/components/components/button";

import GoogleCaptcha from "../components/google-captcha";
import useRecoverPassword from "./useRecoverPassword";

import * as S from "./style";

export const NS = "recover-password";

const RecoverPassword = () => {
  const { t } = useTranslation();
  const recoverPassword = useRecoverPassword();
  const { formAlert, onFormAlertClose, form } = recoverPassword;

  return (
    <Container>
      <S.Wrapper>
        <S.Title>{t(`${NS}:title`)}</S.Title>
        <RecoverPasswordFormAlert
          formAlert={formAlert}
          onFormAlertClose={onFormAlertClose}
        />
        <RecoverPasswordFormComponent {...recoverPassword} />
        <Footer redirect={form.redirect} />
      </S.Wrapper>
    </Container>
  );
};

export default observer(RecoverPassword);

type RecoverPasswordFormAlertProps = {
  formAlert: ReturnType<typeof useRecoverPassword>["formAlert"];
  onFormAlertClose: ReturnType<typeof useRecoverPassword>["onFormAlertClose"];
};

const RecoverPasswordFormAlert = observer(
  ({ formAlert, onFormAlertClose }: RecoverPasswordFormAlertProps) => {
    if (!formAlert) return null;
    return (
      <Alert
        closable
        status={formAlert.status}
        title={formAlert.title}
        text={formAlert.text}
        onClose={onFormAlertClose}
      />
    );
  }
);

type RecoverPasswordFormProps = ReturnType<typeof useRecoverPassword>;

const RecoverPasswordFormComponent = observer(
  ({ status, isPending, form, onFormSubmit }: RecoverPasswordFormProps) => {
    const { t } = useTranslation();

    return (
      <Form onSubmit={onFormSubmit}>
        <FormItem
          label={t(`${NS}:form.password`)}
          help={form.passwordErrorMessage}
          status={status.password}
        >
          <Input
            type="password"
            status={status.password}
            value={form.password}
            onChange={(event) => form.onPasswordChange(event.target.value)}
          />
        </FormItem>
        <FormItem
          label={t(`${NS}:form.passwordAgain`)}
          help={form.passwordAgainErrorMessage}
          status={status.passwordAgain}
        >
          <Input
            type="password"
            status={status.passwordAgain}
            value={form.passwordAgain}
            onChange={(event) => form.onPasswordAgainChange(event.target.value)}
          />
        </FormItem>

        <GoogleCaptcha i18nFileName="recover-password" />
        <Button block type="submit" loading={isPending} disabled={isPending}>
          {t(`${NS}:form.submit`)}
        </Button>
      </Form>
    );
  }
);

type FooterProps = {
  redirect?: string | null;
};

const Footer = ({ redirect }: FooterProps) => {
  const { t } = useTranslation();

  const redirectHref = redirect ? "?redirect=" + redirect : "";
  return (
    <S.Footer>
      <div>
        {t(`${NS}:noAccount`)}{" "}
        <Link passHref href={`/account/register${redirectHref}`}>
          <a>{t(`${NS}:createNewAccount`)}</a>
        </Link>
      </div>
      <div>
        {t(`${NS}:hasAccount`)}{" "}
        <Link passHref href={`/account/login${redirectHref}`}>
          <a>{t(`${NS}:loginHere`)}</a>
        </Link>
      </div>
    </S.Footer>
  );
};
