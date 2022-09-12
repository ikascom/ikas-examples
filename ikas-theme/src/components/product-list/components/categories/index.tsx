import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProductList, useTranslation } from "@ikas/storefront";

import { FiltersWrapper } from "../filters/components/filters-wrapper";
import { FilterCheckbox } from "../filters/components/filter-checkbox";

type CategoriesProps = {
  productList: IkasProductList;
};

export const Categories = observer(({ productList }: CategoriesProps) => {
  const { t } = useTranslation();
  if (!productList.filterCategories?.length) return null;
  return (
    <FiltersWrapper title={t("productList.categories")}>
      {productList.filterCategories.map((filterCategory) => (
        <FilterCheckbox
          key={filterCategory.id}
          checked={filterCategory.isSelected}
          label={filterCategory.name}
          resultCount={filterCategory.resultCount || 0}
          onChange={() =>
            productList.onFilterCategoryClick(filterCategory, true)
          }
        />
      ))}
    </FiltersWrapper>
  );
});
