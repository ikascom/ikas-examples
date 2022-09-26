import React from "react";
import { IkasOrder, useTranslation } from "@ikas/storefront";

import * as S from "./style";

type Props = {
  order: IkasOrder;
};

const Address = ({ order }: Props) => {
  const { t } = useTranslation();
  return (
    <S.Address>
      <S.DeliveryAddress>
        {t("common:orderDetail.deliveryAddress")}
      </S.DeliveryAddress>
      <S.Text>
        <div>
          {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
        </div>
        <div>{order.shippingAddress?.addressText}</div>
      </S.Text>
    </S.Address>
  );
};

export default Address;
