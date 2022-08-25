import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "@ikas/storefront";

import useFavorite from "./useFavorite";
import Tooltip from "src/components/components/tooltip";
import { ProductDetailProps } from "src/components/__generated__/types";
import { Loading } from "src/components/components/button";
import { NS } from "src/components/product-detail";

import FavoriteSVG from "src/components/svg/favorite";

import * as S from "../style";

export const FavoriteButton = observer(({ product }: ProductDetailProps) => {
  const { t } = useTranslation();
  const { isProductFavorite, showLoginModal, pending, toggleFavorite } =
    useFavorite({
      productId: product.id,
    });

  const tooltipText = isProductFavorite
    ? t(`${NS}:detail.favorite.tooltipText.remove`)
    : t(`${NS}:detail.favorite.tooltipText.add`);

  return (
    <>
      <S.FavoriteButton disabled={pending} onClick={toggleFavorite}>
        <Tooltip noCursor text={tooltipText} placement="left">
          {pending && <Loading />}
          {!pending && <FavoriteSVG fill={isProductFavorite} />}
        </Tooltip>
      </S.FavoriteButton>
    </>
  );
});

FavoriteButton.displayName = "FavoriteButton";
