import React from "react";
import { observer } from "mobx-react-lite";
import {
  formatCurrency,
  IkasProductFilter,
  IkasProductFilterNumberRangeListOption,
  useTranslation,
} from "@ikas/storefront";

import { Box } from "../box/style";
import { FiltersProps } from "../index/index";
import { FiltersWrapper } from "../components/filters-wrapper";

import * as S from "./style";

type Props = {
  currency: string;
  currencySymbol: string;
} & FiltersProps;

export const NumberRangeListFilter = observer(
  ({ filter, currency, currencySymbol, lastChild }: Props) => {
    if (!filter.displayedValues || !filter.displayedValues.length) return null;
    return (
      <FiltersWrapper
        settings={filter.settings}
        title={filter.name}
        noBorder={lastChild}
      >
        <S.Wrapper>
          {filter.numberRangeListOptions?.map((option, index) => (
            <NumberRangeList
              key={index}
              option={option}
              filter={filter}
              currency={currency}
              currencySymbol={currencySymbol}
            />
          ))}
        </S.Wrapper>
      </FiltersWrapper>
    );
  }
);

type NumberRangeListProps = {
  filter: IkasProductFilter;
  option: IkasProductFilterNumberRangeListOption;
  currency: string;
  currencySymbol: string;
};

const NumberRangeList = observer(
  ({ option, filter, currency, currencySymbol }: NumberRangeListProps) => {
    const { t } = useTranslation();
    const price = (price: number) =>
      formatCurrency(price, currency, currencySymbol);
    return (
      <Box
        $selected={option.isSelected}
        onClick={() => filter.onNumberRangeClick(option)}
      >
        {!option.to && (
          <>
            {t("productList.numberRangeListFilters.priceAndMore", {
              price: price(option.from),
            })}
          </>
        )}
        {option.to && `${price(option.from)} - ${price(option.to)}`}
      </Box>
    );
  }
);
