import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  IkasBaseStore,
  IkasOrder,
  IkasOrderPackageFullfillStatus,
  IkasOrderPackageStatus,
  IkasOrderStatus,
  IkasOrderTransaction,
  IkasTransactionStatus,
  IkasTransactionType,
  IkasOrderLineItemStatus,
  useStore,
} from "@ikas/storefront";
import getMonthName from "src/utils/getMonthName";

function useOrderDetail() {
  const store = useStore();
  const router = useRouter();
  const [isPending, setPending] = useState(true);
  const [isRefundProcess, toggleRefundProcess] = useState(false);
  const [order, setOrder] = useState<IkasOrder>();
  const [orderTransactions, setOrderTransactions] =
    useState<IkasOrderTransaction[]>();

  const getOrderTransactions = async (orderId: string) => {
    const responseOrderTransactions =
      await store.customerStore.getOrderTransactions({
        orderId,
      });
    if (
      Array.isArray(responseOrderTransactions) &&
      responseOrderTransactions.length
    ) {
      const filteredOT = responseOrderTransactions.filter(
        (rOT) =>
          rOT.status === IkasTransactionStatus.SUCCESS &&
          rOT.type === IkasTransactionType.SALE
      );
      setOrderTransactions(filteredOT);
    }
  };

  const getOrders = async () => {
    const id: any = router.query.id;
    if (!id) return;

    setPending(true);
    const order = await store.customerStore.getOrder(id);
    if (!order) return router.replace("/account/orders");
    setOrder(order);
    await getOrderTransactions(order.id);
    setPending(false);
  };

  const orderedAt = React.useMemo(() => {
    if (!order) return "";
    const orderDate = new Date(order.orderedAt || "");
    const date = orderDate.getDate();
    const month = getMonthName(orderDate);
    const year = orderDate.getFullYear();

    return `${date} ${month} ${year}`;
  }, [order]);

  /**
   * Not deleted order packages
   */
  const orderPackages = order?.orderPackages?.filter(
    (orderPackage) =>
      !orderPackage.deleted &&
      ![
        IkasOrderPackageFullfillStatus.REFUNDED,
        IkasOrderPackageFullfillStatus.REFUND_REQUESTED,
        IkasOrderPackageFullfillStatus.REFUND_REQUEST_ACCEPTED,
        IkasOrderPackageFullfillStatus.REFUND_REJECTED,
      ].includes(orderPackage.orderPackageFulfillStatus as any)
  );

  const unfullfilledItems = order?.unfullfilledItems.filter(
    (item) =>
      !item.deleted && item.status === IkasOrderLineItemStatus.UNFULFILLED
  );

  const cancelledItems = order?.orderLineItems.filter(
    (item) =>
      !item.deleted &&
      (item.status === IkasOrderLineItemStatus.CANCELLED ||
        item.status === IkasOrderLineItemStatus.CANCEL_REJECTED ||
        item.status === IkasOrderLineItemStatus.CANCEL_REQUESTED)
  );

  useEffect(() => {
    const id: any = router.query.id;
    if (!id) {
      router.replace("/account/orders");
      return;
    }
    getOrders();
  }, [router]);

  return {
    isPending,
    isRefundProcess,
    orderedAt,
    order,
    orderPackages,
    unfullfilledItems,
    cancelledItems,
    orderTransactions,
    getOrders,
    toggleRefundProcess,
  };
}

export default useOrderDetail;
