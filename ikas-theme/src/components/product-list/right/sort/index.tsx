import React from "react";
import { observer } from "mobx-react-lite";
import {
  IkasProductList,
  IkasProductListSortType,
  useTranslation,
} from "@ikas/storefront";

import Loading from "src/components/svg/loading";
import ChevronDownSVG from "src/components/svg/chevron-down";

import * as S from "./style";

type Props = {
  productList: IkasProductList;
};

const Sorting: React.FC<Props> = (props: Props) => {
  return (
    <S.Sort>
      <Label />
      <SortSelect {...props} />
    </S.Sort>
  );
};

export default observer(Sorting);

const SortSelect = observer(({ productList }: Props) => {
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (productList.isLoading) return;
    productList.setSortType(e.target.value as IkasProductListSortType);
  };

  const enabledOptions = options.filter((option) => {
    const isFeaturedSort = option.value === IkasProductListSortType.FEATURED;
    const isFeaturedSortEnabled =
      isFeaturedSort && !productList.isFeaturedSortEnabled;

    return isFeaturedSort ? isFeaturedSortEnabled : true;
  });

  return (
    <S.SelectWrapper>
      <S.Select
        id="product-list-sort-select"
        name="product-list-sort-select"
        value={productList.sort}
        onChange={onSelectChange}
      >
        {enabledOptions.map((option) => (
          <Option key={option.value} option={option} />
        ))}
      </S.Select>
      <S.SelectIcon>
        {productList.isLoading ? <Loading /> : <ChevronDownSVG />}
      </S.SelectIcon>
    </S.SelectWrapper>
  );
});

const Option = observer(({ option }: { option: Option }) => {
  const { t } = useTranslation();
  return (
    <S.Option value={option.value}>
      {t(`productList.sort.${option.labelKey}`)}
    </S.Option>
  );
});

const Label = () => {
  const { t } = useTranslation();

  return (
    <S.Label htmlFor="product-list-sort-select">
      {t(`productList.sort.label`)}:
    </S.Label>
  );
};

type Option = {
  value: string;
  labelKey: string;
};

const options: Option[] = [
  {
    value: IkasProductListSortType.FEATURED,
    labelKey: "featured",
  },
  {
    labelKey: "increasingPrice",
    value: IkasProductListSortType.INCREASING_PRICE,
  },
  {
    labelKey: "decreasingPrice",
    value: IkasProductListSortType.DECREASING_PRICE,
  },
  {
    labelKey: "increasingDiscount",
    value: IkasProductListSortType.INCREASING_DISCOUNT,
  },
  {
    labelKey: "decrasingDiscount",
    value: IkasProductListSortType.DECRASING_DISCOUNT,
  },
  {
    labelKey: "firstAdded",
    value: IkasProductListSortType.FIRST_ADDED,
  },
  {
    labelKey: "lastAdded",
    value: IkasProductListSortType.LAST_ADDED,
  },
];
