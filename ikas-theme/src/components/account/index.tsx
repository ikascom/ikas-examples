import React from "react";

import { observer } from "mobx-react-lite";

import { Container } from "../components/container";
import { Menu } from "./components/menu";
import { AccountInfo } from "./account-info";
import Address from "./address";
import useAccount from "./useAccount";

import * as S from "./style";

export const NS = "account";

const AccountPage = observer(() => {
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
          {/* {isOrders && <Orders store={store} namespace={namespace} />}
        {isOrderDetail && <OrderDetail store={store} namespace={namespace} />}
        {isFavoriteProducts && (
          <FavoriteProducts
            isMobile={isMobile}
            namespace={namespace}
            store={store}
          />
        )} */}
        </S.Main>
      </S.InnerWrapper>
    </Container>
  );
});

export default AccountPage;
