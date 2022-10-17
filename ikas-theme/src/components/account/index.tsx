import React from "react";

import { observer } from "mobx-react-lite";

import { Container } from "../components/container";
import Menu from "./components/menu";

import Address from "./address";
import AccountInfo from "./account-info";
import FavoriteProducts from "./favorite-products";
import Orders from "./orders";
import OrderDetail from "./order-detail";

import useAccount from "./useAccount";

import * as S from "./style";

export const NS = "account";

const AccountPage = () => {
  const {
    hasCustomer,
    isAccount,
    isFavoriteProducts,
    isAddresses,
    isOrderDetail,
    isOrders,
  } = useAccount();

  if (!hasCustomer) return null;
  return (
    <Container>
      <S.InnerWrapper>
        <Menu />
        <S.Main>
          {isAccount && <AccountInfo />}
          {isAddresses && <Address />}
          {isFavoriteProducts && <FavoriteProducts />}
          {isOrders && <Orders />}
          {isOrderDetail && <OrderDetail />}
        </S.Main>
      </S.InnerWrapper>
    </Container>
  );
};

export default observer(AccountPage);
