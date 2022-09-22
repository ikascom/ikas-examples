import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { makeAutoObservable } from "mobx";
import {
  IkasProduct,
  IkasProductOption,
  IkasProductOptionType,
} from "@ikas/storefront";

import ProductOptionText from "./text";
import ProductOptionTextarea from "./textarea";
import ProductOptionCheckbox from "./checkbox";
import ProductOptionChoice from "./choice";
import ProductOptionColorPicker from "./color-picker";
import ProductOptionDatePicker from "./date-picker";
import ProductOptionFile from "./file-picker";

import { ProductDetailProps } from "src/components/__generated__/types";
import { NS } from "src/components/product-detail";

export const ProductOptions = observer((props: ProductDetailProps) => {
  if (!props.product.productOptionSet) return null;
  const showOptionError = ProductOptionsStore.getInstance().showOptionError;

  return (
    <div aria-label="product-options">
      {props.product.productOptionSet.displayedOptions.map((option, index) => (
        <ProductOption
          key={index + option.id}
          depth={0}
          option={option}
          product={props.product}
          showOptionError={showOptionError}
        />
      ))}
    </div>
  );
});

ProductOptions.displayName = "ProductOptions";

type Props = {
  depth: number;
  showOptionError: boolean;
  option: IkasProductOption;
  product: IkasProduct;
};

const ProductOption: React.FC<Props> = observer(
  ({ showOptionError, option, product, depth, ...props }) => {
    const subNS = `${NS}:detail.productOptions`;
    const [Option, setOption] = React.useState<React.FC<{
      namespace: string;
      option: IkasProductOption;
      product: IkasProduct;
      showOptionError: boolean;
    }> | null>(null);

    useEffect(() => {
      switch (option.type) {
        case IkasProductOptionType.TEXT:
          setOption(ProductOptionText);
          break;
        case IkasProductOptionType.TEXT_AREA:
          setOption(ProductOptionTextarea);
          break;
        case IkasProductOptionType.CHECKBOX:
          setOption(ProductOptionCheckbox);
          break;
        case IkasProductOptionType.CHOICE:
          setOption(ProductOptionChoice);
          break;
        case IkasProductOptionType.COLOR_PICKER:
          setOption(ProductOptionColorPicker);
          break;
        case IkasProductOptionType.DATE_PICKER:
          setOption(ProductOptionDatePicker);
          break;
        case IkasProductOptionType.FILE:
          setOption(ProductOptionFile);
          break;
      }
    }, [option, product, showOptionError]);

    return (
      <>
        {!!Option && (
          <Option
            namespace={subNS}
            option={option}
            product={product}
            showOptionError={showOptionError}
          />
        )}
        {option.displayedChildOptions.length > 0 &&
          option.displayedChildOptions.map((childOption) => (
            <ProductOption
              key={`${depth}-${childOption.id}`}
              depth={depth + 1}
              option={childOption}
              product={product}
              showOptionError={showOptionError}
            />
          ))}
      </>
    );
  }
);

export class ProductOptionsStore {
  private static _instance: ProductOptionsStore;
  showOptionError = false;

  private constructor() {
    makeAutoObservable(this);
  }

  static getInstance() {
    if (this._instance) return this._instance;
    this._instance = new ProductOptionsStore();
    return this._instance;
  }
}
