import React from "react";
import { observer } from "mobx-react-lite";
import { IkasOrderPackageStatus, useTranslation } from "@ikas/storefront";

import { NS } from "src/components/account";

import * as S from "./style";

type OrderPackageStatusProps = {
  status: IkasOrderPackageStatus;
};

const OrderPackageStatusComponent = (props: OrderPackageStatusProps) => {
  const status: {
    text: string;
    color: "black" | "green" | "red";
  } = {
    text: getOrderPackageStatusText(props.status, NS),
    color: "black",
  };

  switch (props.status) {
    case IkasOrderPackageStatus.FULFILLED:
    case IkasOrderPackageStatus.PARTIALLY_FULFILLED:
    case IkasOrderPackageStatus.DELIVERED:
    case IkasOrderPackageStatus.PARTIALLY_DELIVERED:
      status.color = "green";
      break;

    case IkasOrderPackageStatus.CANCELLED:
    case IkasOrderPackageStatus.PARTIALLY_CANCELLED:
    case IkasOrderPackageStatus.CANCEL_REJECTED:
    case IkasOrderPackageStatus.CANCEL_REQUESTED:
      status.color = "red";
      break;

    default:
      break;
  }

  return <S.Text $color={status.color}>{status.text}</S.Text>;
};

export default observer(OrderPackageStatusComponent);

export function getOrderPackageStatusText(
  status: IkasOrderPackageStatus,
  namespace: string
) {
  const { t } = useTranslation();

  // orderPackageStatus i18n Text helper
  const oPS = (key: string) =>
    t(`${namespace}:orders.orderPackageStatus.${key}`);
  // refundProcessStatus i18n Text helper
  const rPS = (key: string) =>
    t(`${namespace}:orders.refundProcessStatus.${key}`);

  switch (status) {
    case IkasOrderPackageStatus.UNFULFILLED:
      return oPS(`unfulfilled`);

    case IkasOrderPackageStatus.READY_FOR_SHIPMENT:
      return oPS(`readyForShipment`);

    case IkasOrderPackageStatus.PARTIALLY_FULFILLED:
      return oPS(`partiallyFulfilled`);

    case IkasOrderPackageStatus.FULFILLED:
      return oPS(`fulfilled`);

    case IkasOrderPackageStatus.DELIVERED:
      return oPS(`delivered`);

    case IkasOrderPackageStatus.PARTIALLY_DELIVERED:
      return oPS(`partiallyDelivered`);

    case IkasOrderPackageStatus.UNABLE_TO_DELIVER:
      return oPS(`unableToDeliver`);

    case IkasOrderPackageStatus.CANCELLED:
      return oPS(`cancelled`);

    case IkasOrderPackageStatus.PARTIALLY_CANCELLED:
      return oPS(`partiallyCancelled`);

    case IkasOrderPackageStatus.CANCEL_REJECTED:
      return oPS(`cancelRejected`);

    case IkasOrderPackageStatus.REFUNDED:
      return rPS(`refunded`);

    case IkasOrderPackageStatus.PARTIALLY_REFUNDED:
      return rPS(`partiallyRefunded`);

    case IkasOrderPackageStatus.REFUND_REQUEST_ACCEPTED:
      return rPS(`refundRequestAccepted`);

    case IkasOrderPackageStatus.REFUND_REJECTED:
      return rPS(`refundRejected`);

    case IkasOrderPackageStatus.REFUND_REQUESTED:
      return rPS(`refundRequested`);

    default:
      return "";
  }
}
