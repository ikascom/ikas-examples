import { IkasProductFilter, IkasProductFilterType } from "@ikas/storefront";
import { observable } from "mobx";
import React, { useState } from "react";

type Props = {
  currency: string;
  filter: IkasProductFilter;
};

function useNumberRange({ currency, filter }: Props) {
  const [state] = useState(
    observable({
      valueFrom: filter?.numberRangeLimit
        ? filter.numberRangeLimit.from ?? 0
        : 0,
      valueTo: filter?.numberRangeLimit ? filter?.numberRangeLimit?.to ?? 0 : 0,
    })
  );

  const prefix =
    filter.type === IkasProductFilterType.DISCOUNT_RATIO ? "%" : currency;

  const onBlur = () => {
    const isNull = (value: any) =>
      typeof value === "undefined" || typeof value === null;

    const from = filter!.numberRangeLimit!.from;
    const to =
      typeof filter!.numberRangeLimit!.to === "number"
        ? filter!.numberRangeLimit!.to
        : state.valueFrom;
    if (isNull(to)) return;

    if (state.valueFrom < from) state.valueFrom = from;
    if (state.valueFrom > to) state.valueTo = to;

    filter?.onNumberRangeChange({
      from: state.valueFrom,
      to: state.valueTo,
    });
  };

  return {
    state,
    prefix,
    onBlur,
  };
}

export default useNumberRange;
