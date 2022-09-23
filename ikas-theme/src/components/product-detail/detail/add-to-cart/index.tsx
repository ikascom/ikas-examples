import React, { useState } from "react";
import { IkasProduct } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Button from "src/components/components/button";
import { BackInStock } from "./back-in-stock";
import useAddToCartButton from "./hooks/useAddToCartButton";
import { ProductDetailProps } from "src/components/__generated__/types";

import BellSVG from "./svg/bs-bell";
import BellFillSVG from "./svg/bs-bell-fill";

import * as S from "./style";

export const AddToCart = observer((props: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <S.Wrapper>
      <QuantityButton quantity={quantity} setQuantity={setQuantity} />
      <AddToCartButton product={props.product} quantity={quantity} />
      <BackInStock product={props.product} />
    </S.Wrapper>
  );
});

AddToCart.displayName = "AddToCart";

type AddToCartButtonProps = {
  product: IkasProduct;
  quantity: number;
};

const AddToCartButton = observer(
  ({ product, quantity }: AddToCartButtonProps) => {
    const {
      loading,
      buttonText,
      buttonState,
      disabled,
      isBackInStockReminderSaved,
      onButtonClick,
    } = useAddToCartButton({
      product,
      quantity,
    });

    return (
      <Button
        block
        stopPropagation
        loading={loading}
        disabled={disabled}
        onClick={onButtonClick}
      >
        {buttonText}
        {buttonState === "backInStock" && (
          <S.Icon>
            {isBackInStockReminderSaved && <BellFillSVG />}
            {!isBackInStockReminderSaved && <BellSVG />}
          </S.Icon>
        )}
      </Button>
    );
  }
);

type QuantityButtonProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const QuantityButton = ({ quantity, setQuantity }: QuantityButtonProps) => {
  const handleDecrease = () => {
    if (!(quantity > 1)) return;
    setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <S.QuantityButtonWrapper>
      <S.DecreaseButton onClick={handleDecrease}>
        <MinusSVG />
      </S.DecreaseButton>
      <S.Quantity>{quantity}</S.Quantity>
      <S.IncreaseButton onClick={handleIncrease}>
        <PlusSVG />
      </S.IncreaseButton>
    </S.QuantityButtonWrapper>
  );
};

const MinusSVG = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 4H8" stroke="#22252A" />
  </svg>
);

const PlusSVG = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 4H8" stroke="#22252A" />
    <path d="M4 8L4 2.38419e-07" stroke="#22252A" />
  </svg>
);
