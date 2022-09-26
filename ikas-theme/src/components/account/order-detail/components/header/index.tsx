import React from "react";
import { useTranslation, IkasOrder } from "@ikas/storefront";
import OrderPackageStatus from "src/components/account/orders/order/order-package-status";
import useOrderDetail from "../../hooks/useOrderDetail";

import * as S from "./style";

type Props = {
  orderNumber: IkasOrder["orderNumber"];
  orderedAt: ReturnType<typeof useOrderDetail>["orderedAt"];
  orderPackageStatus: IkasOrder["orderPackageStatus"];
};

const Header = ({ orderNumber, orderPackageStatus, orderedAt }: Props) => {
  const { t } = useTranslation();

  return (
    <S.Header>
      <S.OrderNoDetail>
        {t(`orderDetail.xNumberedOrder`, { orderNumber })}
      </S.OrderNoDetail>
      <OrderPackageStatus status={orderPackageStatus!} />
      <S.OrderedAt>{orderedAt}</S.OrderedAt>
    </S.Header>
  );
};

export default Header;
