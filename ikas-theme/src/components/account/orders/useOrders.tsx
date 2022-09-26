import React, { useEffect, useState } from "react";
import { IkasOrder, useStore } from "@ikas/storefront";

export default function useOrders() {
  const store = useStore();
  const [isPending, setPending] = useState(true);
  const [orders, setOrders] = useState<IkasOrder[]>([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const result = (await store.customerStore.getOrders()) || [];
    setOrders(result);
    setPending(false);
  };

  return {
    isPending,
    orders,
  };
}
