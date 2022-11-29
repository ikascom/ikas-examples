import React from "react";
import {
  useTranslation,
  IkasOrder,
  IkasOrderLineItem,
  IkasOrderPackage,
  IkasOrderPackageFullfillStatus,
  IkasTrackingInfo,
} from "@ikas/storefront";

import OrderLineItem from "../order-line-item";
import OrderPackageTrackingInfo from "./components/tracking-info";

import * as S from "./style";

type OrderPackageProps = {
  title: React.ReactNode;
  orderLineItems?: IkasOrderLineItem[];
  trackingInfo?: IkasTrackingInfo | null;
};

const OrderPackage = ({
  title,
  orderLineItems,
  trackingInfo,
}: OrderPackageProps) => {
  if (!orderLineItems || !orderLineItems.length) return null;

  const quantity = orderLineItems.reduce(
    (quantity: number, oLI) => oLI.quantity + quantity,
    0
  );

  return (
    <S.OrderPackage>
      <S.OrderPackageTitle>
        {title} ({quantity})
      </S.OrderPackageTitle>
      <ul>
        {orderLineItems.map((orderLineItem) => (
          <S.OrderLineItem key={orderLineItem.id}>
            <OrderLineItem orderLineItem={orderLineItem} />
          </S.OrderLineItem>
        ))}
      </ul>
      {trackingInfo && <OrderPackageTrackingInfo trackingInfo={trackingInfo} />}
    </S.OrderPackage>
  );
};

export const OrderPackages = ({
  orderPackages,
  order,
}: {
  order: IkasOrder;
  orderPackages?: IkasOrderPackage[] | null;
}) => (
  <>
    {orderPackages?.map((orderPackage) => {
      const orderLineItems = orderPackage.getOrderLineItems(order);
      const title = getOrderPackageTitle(
        orderPackage.orderPackageFulfillStatus
      );
      return (
        <OrderPackage
          key={orderPackage.id}
          title={title}
          trackingInfo={orderPackage.trackingInfo}
          orderLineItems={orderLineItems}
        />
      );
    })}
  </>
);

function getOrderPackageTitle(status: IkasOrderPackageFullfillStatus) {
  const { t } = useTranslation();
  const text = (key: string) => t(`orderPackageStatus.${key}`);

  switch (status) {
    case IkasOrderPackageFullfillStatus.DELIVERED:
      return text("delivered");
    case IkasOrderPackageFullfillStatus.READY_FOR_SHIPMENT:
      return text("readyForShipment");
    case IkasOrderPackageFullfillStatus.READY_FOR_PICK_UP:
      return text("readyForPickUp");
    case IkasOrderPackageFullfillStatus.REFUNDED:
      return text("refunded");
    case IkasOrderPackageFullfillStatus.FULFILLED:
      return text("fulfilled");
    case IkasOrderPackageFullfillStatus.UNFULFILLED:
      return text("unfulfilled");
    case IkasOrderPackageFullfillStatus.CANCELLED:
      return text("cancelled");
    default:
      return "";
  }
}
