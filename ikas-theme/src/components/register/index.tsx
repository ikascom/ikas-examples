import React from "react";
import { observer } from "mobx-react-lite";
import { Link, useTranslation } from "@ikas/storefront";

import Alert from "src/components/components/alert";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";
import { Container } from "src/components/components/container";
import Button from "src/components/components/button";

import * as S from "./style";
import useRegister from "./useRegister";
import Row from "../components/grid/row";
import Col from "../components/grid/col";
import GoogleCaptcha from "../components/google-captcha";

type Props = {};

export const namespace = "register";

function Register(props: Props) {
  const { t } = useTranslation();
  const register = useRegister();
  const { formAlert, onFormAlertClose, form } = register;

  return (
    <Container>
      <S.Wrapper>
        <S.Title>{t(`${namespace}:title`)}</S.Title>
        <RegisterFormAlert
          formAlert={formAlert}
          onFormAlertClose={onFormAlertClose}
        />
        <RegisterFormComponent {...register} />
        <Footer redirect={form.redirect} />
      </S.Wrapper>
    </Container>
  );
}

export default observer(Register);

type RegisterFormAlertProps = {
  formAlert: ReturnType<typeof useRegister>["formAlert"];
  onFormAlertClose: ReturnType<typeof useRegister>["onFormAlertClose"];
};

const RegisterFormAlert = observer(
  ({ formAlert, onFormAlertClose }: RegisterFormAlertProps) => {
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

type RegisterFormProps = ReturnType<typeof useRegister>;

const RegisterFormComponent = observer(
  ({ status, isPending, form, onFormSubmit }: RegisterFormProps) => {
    const { t } = useTranslation();

    return (
      <Form onSubmit={onFormSubmit}>
        <Row gutter={[24, 0]}>
          <Col span={12}>
            <FormItem
              label={t(`${namespace}:form.firstName`)}
              help={form.firstNameErrorMessage}
              status={status.firstName}
            >
              <Input
                status={status.firstName}
                value={form.firstName}
                onChange={(event) => form.onFirstNameChange(event.target.value)}
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={t(`${namespace}:form.lastName`)}
              help={form.lastNameErrorMessage}
              status={status.lastName}
            >
              <Input
                status={status.lastName}
                value={form.lastName}
                onChange={(event) => form.onLastNameChange(event.target.value)}
              />
            </FormItem>
          </Col>
        </Row>
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
        <GoogleCaptcha i18nFileName="register" />
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
        {t(`${namespace}:alreadyHaveAccount`)}{" "}
        <Link passHref href={`/account/login${redirectHref}`}>
          <a>{t(`${namespace}:login`)}</a>
        </Link>
      </div>
      <Link passHref href={`/account/forgot-password${redirectHref}`}>
        <a>{t(`${namespace}:forgetPassword`)}</a>
      </Link>
    </S.Footer>
  );
};
