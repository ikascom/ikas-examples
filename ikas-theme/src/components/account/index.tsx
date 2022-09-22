import React, { useState } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import { IkasThemeJsonPageType, useStore } from "@ikas/storefront";

import { Container } from "../components/container";
import { Menu } from "./components/menu";
import { AccountInfo } from "./account-info";

import * as S from "./style";

export const NS = "account";

const AccountPage = observer(() => {
  const [hasCustomer, setHasCustomer] = useState(false);
  const router = useRouter();
  const store = useStore();

  const isAccount = store.currentPageType === IkasThemeJsonPageType.ACCOUNT;
  const isAddresses = store.currentPageType === IkasThemeJsonPageType.ADDRESSES;
  const isOrders = store.currentPageType === IkasThemeJsonPageType.ORDERS;
  const isOrderDetail =
    store.currentPageType === IkasThemeJsonPageType.ORDER_DETAIL;
  const isFavoriteProducts =
    store.currentPageType === IkasThemeJsonPageType.FAVORITE_PRODUCTS;

  React.useEffect(() => {
    store.customerStore.waitUntilInitialized().then(() => {
      if (!store.customerStore.customer) {
        router.push("/account/login");
        setHasCustomer(false);
      } else {
        setHasCustomer(true);
      }
    });
  }, [store.customerStore.customer]);

  if (!hasCustomer) return null;
  return (
    <Container>
      <S.InnerWrapper>
        <Menu />
        <S.Main>
          {isAccount && <AccountInfo />}
          {/* {isOrders && <Orders store={store} namespace={namespace} />}
        {isOrderDetail && <OrderDetail store={store} namespace={namespace} />}
        {isAddresses && <Address store={store} namespace={namespace} />}
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
