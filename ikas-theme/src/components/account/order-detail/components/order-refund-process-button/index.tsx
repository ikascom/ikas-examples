import React from "react";
import { useTranslation } from "@ikas/storefront";

import Button from "src/components/components/button";

type Props = {
  disabled: boolean;
  onClick: () => void;
};

const RefundProcessButton = ({ disabled, onClick }: Props) => {
  const { t } = useTranslation();
  return (
    <Button
      title={t(`orderDetail.refundRequestDisabled`)}
      disabled={disabled}
      onClick={onClick}
    >
      {t(`orderDetail.refundRequest`)}
    </Button>
  );
};

export default RefundProcessButton;
