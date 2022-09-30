import { useEffect, useState } from "react";
import {
  AccountInfoForm,
  IkasCustomer,
  useTranslation,
  useStore,
} from "@ikas/storefront";

import { FormAlertType } from "src/components/components/alert";
import { NS } from "..";
import { FormItemStatus } from "src/components/components/form/form-item";

type StatusType = {
  firstName: FormItemStatus;
  lastName: FormItemStatus;
  phone: FormItemStatus;
};

export default function useAccountInfo() {
  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  const store = useStore();

  const [formAlert, setFormAlert] = useState<FormAlertType>();
  const [accountInfoForm, setAccountInfoForm] = useState<AccountInfoForm>();

  useEffect(() => {
    if (!store.customerStore.customer) return;
    setAccountInfoForm(
      new AccountInfoForm({
        customer: new IkasCustomer(store.customerStore.customer),
        message: {
          requiredRule: t(`${NS}:accountInfo.formMessage.requiredRule`),
          phoneRule: (model) =>
            t(`${NS}:accountInfo.formMessage.phoneRule`, {
              phoneNumber: model.phone || "",
            }),
        },
      })
    );
  }, [store.customerStore.customer]);

  const onSubmit = async () => {
    if (pending) return;
    if (!accountInfoForm) return;
    if (formAlert) setFormAlert(undefined);

    setPending(true);
    const result = await accountInfoForm.submit();
    setPending(false);
    if (result.isFormError) return;
    if (!result.isSuccess) {
      setFormAlert({
        status: "error",
        title: t(`${NS}:accountInfo.formAlert.unsuccessTitle`),
        text: t(`${NS}:accountInfo.formAlert.unsuccessText`),
      });
      return;
    }

    setFormAlert({
      status: "success",
      title: t(`${NS}:accountInfo.formAlert.successTitle`),
      text: t(`${NS}:accountInfo.formAlert.successText`),
    });
  };

  const status: StatusType = {
    firstName: accountInfoForm?.firstNameErrorMessage ? "error" : undefined,
    lastName: accountInfoForm?.lastNameErrorMessage ? "error" : undefined,
    phone: accountInfoForm?.phoneErrorMessage ? "error" : undefined,
  };

  return {
    pending,
    formAlert,
    accountInfoForm,
    status,
    onSubmit,
  };
}
