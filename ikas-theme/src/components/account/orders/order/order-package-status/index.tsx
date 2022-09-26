import React from "react";
import { observer } from "mobx-react-lite";
import { IkasOrderPackageStatus, useTranslation } from "@ikas/storefront";

import * as S from "./style";

type OrderPackageStatusProps = {
  status: IkasOrderPackageStatus;
};

const OrderPackageStatusComponent = (props: OrderPackageStatusProps) => {
  const status: {
    text: string;
    color: "black" | "green" | "red";
  } = {
    text: getOrderPackageStatusText(props.status),
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

export function getOrderPackageStatusText(status: IkasOrderPackageStatus) {
  const { t } = useTranslation();

  // orderPackageStatus i18n Text helper
  const text = (key: string) => t(`orderPackageStatus.${key}`);

  switch (status) {
    case IkasOrderPackageStatus.UNFULFILLED:
      return text(`unfulfilled`);

    case IkasOrderPackageStatus.READY_FOR_SHIPMENT:
      return text(`readyForShipment`);

    case IkasOrderPackageStatus.PARTIALLY_FULFILLED:
      return text(`partiallyFulfilled`);

    case IkasOrderPackageStatus.FULFILLED:
      return text(`fulfilled`);

    case IkasOrderPackageStatus.DELIVERED:
      return text(`delivered`);

    case IkasOrderPackageStatus.PARTIALLY_DELIVERED:
      return text(`partiallyDelivered`);

    case IkasOrderPackageStatus.UNABLE_TO_DELIVER:
      return text(`unableToDeliver`);

    case IkasOrderPackageStatus.CANCELLED:
      return text(`cancelled`);

    case IkasOrderPackageStatus.PARTIALLY_CANCELLED:
      return text(`partiallyCancelled`);

    case IkasOrderPackageStatus.CANCEL_REJECTED:
      return text(`cancelRejected`);

    case IkasOrderPackageStatus.REFUNDED:
      return text(`refunded`);

    case IkasOrderPackageStatus.PARTIALLY_REFUNDED:
      return text(`partiallyRefunded`);

    case IkasOrderPackageStatus.REFUND_REQUEST_ACCEPTED:
      return text(`refundRequestAccepted`);

    case IkasOrderPackageStatus.REFUND_REJECTED:
      return text(`refundRejected`);

    case IkasOrderPackageStatus.REFUND_REQUESTED:
      return text(`refundRequested`);

    default:
      return "";
  }
}
