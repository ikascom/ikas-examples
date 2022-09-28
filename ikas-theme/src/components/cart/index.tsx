import React from "react";
import { observer } from "mobx-react-lite";
import { useStore, useTranslation } from "@ikas/storefront";

import Item from "./item";
import EmptyCart from "./empty-cart";

import Button from "../components/button";
import { Container } from "../components/container";
import { CartProps } from "../__generated__/types";
import FreeShippingCarSVG from "./svg/freeShippingCar";

import * as S from "./style";

export const NS = "cart";

const Cart = (props: CartProps) => {
  const { t } = useTranslation();
  const store = useStore();
  const { cart } = store.cartStore;
  const isCartEmpty = !cart || !cart?.itemCount;
  return (
    <Container>
      {isCartEmpty && <EmptyCart />}
      {!isCartEmpty && (
        <S.Cart>
          <S.Title>
            {t(`${NS}:title`)} ({cart.itemQuantity})
          </S.Title>
          <S.Section>
            <Main />
            <Summary {...props} />
          </S.Section>
        </S.Cart>
      )}
    </Container>
  );
};

export default observer(Cart);

export const Main = () => {
  return (
    <S.Main>
      <ItemsHeader />
      <Items />
    </S.Main>
  );
};

const Items = observer(() => {
  const store = useStore();
  return (
    <S.Items>
      {store.cartStore.cart?.items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </S.Items>
  );
});

const ItemsHeader = () => {
  const { t } = useTranslation();

  return (
    <S.ItemsHeader>
      <S.ProductColumn>{t(`${NS}:header.product`)}</S.ProductColumn>
      <S.QuantityColumn>{t(`${NS}:header.quantity`)}</S.QuantityColumn>
      <S.PriceColumn>{t(`${NS}:header.amount`)}</S.PriceColumn>
      <S.RemoveColumn />
    </S.ItemsHeader>
  );
};

const Summary = observer((props: CartProps) => {
  const { t } = useTranslation();
  const store = useStore();

  const cart = store.cartStore.cart;

  return (
    <S.Summary>
      <S.SummaryBox>
        <S.BoxTitle>{t(`${NS}:summary.title`)}</S.BoxTitle>
        <S.SummaryBoxInner>
          <S.SummaryBoxText>
            <span>{t(`${NS}:summary.total`)}</span>
            <span>{cart?.formattedTotalFinalPrice}</span>
          </S.SummaryBoxText>
          <S.SummaryBoxInfo></S.SummaryBoxInfo>
          <S.SummaryButtonWrapper>
            <Button buttonType="default" block anchor href="/">
              {t(`${NS}:summary.continueShopping`)}
            </Button>
            <Button anchor block href={store.cartStore.checkoutUrl}>
              {t(`${NS}:summary.checkout`)}
            </Button>
          </S.SummaryButtonWrapper>
          {!!props.summaryText && (
            <S.SummaryFreeShippingText>
              <span>
                <FreeShippingCarSVG />
              </span>
              <span>{props.summaryText}</span>
            </S.SummaryFreeShippingText>
          )}
        </S.SummaryBoxInner>
      </S.SummaryBox>
    </S.Summary>
  );
});
