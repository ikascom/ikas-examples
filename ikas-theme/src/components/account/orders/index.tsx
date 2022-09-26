import Reac from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "@ikas/storefront";

import useOrders from "./useOrders";
import Order from "./order";
import Header from "src/components/account/components/header";
import Loading from "../components/loading";
import Button from "src/components/components/button";

import { NS } from "src/components/account";

import * as S from "./style";

const Orders = () => {
  const { t } = useTranslation();
  const { isPending, orders } = useOrders();

  const headerTitle = `${t(`${NS}:orders.title`)} (${orders.length})`;

  return (
    <div>
      <Header title={headerTitle} />
      {isPending && <Loading>{t(`${NS}:loading`)}</Loading>}
      {!isPending && !!orders.length && (
        <S.Orders>
          {orders.map((order: any) => (
            <Order key={order.id} order={order} />
          ))}
        </S.Orders>
      )}
      {!isPending && orders.length === 0 && (
        <S.NoOrders>
          <S.NoOrdersText>{t(`${NS}:orders.noOrders`)}</S.NoOrdersText>
          <Button anchor href="/">
            {t(`${NS}:orders.startShopping`)}
          </Button>
        </S.NoOrders>
      )}
    </div>
  );
};

export default observer(Orders);
