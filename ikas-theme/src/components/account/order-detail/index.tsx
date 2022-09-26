import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "@ikas/storefront";

import useOrderDetail from "./hooks/useOrderDetail";
import Summary from "./components/summary";
import BillingAddress from "./components/billing-address";
import Address from "./components/address";
import Payment from "./components/payment";
import OrderRefund from "./components/order-refund";
import OrderDetailBoxHeader from "./components/header";
import RefundProcessButton from "./components/order-refund-process-button";
import {
  CancelledOrderPackage,
  OrderPackages,
  RefundedOrderPackage,
  UnfullfilledOrderPackage,
} from "./components/order-package";
import Loading from "src/components/account/components/loading";
import Header from "src/components/account/components/header";
import Button from "src/components/components/button";

import * as S from "./style";

const OrderDetail = () => {
  const { t } = useTranslation();
  const {
    isPending,
    isRefundProcess,
    order,
    orderPackages,
    unfullfilledItems,
    cancelledItems,
    orderedAt,
    orderTransactions,
    getOrders,
    toggleRefundProcess,
  } = useOrderDetail();

  const onRefundProcessButtonClick = () => {
    toggleRefundProcess(!isRefundProcess);
    window.scroll(0, 0);
  };

  if (isPending) return <Loading>{t(`orderDetail.loading`)}</Loading>;
  if (!order) return null;
  return (
    <div>
      <Header
        title={`${t("orderDetail.orderDetail")} #${order.orderNumber}`}
        rightChild={
          isRefundProcess && (
            <Button size="small" onClick={() => toggleRefundProcess(false)}>
              {t("orderDetail.refund.backButton")}
            </Button>
          )
        }
      />
      {isRefundProcess && <OrderRefund order={order} />}
      {!isRefundProcess && (
        <S.Main>
          <S.Section>
            <OrderDetailBoxHeader
              orderNumber={order.orderNumber}
              orderPackageStatus={order.orderPackageStatus}
              orderedAt={orderedAt}
            />
            <CancelledOrderPackage
              title={t(`orderDetail.cancelled`)}
              orderLineItems={cancelledItems}
            />
            <UnfullfilledOrderPackage
              title={t(`orderDetail.undelivered`)}
              orderLineItems={unfullfilledItems}
            />
            <OrderPackages order={order} orderPackages={orderPackages} />
            <RefundedOrderPackage
              title={t(`orderDetail.refunds`)}
              orderLineItems={order.refundedItems}
            />
            <RefundProcessButton
              disabled={!order.refundableItems.length}
              onClick={onRefundProcessButtonClick}
            />
          </S.Section>
          <S.Aside>
            <Address order={order} />
            <BillingAddress order={order} />
            {orderTransactions && (
              <Payment orderTransactions={orderTransactions} />
            )}
            <Summary order={order} />
          </S.Aside>
        </S.Main>
      )}
    </div>
  );
};

export default observer(OrderDetail);
