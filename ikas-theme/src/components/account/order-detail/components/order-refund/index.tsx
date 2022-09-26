import React, { useState } from "react";
import { IkasOrder, useStore, useTranslation } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Button from "src/components/components/button";
import OrderLineItem from "src/components/account/order-detail/components/order-line-item";
import { OrderLineItem as OrderLineItemWrapper } from "src/components/account/order-detail/components/order-package/style";

import * as S from "./style";

type Props = {
  order: IkasOrder;
};

const OrderRefund = ({ order }: Props) => {
  const store = useStore();
  const { t } = useTranslation();
  const [isRefundedSuccess, setIsRefundedSuccess] = useState(false);

  const RefundButton = observer(() => {
    const disabled = order?.orderLineItems.every(
      (item) => item.refundQuantity === null
    );
    const onClick = async () => {
      const response = await store.customerStore.refundOrder(order);

      if (response) {
        setIsRefundedSuccess(true);
      } else {
        // error
      }
    };

    let selectedRefundItemQuantity = 0;
    order.orderLineItems.forEach(
      (oLI) => (selectedRefundItemQuantity += oLI.refundQuantity || 0)
    );

    return (
      <S.ButtonWrapper $isSticky={!!selectedRefundItemQuantity}>
        <Button disabled={disabled} onClick={onClick}>
          {selectedRefundItemQuantity
            ? t("orderDetail.refund.refundButton", {
                quantity: "" + selectedRefundItemQuantity,
              })
            : t("orderDetail.refund.refundButtonNoItem")}
        </Button>
      </S.ButtonWrapper>
    );
  });

  const RefundSuccessUI = () => {
    const { t } = useTranslation();
    return (
      <S.RefundSuccess>
        ✅ {t("orderDetail.refund.refundSuccess")}
      </S.RefundSuccess>
    );
  };

  const OrderRefundLineItems = observer(() => {
    return (
      <ul>
        {order.refundableItems.map((orderLineItem) => (
          <OrderLineItemWrapper key={orderLineItem.id}>
            <OrderLineItem
              key={orderLineItem.id}
              refundProcess
              orderLineItem={orderLineItem}
            />
          </OrderLineItemWrapper>
        ))}
      </ul>
    );
  });

  return (
    <div>
      {isRefundedSuccess && <RefundSuccessUI />}
      {!isRefundedSuccess && (
        <>
          <S.Header>{t("orderDetail.refund.selectRefundItem")}</S.Header>
          <OrderRefundLineItems />
          <RefundButton />
        </>
      )}
    </div>
  );
};

export default observer(OrderRefund);
