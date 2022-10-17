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
import useForgotPassword from "./useForgotPassword";

import * as S from "./style";

export const NS = "forgot-password";

type Props = {};

const ForgotPassword = (props: Props) => {
  const { t } = useTranslation();
  const forgotPassword = useForgotPassword();
  const { formAlert, onFormAlertClose, form } = forgotPassword;

  return (
    <Container>
      <S.Wrapper>
        <S.Title>{t(`${NS}:title`)}</S.Title>
        <ForgotPasswordFormAlert
          formAlert={formAlert}
          onFormAlertClose={onFormAlertClose}
        />
        <ForgotPasswordFormComponent {...forgotPassword} />
        <Footer redirect={form.redirect} />
      </S.Wrapper>
    </Container>
  );
};

export default observer(ForgotPassword);

type ForgotPasswordFormAlertProps = {
  formAlert: ReturnType<typeof useForgotPassword>["formAlert"];
  onFormAlertClose: ReturnType<typeof useForgotPassword>["onFormAlertClose"];
};

const ForgotPasswordFormAlert = observer(
  ({ formAlert, onFormAlertClose }: ForgotPasswordFormAlertProps) => {
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

type ForgotPasswordFormProps = ReturnType<typeof useForgotPassword>;

const ForgotPasswordFormComponent = observer(
  ({ status, isPending, form, onFormSubmit }: ForgotPasswordFormProps) => {
    const { t } = useTranslation();

    return (
      <Form onSubmit={onFormSubmit}>
        <FormItem
          label={t(`${NS}:form.email`)}
          help={form.emailErrorMessage}
          status={status.email}
        >
          <Input
            status={status.email}
            value={form.email}
            onChange={(event) => form.onEmailChange(event.target.value)}
          />
        </FormItem>

        <GoogleCaptcha i18nFileName="forgot-password" />
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
