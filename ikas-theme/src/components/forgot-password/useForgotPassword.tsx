import { useState } from "react";
import { ForgotPasswordForm, useStore, useTranslation } from "@ikas/storefront";

import { NS } from ".";
import { FormAlertType } from "../components/alert";
import { FormItemStatus } from "../components/form/form-item";

type UseForgotPasswordStatus = {
  email: FormItemStatus;
};

export default function useForgotPassword() {
  const { t } = useTranslation();

  const [form] = useState(
    new ForgotPasswordForm({
      message: {
        requiredRule: t(`${NS}:formMessage.requiredRule`),
        emailRule: t(`${NS}:formMessage.emailRule`),
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

      const hasError = await form.validateAll();
      if (hasError) return;

      const store = useStore();
      const isEmailExist = await store.customerStore.checkEmail(form.email);
      if (!isEmailExist) {
        setFormAlert({
          status: "error",
          title: t(`${NS}:formAlert.emailNotExistTitle`),
          text: t(`${NS}:formAlert.emailNotExistText`),
        });
        return;
      }

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

  const status: UseForgotPasswordStatus = {
    email: form.emailErrorMessage ? "error" : undefined,
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
