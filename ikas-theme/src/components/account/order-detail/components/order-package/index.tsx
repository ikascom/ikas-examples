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

type OrderPackageSectionProps = {
  title: React.ReactNode;
  orderLineItems?: IkasOrderLineItem[];
  trackingInfo?: IkasTrackingInfo | null;
};

const OrderPackageSection = ({
  title,
  orderLineItems,
  trackingInfo,
}: OrderPackageSectionProps) => {
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

/**
 * REST ORDER PACKAGES; NOT CANCELLED, NOT UNFULFILLED, NOT REFUNDED
 */
export const OrderPackages = ({
  orderPackages,
  order,
}: {
  order: IkasOrder;
  orderPackages?: IkasOrderPackage[] | null;
}) => (
  <>
    {orderPackages?.map((orderPackage) => {
      const orderLineItems = order.orderLineItems.filter((o) =>
        orderPackage.orderLineItemIds.includes(o.id)
      );
      const title = orderPackageTitle(orderPackage.orderPackageFulfillStatus);
      return (
        <OrderPackageSection
          key={orderPackage.id}
          title={title}
          trackingInfo={orderPackage.trackingInfo}
          orderLineItems={orderLineItems}
        />
      );
    })}
  </>
);

type OrderPackageProps = {
  orderLineItems?: IkasOrderLineItem[];
  title: React.ReactNode;
};

export const CancelledOrderPackage = ({
  orderLineItems,
  title,
}: OrderPackageProps) => (
  <OrderPackageSection title={title} orderLineItems={orderLineItems} />
);

export const UnfullfilledOrderPackage = ({
  orderLineItems,
  title,
}: OrderPackageProps) => (
  <OrderPackageSection title={title} orderLineItems={orderLineItems} />
);

export const RefundedOrderPackage = ({
  orderLineItems,
  title,
}: OrderPackageProps) => (
  <OrderPackageSection title={title} orderLineItems={orderLineItems} />
);

function orderPackageTitle(status: IkasOrderPackageFullfillStatus) {
  const { t } = useTranslation();
  const text = (key: string) => t(`orderPackageStatus.${key}`);

  switch (status) {
    case IkasOrderPackageFullfillStatus.DELIVERED:
      return text("delivered");
    case IkasOrderPackageFullfillStatus.READY_FOR_SHIPMENT:
      return text("readyForShipment");
    case IkasOrderPackageFullfillStatus.REFUNDED:
      return text("refunded");
    case IkasOrderPackageFullfillStatus.FULFILLED:
      return text("fulfilled");
    default:
      return "";
  }
}
