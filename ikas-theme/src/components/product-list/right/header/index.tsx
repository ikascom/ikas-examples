import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { IkasProductList, useTranslation } from "@ikas/storefront";

import { useScreen } from "src/utils/hooks/useScreen";
import Sort from "../sort";

import Modal from "src/components/components/modal";
import { Categories } from "../../components/categories";
import { Filters } from "../../components/filters/index/index";
import { FiltersMainTitle } from "../../components/filters/components/filters-main-title";

import { FilterSVG } from "../svg/filter";
import { SortSVG } from "../svg/sort";

import * as S from "./style";

type HeaderProps = {
  productList: IkasProductList;
};

export const Header = observer((props: HeaderProps) => {
  const { productList } = props;
  const { t } = useTranslation();
  const { isMobile } = useScreen();

  const totalProductCount = t(`productList.totalProductCount`, {
    count: productList.count || "0",
  });

  if (isMobile) return <MobileHeader {...props} />;
  return (
    <S.Header>
      <S.TotalProductCount>{totalProductCount}</S.TotalProductCount>
      <Sort productList={productList} />
    </S.Header>
  );
});

const MobileHeader = observer(({ productList }: HeaderProps) => {
  const { t } = useTranslation();
  const [activeModal, setModal] = useState<"sort" | "filter" | null>(null);
  const totalProductCount = t(`productList.totalProductCount`, {
    count: productList.count || "0",
  });

  const onModalClose = () => {
    setModal(null);
  };
  return (
    <S.MobileHeader>
      <S.MobileHeaderActionWrapper>
        <S.MobileHeaderButton onClick={() => setModal("filter")}>
          <FilterSVG /> {t("productList.header.filter")}
        </S.MobileHeaderButton>
        <S.MobileHeaderDivider />
        <S.MobileHeaderButton onClick={() => setModal("sort")}>
          {t("productList.header.sort")} <SortSVG />
        </S.MobileHeaderButton>
      </S.MobileHeaderActionWrapper>
      <S.TotalProductCount>{totalProductCount}</S.TotalProductCount>
      {activeModal === "filter" && (
        <FilterModal productList={productList} onClose={onModalClose} />
      )}
      {activeModal === "sort" && (
        <SortModal productList={productList} onClose={onModalClose} />
      )}
    </S.MobileHeader>
  );
});

type FilterModalProps = {
  productList: IkasProductList;
  onClose: () => void;
};

const FilterModal = ({ productList, onClose }: FilterModalProps) => {
  return (
    <Modal visible={true} onClose={onClose}>
      <FiltersMainTitle productList={productList} />
      <Categories productList={productList} />
      <Filters productList={productList} />
    </Modal>
  );
};

type SortModalProps = {
  productList: IkasProductList;
  onClose: () => void;
};

const SortModal = ({ productList, onClose }: SortModalProps) => {
  return (
    <Modal visible={true} onClose={onClose}>
      <Sort productList={productList} />
    </Modal>
  );
};
