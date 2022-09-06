import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  ForgotPasswordForm,
  IkasBaseStore,
  useTranslation,
} from "@ikas/storefront";

import { namespace } from ".";
import { FormAlertType } from "../components/alert";
import { FormItemStatus } from "../components/form/form-item";

type UseForgotPasswordStatus = {
  email: FormItemStatus;
};

export default function useForgotPassword() {
  const router = useRouter();
  const { t } = useTranslation();

  const [form] = useState(
    new ForgotPasswordForm({
      message: {
        requiredRule: t(`${namespace}:formMessage.requiredRule`),
        emailRule: t(`${namespace}:formMessage.emailRule`),
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

      const store = IkasBaseStore.getInstance();
      const isEmailExist = await store.customerStore.checkEmail(form.email);
      console.log(isEmailExist);
      if (!isEmailExist) {
        setFormAlert({
          status: "error",
          title: t(`${namespace}:formAlert.emailNotExistTitle`),
          text: t(`${namespace}:formAlert.emailNotExistText`),
        });
        return;
      }

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
