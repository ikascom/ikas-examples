import React from "react";
import { useTranslation } from "@ikas/storefront";

import Button from "src/components/components/button";

import { NS } from "..";

import * as S from "./style";

const EmptyCart = () => {
  const { t } = useTranslation();
  return (
    <S.EmptyCart>
      <S.Text>{t(`${NS}:emptyCart.text`)}</S.Text>
      <Button anchor href="/">
        {t(`${NS}:emptyCart.button`)}
      </Button>
    </S.EmptyCart>
  );
};

export default EmptyCart;
