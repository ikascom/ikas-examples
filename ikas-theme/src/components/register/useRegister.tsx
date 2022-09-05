import { IkasBaseStore, RegisterForm, useTranslation } from "@ikas/storefront";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { namespace } from ".";
import { FormAlertType } from "../components/alert";
import { FormItemStatus } from "../components/form/form-item";

type UseRegisterStatus = {
  firstName: FormItemStatus;
  lastName: FormItemStatus;
  email: FormItemStatus;
  password: FormItemStatus;
};

export default function useRegister() {
  const router = useRouter();
  const { t } = useTranslation();

  const [form] = useState(
    new RegisterForm({
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

    return;
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
      const store = IkasBaseStore.getInstance();
      const isEmailExist = await store.customerStore.checkEmail(form.email);
      if (isEmailExist) {
        setFormAlert({
          status: "error",
          title: t(`${namespace}:formAlert.emailExistTitle`),
          text: t(`${namespace}:formAlert.emailExistText`),
        });
        return;
      }
      const response = await form.register();
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

  const status: UseRegisterStatus = {
    firstName: form.firstNameErrorMessage ? "error" : undefined,
    lastName: form.lastNameErrorMessage ? "error" : undefined,
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
