import React from "react";
import { observer } from "mobx-react-lite";
import { IkasBaseStore, Link, useTranslation } from "@ikas/storefront";

import Alert from "src/components/components/alert";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";
import { Container } from "src/components/components/container";
import Button from "src/components/components/button";

import useLogin from "./useLogin";

import * as S from "./style";
import GoogleCaptcha from "../components/google-captcha";

type Props = {};

export const namespace = "login";

function Login(props: Props) {
  const { t } = useTranslation();
  const login = useLogin();
  const { formAlert, onFormAlertClose, form } = login;

  return (
    <Container>
      <S.Wrapper>
        <S.Title>{t(`${namespace}:title`)}</S.Title>
        <LoginFormAlert
          formAlert={formAlert}
          onFormAlertClose={onFormAlertClose}
        />
        <LoginFormComponent {...login} />
        <Footer redirect={form.redirect} />
      </S.Wrapper>
    </Container>
  );
}

export default observer(Login);

type LoginFormAlertProps = {
  formAlert: ReturnType<typeof useLogin>["formAlert"];
  onFormAlertClose: ReturnType<typeof useLogin>["onFormAlertClose"];
};

const LoginFormAlert = observer(
  ({ formAlert, onFormAlertClose }: LoginFormAlertProps) => {
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

type LoginFormProps = ReturnType<typeof useLogin>;

const LoginFormComponent = observer(
  ({ status, isPending, form, onFormSubmit }: LoginFormProps) => {
    const { t } = useTranslation();
    const store = IkasBaseStore.getInstance();

    return (
      <Form onSubmit={onFormSubmit}>
        <FormItem
          label={t(`${namespace}:form.email`)}
          help={form.emailErrorMessage}
          status={status.email}
        >
          <Input
            status={status.email}
            value={form.email}
            onChange={(event) => form.onEmailChange(event.target.value)}
          />
        </FormItem>
        <FormItem
          label={t(`${namespace}:form.password`)}
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
        <GoogleCaptcha i18nFileName="login" />
        <Button block type="submit" loading={isPending} disabled={isPending}>
          {t(`${namespace}:form.login`)}
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
        {t(`${namespace}:noAccount`)}{" "}
        <Link passHref href={`/account/register${redirectHref}`}>
          <a>{t(`${namespace}:createNewAccount`)}</a>
        </Link>
      </div>
      <Link passHref href={`/account/forgot-password${redirectHref}`}>
        <a>{t(`${namespace}:forgetPassword`)}</a>
      </Link>
    </S.Footer>
  );
};
