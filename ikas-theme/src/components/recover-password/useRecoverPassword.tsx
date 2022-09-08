import { useState } from "react";
import { useRouter } from "next/router";
import { RecoverPasswordForm, useTranslation } from "@ikas/storefront";

import { NS } from ".";
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
        requiredRule: t(`${NS}:formMessage.requiredRule`),
        minRule: t(`${NS}:formMessage.minRule`),
        equalsRule: t(`${NS}:formMessage.equalsRule`),
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
          router.push("/account/login");
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
