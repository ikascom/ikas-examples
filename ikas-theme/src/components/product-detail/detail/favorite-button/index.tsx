import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "@ikas/storefront";

import useFavorite from "./useFavorite";
import Tooltip from "src/components/components/tooltip";
import { ProductDetailProps } from "src/components/__generated__/types";
import { Loading } from "src/components/components/button";
import { NS } from "src/components/product-detail";
import ModalLoginRequired from "./modal-login-required";

import FavoriteSVG from "src/components/svg/favorite";

import * as S from "../style";

export const FavoriteButton = observer(({ product }: ProductDetailProps) => {
  const { t } = useTranslation();
  const {
    isProductFavorite,
    showLoginModal,
    closeLoginModal,
    pending,
    toggleFavorite,
  } = useFavorite({
    productId: product.id,
  });

  const tooltipText = isProductFavorite
    ? t(`${NS}:detail.favorite.tooltipText.remove`)
    : t(`${NS}:detail.favorite.tooltipText.add`);

  const modalLoginText = (key: string) =>
    t(`${NS}:detail.favorite.loginModal.${key}`);

  return (
    <>
      <S.FavoriteButton disabled={pending} onClick={toggleFavorite}>
        <Tooltip noCursor text={tooltipText} placement="left">
          {pending && <Loading />}
          {!pending && <FavoriteSVG fill={isProductFavorite} />}
        </Tooltip>
      </S.FavoriteButton>
      <ModalLoginRequired
        isModalVisible={showLoginModal}
        title={modalLoginText("title")}
        text={modalLoginText("text")}
        loginButtonText={modalLoginText("loginButtonText")}
        noAccountText={modalLoginText("noAccountText")}
        redirectUrl={product.href}
        onClose={closeLoginModal}
      />
    </>
  );
});

FavoriteButton.displayName = "FavoriteButton";
