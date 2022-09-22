import React from "react";
import {
  IkasDisplayedVariantType,
  IkasDisplayedVariantValue,
  IkasProduct,
  useTranslation,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import { NS } from "src/components/product-detail";
import Select, {
  SelectOnChangeParamType,
} from "src/components/components/select";
import { Swatch } from "src/components/components/swatch";
import { ProductDetailProps } from "src/components/__generated__/types";

import * as S from "../style";

export const Variants = observer(({ product }: ProductDetailProps) => {
  return (
    <S.VariantsWrapper>
      {product.displayedVariantTypes.map((dVT) => (
        <VariantType key={dVT.variantType.id} product={product} dVT={dVT} />
      ))}
    </S.VariantsWrapper>
  );
});

Variants.displayName = "Variants";

type VariantTypeProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
};

const VariantType = observer(({ dVT, product }: VariantTypeProps) => {
  return (
    <S.VariantType>
      <S.VariantTypeName>{dVT.variantType.name}</S.VariantTypeName>
      <VariantValues dVT={dVT} product={product} />
    </S.VariantType>
  );
});

type VariantValueType = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
};

const VariantValues = observer(({ dVT, product }: VariantValueType) => {
  const onVariantValueChange = (dVV: IkasDisplayedVariantValue) => {
    product.selectVariantValue(dVV.variantValue);
  };

  if (dVT.variantType.isColorSelection) {
    return (
      <SwatchVariantValue
        dVT={dVT}
        onVariantValueChange={onVariantValueChange}
      />
    );
  }
  return (
    <SelectVariantValue
      product={product}
      dVT={dVT}
      onVariantValueChange={onVariantValueChange}
    />
  );
});

type SelectVariantValueProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
  onVariantValueChange: (dVV: IkasDisplayedVariantValue) => void;
};

const SelectVariantValue = observer(
  ({ dVT, product, onVariantValueChange }: SelectVariantValueProps) => {
    const { t } = useTranslation();

    const selectOptions = dVT.displayedVariantValues.map((dVV) => ({
      value: dVV.variantValue.id,
      label: dVV.variantValue.name,
    }));

    const selectValue = product.selectedVariantValues.find(
      (sVV) => sVV.variantTypeId === dVT.variantType.id
    )?.id;

    const onChange = (value: SelectOnChangeParamType) => {
      const dVV = dVT.displayedVariantValues.find(
        (dVV) => dVV.variantValue.id === value
      );
      dVV && onVariantValueChange(dVV);
    };

    return (
      <Select
        placeholder={t(`${NS}:detail.variantType.selectPlaceholder`)}
        options={selectOptions}
        value={selectValue}
        onChange={onChange}
      />
    );
  }
);

type SwatchVariantValueProps = {
  dVT: IkasDisplayedVariantType;
  onVariantValueChange: (dVV: IkasDisplayedVariantValue) => void;
};

const SwatchVariantValue = observer(
  ({ dVT, onVariantValueChange }: SwatchVariantValueProps) => {
    return (
      <>
        {dVT.displayedVariantValues.map((dVV) => (
          <Swatch
            key={dVV.variantValue.id}
            title={dVV.variantValue.name}
            selected={dVV.isSelected}
            image={dVV.variantValue.thumbnailImage}
            colorCode={dVV.variantValue.colorCode}
            onClick={() => onVariantValueChange(dVV)}
          />
        ))}
      </>
    );
  }
);
