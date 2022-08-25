import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasProduct,
  IkasProductOption,
  useTranslation,
} from "@ikas/storefront";

import OptionTitle from "../common/option-title";
import FormItem from "src/components/components/form/form-item";
import { DatePicker } from "src/components/components/input";
import { formattedOptionPrice } from "../common/option-price";
import useDatePicker from "./hooks/useDatePicker";

type Props = {
  showOptionError: boolean;
  namespace: string;
  option: IkasProductOption;
  product: IkasProduct;
};

export const SET_HOURS: [
  hours: number,
  min?: number | undefined,
  sec?: number | undefined,
  ms?: number | undefined
] = [23, 59, 0, 0];

const ProductOptionDatePicker: React.FC<Props> = ({
  showOptionError,
  namespace,
  option,
  product,
}) => {
  const { t } = useTranslation();
  const {
    minDate,
    maxDate,
    selectedDate,
    checkAndSetEnteredValueToSelectedDate,
  } = useDatePicker({ option });

  const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value) return;
    checkAndSetEnteredValueToSelectedDate(value);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value) return;
    checkAndSetEnteredValueToSelectedDate(value);
  };

  const optionTitlePrice = formattedOptionPrice(option.price, product);
  const hasFormError = showOptionError && !option.hasValidValues;
  const status = hasFormError ? "error" : undefined;

  return (
    <div>
      <OptionTitle
        name={option.name}
        isOptional={option.isOptional}
        price={optionTitlePrice}
        hasError={hasFormError}
      />
      <FormItem
        status={status}
        help={hasFormError ? t(`${namespace}.common.settings.required`) : ""}
      >
        <DatePicker
          min={minDate?.toISOString().split("T")[0]}
          max={maxDate?.toISOString().split("T")[0]}
          status={status}
          value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
          onChange={onInputChange}
          onBlur={onInputBlur}
        />
      </FormItem>
    </div>
  );
};

export default observer(ProductOptionDatePicker);
