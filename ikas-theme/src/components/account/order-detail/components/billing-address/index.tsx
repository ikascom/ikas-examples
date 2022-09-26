import React from "react";
import { IkasOrder } from "@ikas/storefront";
import { useTranslation } from "@ikas/storefront/build/utils/i18n";

import * as S from "./style";

type Props = {
  order: IkasOrder;
};

const BillingAddress = ({ order }: Props) => {
  const { t } = useTranslation();

  return (
    <S.BillingAddress>
      <S.Title>{t("orderDetail.billingInfo")}</S.Title>
      <S.Text>
        <div>
          {order.billingAddress?.firstName} {order.billingAddress?.lastName}
        </div>
        <div>{order.billingAddress?.addressText}</div>
      </S.Text>
    </S.BillingAddress>
  );
};

export default BillingAddress;
