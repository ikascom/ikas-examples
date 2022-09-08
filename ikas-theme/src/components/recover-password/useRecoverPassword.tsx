import { useState } from "react";
import { useRouter } from "next/router";
import {
  IkasBaseStore,
  RecoverPasswordForm,
  useTranslation,
} from "@ikas/storefront";

import { namespace } from ".";
import { FormAlertType } from "../components/alert";
import { FormItemStatus } from "../components/form/form-item";

type UseRecoverPasswordStatus = {
  password: FormItemStatus;
  passwordAgain: FormItemStatus;
};

export default function useRecoverPassword() {
  const router = useRouter();
  const { t } = useTranslation();

  const [form] = useState(
    new RecoverPasswordForm({
      message: {
        requiredRule: t(`${namespace}:formMessage.requiredRule`),
        minRule: t(`${namespace}:formMessage.minRule`),
        equalsRule: t(`${namespace}:formMessage.equalsRule`),
      },
    })
  );

  const [isPending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState<FormAlertType>();

  const onFormSubmit = async () => {
    if (isPending) return;

    try {
      setPending(true);
      setFormAlert(undefined);

      const response = await form.submit();
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
          router.push("/account/login");
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

  const status: UseRecoverPasswordStatus = {
    password: form.passwordErrorMessage ? "error" : undefined,
    passwordAgain: form.passwordAgainErrorMessage ? "error" : undefined,
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
