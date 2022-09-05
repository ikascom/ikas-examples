import { IkasBaseStore, LoginForm, useTranslation } from "@ikas/storefront";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { namespace } from ".";
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
        requiredRule: t(`${namespace}:formMessage.requiredRule`),
        emailRule: t(`${namespace}:formMessage.emailRule`),
        minRule: t(`${namespace}:formMessage.minRule`),
      },
    })
  );

  const [isPending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState<FormAlertType>();

  useEffect(() => {
    const store = IkasBaseStore.getInstance();

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
        if (form.redirect) {
          router.push(decodeURIComponent(form.redirect));
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
