import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { IkasOrder, Image, useTranslation } from "@ikas/storefront";

import getMonthName from "src/utils/getMonthName";

import OrderPackageStatus from "./order-package-status";
import OrderProductNames from "./order-product-names";
import PlaceholderSVG from "src/components/svg/product-image-placeholder";
import Button from "src/components/components/button";

import { NS } from "src/components/account";

import * as S from "./style";

type Props = {
  order: IkasOrder;
};

const Order = ({ order }: Props) => {
  const { t } = useTranslation();
  const orderedAt = useMemo(() => {
    const orderDate = new Date(order.orderedAt || "");
    const date = orderDate.getDate();
    const month = getMonthName(orderDate);
    const year = orderDate.getFullYear();

    return `${date} ${month} ${year}`;
  }, [order.orderedAt]);

  const totalProductCount = useMemo(() => {
    return order.orderLineItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [order.orderLineItems]);

  return (
    <S.Order>
      <S.Picture>
        {!order.orderLineItems[0].variant.mainImage?.id ? (
          <PlaceholderSVG />
        ) : (
          <Image
            useBlur
            image={order.orderLineItems[0].variant.mainImage}
            alt={order.orderLineItems[0].variant.name}
            width="1"
            height="1"
            layout="responsive"
            objectFit="contain"
            sizes="250px"
          />
        )}
      </S.Picture>
      <S.Content>
        <div>
          <OrderPackageStatus status={order.orderPackageStatus!} />
          <OrderProductNames orderLineItems={order.orderLineItems} />
          <S.OrderedAt>
            {t(`${NS}:orders.orderedAt`, {
              orderDate: orderedAt,
            })}
          </S.OrderedAt>
          <S.OrderNumber>
            {t(`${NS}:orders.xNumberedOrder`, {
              orderNumber: order.orderNumber,
            })}
          </S.OrderNumber>
          <S.ProductCount>
            {t(`${NS}:orders.xProduct`, { productQuantity: totalProductCount })}
          </S.ProductCount>
        </div>
        <S.ButtonWrapper>
          <Button anchor size="small" href={`/account/orders/${order.id}`}>
            {t(`${NS}:orders.showOrderDetail`)}
          </Button>
        </S.ButtonWrapper>
      </S.Content>
    </S.Order>
  );
};

export default observer(Order);
