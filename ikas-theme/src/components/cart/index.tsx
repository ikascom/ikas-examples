import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  formatCurrency,
  IkasAdjustmentType,
  IkasCart,
  useStore,
  useTranslation,
} from "@ikas/storefront";
import { APIErrorCode } from "@ikas/fe-api-client";

import Item from "./item";
import EmptyCart from "./empty-cart";

import Button from "../components/button";
import { Container } from "../components/container";
import { CartProps } from "../__generated__/types";
import FreeShippingCarSVG from "./svg/freeShippingCar";

import * as S from "./style";
import FormItem from "../components/form/form-item";
import Form from "../components/form";
import Input from "../components/input";
import Row from "../components/grid/row";
import Col from "../components/grid/col";
import Modal from "../components/modal";

export const NS = "cart";

const Cart = (props: CartProps) => {
  const { t } = useTranslation();
  const store = useStore();
  const { cart } = store.cartStore;
  const isCartEmpty = !cart || !cart?.itemCount;
  const title = `${t(`${NS}:title`)} (${cart?.itemQuantity || 0})`;
  return (
    <Container>
      {isCartEmpty && <EmptyCart />}
      {!isCartEmpty && (
        <S.Cart>
          <S.Title>{title}</S.Title>
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

  const subTotal = (
    <S.SummaryBoxText>
      <span>{t(`${NS}:summary.subTotal`)}</span>
      <span>{cart?.formattedTotalPrice}</span>
    </S.SummaryBoxText>
  );

  const totalFinalPrice = (
    <S.TotalFinalPrice>
      <span>{t(`${NS}:summary.total`)}</span>
      <span>{cart?.formattedTotalFinalPrice}</span>
    </S.TotalFinalPrice>
  );

  const summaryButtons = (
    <S.SummaryButtonWrapper>
      <Button buttonType="default" block anchor href="/">
        {t(`${NS}:summary.continueShopping`)}
      </Button>
      <Button anchor block href={store.cartStore.checkoutUrl}>
        {t(`${NS}:summary.checkout`)}
      </Button>
    </S.SummaryButtonWrapper>
  );

  const summaryText = !!props.summaryText ? (
    <S.SummaryFreeShippingText>
      <span>
        <FreeShippingCarSVG />
      </span>
      <span>{props.summaryText}</span>
    </S.SummaryFreeShippingText>
  ) : null;

  return (
    <S.Summary>
      <S.SummaryBox>
        <S.BoxTitle>{t(`${NS}:summary.title`)}</S.BoxTitle>
        <S.SummaryBoxInner>
          {subTotal}
          <Adjustments cart={cart} />
          {totalFinalPrice}
          <Coupon />
          {summaryButtons}
          {summaryText}
        </S.SummaryBoxInner>
      </S.SummaryBox>
    </S.Summary>
  );
});

const Adjustments = observer(
  ({ cart }: { cart: IkasCart | null | undefined }) => {
    return (
      <>
        {cart?.orderAdjustments?.map((adjustment, index) => {
          const price = formatCurrency(
            adjustment.amount,
            cart.currencyCode,
            cart.currencySymbol
          );
          return (
            <S.SummaryBoxText key={index}>
              <span>{adjustment.name}</span>
              <span>
                {adjustment.type === IkasAdjustmentType.DECREMENT ? "-" : "+"}
                {price}
              </span>
            </S.SummaryBoxText>
          );
        })}
      </>
    );
  }
);

const Coupon = observer(() => {
  const { t } = useTranslation();
  const {
    cart,
    pending,
    addCoupon,
    modalText,
    modalVisible,
    removeCoupon,
    couponValue,
    setCouponValue,
    onModalClose,
  } = useCoupon();

  const inputPlaceholder =
    cart?.couponCode || t(`${NS}:coupon.form.couponCode`);
  const inputStyle = cart?.couponCode
    ? { paddingRight: `${S.REMOVE_COUPON_BUTTON_WIDTH + 5}px` }
    : undefined;

  return (
    <S.Coupon>
      <Form onSubmit={addCoupon}>
        <Row align="flex-end" gutter={[8]}>
          <Col span={16}>
            <FormItem noMargin style={{ position: "relative" }}>
              <Input
                placeholder={inputPlaceholder}
                value={couponValue}
                style={inputStyle}
                onChange={(event) => {
                  setCouponValue(event.target.value);
                }}
              />
              {!!cart?.couponCode && (
                <S.RemoveCouponButton
                  title={t(`${NS}:coupon.form.removeCoupon`)}
                  type="button"
                  onClick={removeCoupon}
                >
                  <RemoveCouponSVG />
                </S.RemoveCouponButton>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <Button
              block
              type="submit"
              size="small"
              loading={pending}
              disabled={pending || !couponValue}
            >
              {t(`${NS}:coupon.form.submit`)}
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal visible={modalVisible} onClose={onModalClose}>
        <p>{modalText}</p>
      </Modal>
    </S.Coupon>
  );
});

function useCoupon() {
  const store = useStore();
  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  const [couponValue, setCouponValue] = useState<string>("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState<string>();

  const cart = store.cartStore.cart;

  const addCoupon = async () => {
    setPending(true);
    const result = await store.cartStore.saveCouponCode(couponValue);
    setPending(false);
    setCouponValue("");

    if (!result.success && result.response) {
      const couponError = result?.response?.errorCodes.findIndex(
        (code) => code === ("COUPON_CODE_NOT_EXIST" as APIErrorCode)
      );

      if (couponError !== -1) {
        setModalText(t(`${NS}:coupon.error.couponCodeNotExist`));
      } else {
        setModalText(t(`${NS}:coupon.error.unknown`));
      }
      setModalVisible(true);
      return;
    }
  };

  const removeCoupon = async () => {
    setPending(true);
    await store.cartStore.saveCouponCode(null);
    setPending(false);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setModalText("");
  };

  return {
    pending,
    cart,
    modalVisible,
    modalText,
    addCoupon,
    removeCoupon,
    couponValue,
    setCouponValue,
    onModalClose,
  };
}

export const RemoveCouponSVG = () => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    stroke-linejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
    <line x1="18" y1="9" x2="12" y2="15"></line>
    <line x1="12" y1="9" x2="18" y2="15"></line>
  </svg>
);
