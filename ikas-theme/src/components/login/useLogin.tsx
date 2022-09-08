import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LoginForm, useStore, useTranslation } from "@ikas/storefront";

import { NS } from ".";
import { FormAlertType } from "../components/alert";
import { FormItemStatus } from "../components/form/form-item";

type UseLoginStatus = {
  email: FormItemStatus;
  password: FormItemStatus;
};

export default function useLogin() {
  const router = useRouter();
  const { t } = useTranslation();

  const [form] = useState(
    new LoginForm({
      message: {
        requiredRule: t(`${NS}:formMessage.requiredRule`),
        emailRule: t(`${NS}:formMessage.emailRule`),
        minRule: t(`${NS}:formMessage.minRule`),
      },
    })
  );

  const [isPending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState<FormAlertType>();

  useEffect(() => {
    const store = useStore();

    if (!store.customerStore.customer?.id) return;
    if (form.redirect) {
      router.push(decodeURIComponent(form.redirect));
    } else {
      router.push("/account");
    }
  }, []);

  const onFormSubmit = async () => {
    if (isPending) return;

    try {
      setPending(true);
      setFormAlert(undefined);
      const response = await form.login();
      if (response.isFormError) return;
      if (!response.isSuccess) {
        setFormAlert({
          status: "error",
          title: t(`${NS}:formAlert.unsuccessTitle`),
          text: t(`${NS}:formAlert.unsuccessText`),
        });
        return;
      }

      setFormAlert({
        status: "success",
        title: t(`${NS}:formAlert.successTitle`),
        text: t(`${NS}:formAlert.successText`),
      });

      setTimeout(() => {
        if (form.redirect) {
          router.push(decodeURIComponent(form.redirect));
        } else {
          router.push("/account");
        }
      }, 1000);
    } catch {
      setFormAlert({
        status: "error",
        title: t(`${NS}:formAlert.errorTitle`),
        text: t(`${NS}:formAlert.errorText`),
      });
    } finally {
      setPending(false);
    }
  };

  const onFormAlertClose = () => {
    setFormAlert(undefined);
  };

  const status: UseLoginStatus = {
    email: form.emailErrorMessage ? "error" : undefined,
    password: form.passwordErrorMessage ? "error" : undefined,
  };

  return {
    isPending,
    status,
    form,
    onFormSubmit,
    formAlert,
    onFormAlertClose,
  };
}
