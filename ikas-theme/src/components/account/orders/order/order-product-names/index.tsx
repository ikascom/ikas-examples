import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { IkasOrderLineItem } from "@ikas/storefront";

import * as S from "./style";

type OrderProductNamesProps = {
  orderLineItems: IkasOrderLineItem[];
};

const OrderProductNames = (props: OrderProductNamesProps) => {
  const productNames = useMemo(() => {
    return props.orderLineItems
      .slice(0, 3)
      .map((orderLineItem) => orderLineItem.variant.name)
      .join(" - ");
  }, [props.orderLineItems]);

  return <S.Text>{productNames}</S.Text>;
};

export default observer(OrderProductNames);
