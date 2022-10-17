import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useTranslation } from "@ikas/storefront";

import Alert from "src/components/components/alert";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";
import { Container } from "src/components/components/container";
import Button from "src/components/components/button";
import SocialLoginButton from "src/components/components/button/social-login";
import Checkbox from "src/components/components/checkbox";
import Row from "src/components/components/grid/row";
import Col from "src/components/components/grid/col";
import GoogleCaptcha from "src/components/components/google-captcha";

import useRegister from "./useRegister";

import FacebookSVG from "src/components/svg/social-login/facebook";
import GoogleSVG from "src/components/svg/social-login/google";

import { RegisterProps } from "../__generated__/types";

import * as S from "./style";
import useRegisterForm from "./useRegisterForm";

export const NS = "register";

const Register = (props: RegisterProps) => {
  const { t } = useTranslation();
  const register = useRegister(props);
  const { formAlert, onFormAlertClose, form } = register;

  return (
    <Container>
      <S.Wrapper>
        <S.Title>{t(`${NS}:title`)}</S.Title>
        <RegisterFormAlert
          formAlert={formAlert}
          onFormAlertClose={onFormAlertClose}
        />
        <RegisterFormComponent {...props} {...register} />
        <Footer redirect={form.redirect} />
      </S.Wrapper>
    </Container>
  );
};

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

export type RegisterFormProps = RegisterProps & ReturnType<typeof useRegister>;

const RegisterFormComponent = observer((props: RegisterFormProps) => {
  const { t } = useTranslation();
  const { status, isPending, form, onFormSubmit } = props;
  const {
    marketingEmailFormItemHelp,
    marketingEmailFormItemStatus,
    onSocialLogin,
    onMarketingEmailCheckboxChange,
  } = useRegisterForm(props);

  return (
    <Form onSubmit={onFormSubmit}>
      <S.SocialLoginWrapper>
        <SocialLoginButton
          color="#fff"
          bgColor="#3a5a98"
          borderColor="#3a5a98"
          lineColor="#000"
          text="Facebook"
          subText={t(`${NS}:form.registerWith`)}
          icon={<FacebookSVG />}
          onClick={() => onSocialLogin("facebook")}
        />
        <SocialLoginButton
          color="#000"
          bgColor="#fff"
          borderColor="#ddd"
          lineColor="#ddd"
          text="Google"
          subText={t(`${NS}:form.registerWith`)}
          icon={<GoogleSVG />}
          onClick={() => onSocialLogin("google")}
        />
      </S.SocialLoginWrapper>
      <Row gutter={[24, 0]}>
        <Col span={12}>
          <FormItem
            label={t(`${NS}:form.firstName`)}
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
            label={t(`${NS}:form.lastName`)}
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
      <GoogleCaptcha i18nFileName="register" />
      <FormItem>
        <Button block type="submit" loading={isPending} disabled={isPending}>
          {t(`${NS}:form.register`)}
        </Button>
      </FormItem>
      {!!props.showMarketingEmailCheckbox && (
        <FormItem
          status={marketingEmailFormItemStatus}
          help={marketingEmailFormItemHelp}
        >
          <Checkbox
            status={marketingEmailFormItemStatus}
            checked={form.isMarketingAccepted}
            onChange={onMarketingEmailCheckboxChange}
          >
            {props.marketingEmailCheckboxText}
          </Checkbox>
        </FormItem>
      )}
    </Form>
  );
});

type FooterProps = {
  redirect?: string | null;
};

const Footer = ({ redirect }: FooterProps) => {
  const { t } = useTranslation();

  const redirectHref = redirect ? "?redirect=" + redirect : "";
  return (
    <S.Footer>
      <div>
        {t(`${NS}:alreadyHaveAccount`)}{" "}
        <Link passHref href={`/account/login${redirectHref}`}>
          <a>{t(`${NS}:login`)}</a>
        </Link>
      </div>
      <Link passHref href={`/account/forgot-password${redirectHref}`}>
        <a>{t(`${NS}:forgotPassword`)}</a>
      </Link>
    </S.Footer>
  );
};
