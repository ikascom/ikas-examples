import React, { useEffect } from "react";
import { useTranslation } from "@ikas/storefront";

import { NS, RegisterFormProps } from ".";
import useSocialLogin from "src/utils/hooks/useSocialLogin";
import { FormItemStatus } from "../components/form/form-item";

export default function useRegisterForm({
  form,
  setFormAlert,
  ...props
}: RegisterFormProps) {
  const { t } = useTranslation();
  const { onSocialLogin } = useSocialLogin({
    onStatusSuccess: () => {
      setFormAlert({
        status: "success",
        title: t(`${NS}:formAlert.successTitle`),
        text: t(`${NS}:formAlert.successText`),
      });
    },
    onStatusFail: (error?: string | null) => {
      setFormAlert({
        status: "error",
        title: t(`${NS}:formAlert.unsuccessTitle`),
        text: error || t(`${NS}:formAlert.errorText`),
      });
    },
  });

  useEffect(() => {
    form.isMarketingAccepted = !!props.marketingEmailDefaultChecked;
  }, []);

  const onMarketingEmailCheckboxChange = () => {
    form.isMarketingAccepted = !form.isMarketingAccepted;
  };

  const marketingEmailFormItemStatus: FormItemStatus =
    props.isFormSubmitted &&
    props.isMarketingEmailRequired &&
    !form.isMarketingAccepted
      ? "error"
      : undefined;
  const marketingEmailFormItemHelp =
    props.isFormSubmitted &&
    props.isMarketingEmailRequired &&
    !form.isMarketingAccepted
      ? t(`${NS}:formMessage.requiredRule`)
      : undefined;

  return {
    marketingEmailFormItemHelp,
    marketingEmailFormItemStatus,
    onSocialLogin,
    onMarketingEmailCheckboxChange,
  };
}
