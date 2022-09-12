import {
  IkasProductFilter,
  IkasProductFilterDisplayType,
  IkasProductList,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { BoxFilters } from "../box";
import { ListFilters } from "../list";
import { NumberRangeFilters } from "../number-range";
import { NumberRangeListFilter } from "../number-range-list";
import { SwatchFilters } from "../swatch";

export type FiltersProps = {
  filter: IkasProductFilter;
  lastChild: boolean;
};

type FiltersComponentProps = {
  productList: IkasProductList;
};

export const Filters = observer(({ productList }: FiltersComponentProps) => {
  const currencySymbol = productList.data[0]
    ? productList.data[0].selectedVariant.price.currencySymbol || ""
    : "";
  const currency = productList.data[0]
    ? productList.data[0].selectedVariant?.price.currency || ""
    : "";

  const renderFilters = productList.filters?.map((filter, index) => {
    const filterProps = {
      key: filter.id,
      filter,
      lastChild: index + 1 === productList.filters?.length,
    };

    switch (filter.displayType) {
      case IkasProductFilterDisplayType.BOX:
        return <BoxFilters {...filterProps} />;
      case IkasProductFilterDisplayType.LIST:
        return <ListFilters {...filterProps} />;
      case IkasProductFilterDisplayType.NUMBER_RANGE:
        return <NumberRangeFilters {...filterProps} currency={currency} />;
      case IkasProductFilterDisplayType.NUMBER_RANGE_LIST:
        return (
          <NumberRangeListFilter
            {...filterProps}
            currencySymbol={currencySymbol}
            currency={currency}
          />
        );
      case IkasProductFilterDisplayType.SWATCH:
        return <SwatchFilters {...filterProps} />;
      // case IkasProductFilterDisplayType.DATE_RANGE:
      //   return <DateRangeFilters {...filterProps} />;
      default:
        return null;
    }
  });

  return <>{renderFilters}</>;
});

const DateRangeFilters = observer((props: FiltersProps) => {
  return <div />;
});
