import { IkasProductList } from "@ikas/storefront";
import React from "react";

export function useTotalAppliedFiltersCount(productList: IkasProductList) {
  const appliedFiltersCount =
    productList.filters?.reduce((count, f) => {
      let sum = 0;
      f.values?.forEach((v) => {
        if (v.isSelected) {
          ++sum;
        }
      });

      return count + sum;
    }, 0) || 0;
  const appliedCategoryFiltersCount =
    productList.filterCategories?.reduce((count, fC) => {
      return count + (fC.isSelected ? 1 : 0);
    }, 0) || 0;

  const appliedCount = appliedCategoryFiltersCount + appliedFiltersCount;

  return appliedCount;
}
