import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "@ikas/storefront";

import Col from "src/components/components/grid/col";
import Row from "src/components/components/grid/row";
import Input from "src/components/components/input";

import { FiltersProps } from "../index/index";
import { FiltersWrapper } from "../components/filters-wrapper";
import useNumberRange from "./useNumberRange";

type NumberRangeFiltersProps = {
  currency: string;
} & FiltersProps;

export const NumberRangeFilters = observer((props: NumberRangeFiltersProps) => {
  const { filter, lastChild, currency } = props;
  const { t } = useTranslation();
  const { state, prefix, onBlur } = useNumberRange({
    filter,
    currency,
  });

  return (
    <FiltersWrapper
      settings={filter.settings}
      title={filter.name}
      noBorder={lastChild}
    >
      <Row gutter={24}>
        <Col span={12}>
          <span>{t("productList.numberRangeFilters.from")}</span>
          <Input
            type="number"
            min={filter.numberRangeLimit?.from || 0}
            max={filter.numberRangeLimit?.to || undefined}
            prefix={prefix}
            value={state.valueFrom}
            onChange={(event) => {
              state.valueFrom = +event.target.value;
            }}
            onBlur={onBlur}
          />
        </Col>
        <Col span={12}>
          <span>{t("productList.numberRangeFilters.to")}</span>
          <Input
            min={0}
            max={filter.numberRangeLimit?.to || undefined}
            type="number"
            prefix={prefix}
            value={state.valueTo}
            onChange={(event) => {
              state.valueTo = +event.target.value;
            }}
            onBlur={onBlur}
          />
        </Col>
      </Row>
    </FiltersWrapper>
  );
});
