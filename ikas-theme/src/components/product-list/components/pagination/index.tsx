import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProductList, useTranslation } from "@ikas/storefront";

import * as S from "./style";

type Props = {
  productList: IkasProductList;
};

export const Pagination = observer(({ productList }: Props) => {
  const { t } = useTranslation();

  const loading = productList.isLoading;
  const prevButtonDisabled = loading || !productList.hasPrev;
  const nextButtonDisabled = loading || !productList.hasNext;

  const getPage = async (page: number) => {
    if (productList.isLoading) return;
    await productList.getPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onPreviousClick = () => {
    if (!productList.hasPrev) return;
    getPage(productList.page - 1);
  };

  const onNextClick = () => {
    if (!productList.hasNext) return;
    getPage(productList.page + 1);
  };

  return (
    <S.Pagination>
      <S.PrevButton
        disabled={prevButtonDisabled}
        title={t("productList.pagination.previousPage")}
        onClick={onPreviousClick}
      >
        {t("productList.pagination.prev")}
      </S.PrevButton>
      <div>
        {productList.page} / {productList.pageCount}
      </div>
      <S.NextButton
        disabled={nextButtonDisabled}
        title={t("productList.pagination.nextPage")}
        onClick={onNextClick}
      >
        {t("productList.pagination.next")}
      </S.NextButton>
    </S.Pagination>
  );
});
