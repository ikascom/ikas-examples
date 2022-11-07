import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import {
  IkasOrder,
  IkasOrderTransaction,
  IkasTransactionStatus,
  IkasTransactionType,
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

  const getOrderTransactions = useCallback(async (orderId: string) => {
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
  }, []);

  const getOrder = useCallback(async () => {
    const id: any = router.query.id;
    if (!id) return;

    setPending(true);
    const order = await store.customerStore.getOrder(id);
    if (!order) return router.replace("/account/orders");
    setOrder(order);
    await getOrderTransactions(order.id);
    setPending(false);
  }, []);

  const orderedAt = useMemo(() => {
    if (!order) return "";
    const orderDate = new Date(order.orderedAt || "");
    const date = orderDate.getDate();
    const month = getMonthName(orderDate);
    const year = orderDate.getFullYear();

    return `${date} ${month} ${year}`;
  }, [order]);

  useEffect(() => {
    const id: any = router.query.id;
    if (!id) {
      router.replace("/account/orders");
      return;
    }
    getOrder();
  }, [router]);

  return {
    isPending,
    isRefundProcess,
    orderedAt,
    order,
    orderTransactions,
    getOrder,
    toggleRefundProcess,
  };
}

export default useOrderDetail;
