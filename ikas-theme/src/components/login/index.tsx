import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import {
  GoogleCaptcha,
  IkasBaseStore,
  LoginForm,
  useTranslation,
} from "@ikas/storefront";

import Alert from "src/components/components/alert";
import Form from "src/components/components/form";
import FormItem from "src/components/components/form/form-item";
import Input from "src/components/components/input";
import { Container } from "src/components/components/container";
import Button from "src/components/components/button";

type Props = {
  title: string;
  description?: string;
};

function Login(props: Props) {
  const namespace = "login-form";
  const { t } = useTranslation();
  const [loginForm] = React.useState(
    new LoginForm({
      message: {
        requiredRule: t(`${namespace}:formMessage.requiredRule`),
        emailRule: t(`${namespace}:formMessage.emailRule`),
        minRule: t(`${namespace}:formMessage.minRule`),
      },
    })
  );

  const router = useRouter();
  const [formAlert, setFormAlert] = React.useState<any>();
  const [isPending, setPending] = React.useState(false);
  const store = IkasBaseStore.getInstance();

  const onFormSubmit = async () => {
    if (isPending) return;

    try {
      setPending(true);
      const response = await loginForm.login();
      if (response.isFormError) return;
      if (!response.isSuccess) {
        setFormAlert({
          status: "error",
          title: t(`${namespace}:formAlert.unsuccessTitle`),
          text: t(`${namespace}:formAlert.unsuccessText`),
        });
        return;
      }

      setFormAlert({
        status: "success",
        title: t(`${namespace}:formAlert.successTitle`),
        text: t(`${namespace}:formAlert.successText`),
      });

      setTimeout(() => {
        if (loginForm.redirect) {
          router.push(decodeURIComponent(loginForm.redirect));
        } else {
          router.push("/account");
        }
      }, 1000);
    } catch {
      setFormAlert({
        status: "error",
        title: t(`${namespace}:formAlert.errorTitle`),
        text: t(`${namespace}:formAlert.errorText`),
      });
    } finally {
      setPending(false);
    }
  };

  const emailStatus = loginForm.emailErrorMessage ? "error" : undefined;
  const passwordStatus = loginForm.passwordErrorMessage ? "error" : undefined;

  return (
    <Container>
      <div className="my-10 max-w-[500px] mx-auto">
        {formAlert && (
          <Alert
            closable
            status={formAlert.status}
            title={formAlert.title}
            text={formAlert.text}
            onClose={() => setFormAlert(undefined)}
          />
        )}

        <Form onSubmit={onFormSubmit}>
          <FormItem
            label={t(`${namespace}:form.email`)}
            help={loginForm.emailErrorMessage}
            status={emailStatus}
          >
            <Input
              status={emailStatus}
              value={loginForm.email}
              onChange={(event) => loginForm.onEmailChange(event.target.value)}
            />
          </FormItem>
          <FormItem
            label={t(`${namespace}:form.password`)}
            help={loginForm.passwordErrorMessage}
            status={passwordStatus}
          >
            <Input
              type="password"
              status={passwordStatus}
              value={loginForm.password}
              onChange={(event) =>
                loginForm.onPasswordChange(event.target.value)
              }
            />
          </FormItem>
          <Button block type="submit" loading={isPending} disabled={isPending}>
            {t(`${namespace}:form.login`)}
          </Button>
          {!!store.customerStore.isCaptchaRequired && <GoogleCaptcha />}

          {!!store.customerStore.isCaptchaRequired && (
            <div className="google-captcha mt-2 text-xs text-gray-400">
              <div dangerouslySetInnerHTML={{ __html: captchaText() }}></div>
            </div>
          )}
        </Form>
        <footer className="flex justify-between">
          <span className="text-sm block mt-5">
            {t(`${namespace}:footer.noAccount`)}{" "}
            <Link
              passHref
              href={`/account/register${
                loginForm.redirect ? "?redirect=" + loginForm.redirect : ""
              }`}
            >
              <a className="text-center">
                {t(`${namespace}:footer.createAccount`)}
              </a>
            </Link>
          </span>
          <span className="text-sm block mt-5">
            <Link
              passHref
              href={`/account/forgot-password${
                loginForm.redirect ? "?redirect=" + loginForm.redirect : ""
              }`}
            >
              <a className="text-center">
                {t(`${namespace}:footer.forgetPassword`)}
              </a>
            </Link>
          </span>
        </footer>
      </div>
    </Container>
  );
}

export default observer(Login);

export const captchaText = () => {
  const { t } = useTranslation();
  const captchaText = t("common:captchaDescription");
  const newTempText = captchaText.replace(
    t("common:privacyPolicy"),
    `<a target="_blank" href="https://policies.google.com/privacy">
    ${t("common:privacyPolicy")}
    </a>`
  );

  const text = newTempText.replace(
    t("common:termsOfService"),
    `<a target="_blank" href="https://policies.google.com/terms">
    ${t("common:termsOfService")}
    </a>`
  );

  return text;
};
