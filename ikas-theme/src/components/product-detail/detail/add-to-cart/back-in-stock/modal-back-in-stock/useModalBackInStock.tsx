import React, { useState } from "react";
import { observable } from "mobx";
import {
  Validator,
  EmailRule,
  useTranslation,
  IkasProduct,
} from "@ikas/storefront";

import { FormAlertType } from "src/components/components/alert";
import { FormItemStatus } from "src/components/components/form/form-item";

import { NS } from "src/components/product-detail";

type Status = {
  email: FormItemStatus;
};

type Props = {
  product: IkasProduct;
};

export default function useModalBackInStock({ product }: Props) {
  const { t } = useTranslation();
  const [model] = useState(() => observable({ email: "" }));
  const [pending, setPending] = useState(false);
  const [formAlert, setFormAlert] = useState<FormAlertType | null>();

  const SUB_NS = `${NS}:detail.addToCart.backInStockModal`;
  const i18nText = (key: string) => t(`${SUB_NS}.${key}`);

  const [validator] = useState(
    new Validator(model, [
      new EmailRule({
        fieldKey: "email",
        fieldName: i18nText("form.email"),
        valuePath: "email",
        message: i18nText("form.validation.emailRule"),
      }),
    ])
  );

  const onSubmit = async () => {
    const hasError = await validator.validateAll();
    if (hasError) return;

    try {
      const { isBackInStockReminderSaved } = product.selectedVariant;

      setPending(true);
      const result = await product.selectedVariant.saveBackInStockReminder(
        model.email
      );

      const status =
        !isBackInStockReminderSaved && !result
          ? "error"
          : isBackInStockReminderSaved && !result
          ? "info"
          : "success";
      const title =
        status === "error"
          ? i18nText(".alert.errorTitle")
          : status === "info"
          ? undefined
          : i18nText("alert.successTitle");
      const text =
        status === "error"
          ? i18nText("alert.errorText")
          : status === "info"
          ? i18nText("alert.alreadySavedText")
          : i18nText("alert.successText");

      setFormAlert({ status, title, text });
      if (status !== "error") model.email = "";
    } catch (error) {
      console.log("error", error);
      setFormAlert({
        status: "error",
        title: i18nText("alert.errorTitle"),
        text: i18nText("alert.errorText"),
      });
    } finally {
      setPending(false);
    }
  };

  const status: Status = {
    email: validator.results.email.status === "error" ? "error" : undefined,
  };

  const onFormAlertClose = () => setFormAlert(null);

  return {
    pending,
    model,
    formAlert,
    validator,
    status,
    onFormAlertClose,
    onSubmit,
  };
}
