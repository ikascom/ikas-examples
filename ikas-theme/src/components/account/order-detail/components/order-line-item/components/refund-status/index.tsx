import React from "react";
import {
  useTranslation,
  IkasOrderLineItem,
  IkasOrderLineItemStatus,
} from "@ikas/storefront";

import { RefundStatusTextColor } from "./style";

import * as S from "./style";

type Props = {
  orderLineItemStatus: IkasOrderLineItem["status"];
};

const OrderLineItemRefundStatusComponent = ({ orderLineItemStatus }: Props) => {
  const { t } = useTranslation();
  const status = orderRefundLineItemStatus(orderLineItemStatus);
  if (!status) return null;
  return (
    <S.RefundStatus>
      <S.RefundStatusText $color={status.color}>
        {status.text}
      </S.RefundStatusText>
    </S.RefundStatus>
  );
};

export default OrderLineItemRefundStatusComponent;

type Status = { text: string; color: RefundStatusTextColor } | null;

export function orderRefundLineItemStatus(
  orderLineItemStatus: IkasOrderLineItemStatus
): Status {
  const { t } = useTranslation();
  const text = (key: string) => t(`orderDetail.refundStatus.${key}`);

  switch (orderLineItemStatus) {
    case IkasOrderLineItemStatus.REFUND_REQUEST_ACCEPTED:
      return { text: text("refundApproved"), color: "orange" };
    case IkasOrderLineItemStatus.REFUNDED:
      return { text: text("refunded"), color: "green" };
    case IkasOrderLineItemStatus.REFUND_REJECTED:
      return { text: text("cancelRefunded"), color: "red" };
    case IkasOrderLineItemStatus.REFUND_REQUESTED:
      return { text: text("requestRefunded"), color: "blue" };

    default:
      return null;
  }
}
