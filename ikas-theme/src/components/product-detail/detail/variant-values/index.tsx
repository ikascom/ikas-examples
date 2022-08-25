import React from "react";
import {
  IkasDisplayedVariantType,
  IkasDisplayedVariantValue,
  IkasProduct,
  IkasVariantSelectionType,
  IkasVariantValue,
  useTranslation,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Select from "src/components/components/select";
import { ProductDetailProps } from "src/components/__generated__/types";
import { NS } from "src/components/product-detail";

import * as S from "../style";

export const VariantValues = observer((props: ProductDetailProps) => {
  const onVariantSelect = (value: IkasVariantValue) => {
    props.product.selectVariantValue(value);
  };

  return (
    <S.VariantValuesWrapper>
      {props.product.displayedVariantTypes.map((dVT) => (
        <VariantType
          key={dVT.variantType.id}
          product={props.product}
          dVT={dVT}
          onVariantValueChange={onVariantSelect}
        />
      ))}
    </S.VariantValuesWrapper>
  );
});

VariantValues.displayName = "VariantValues";

type VariantTypeProps = {
  product: IkasProduct;
  dVT: IkasDisplayedVariantType;
  onVariantValueChange: (value: IkasVariantValue) => void;
};

const VariantType = ({ dVT, product, ...props }: VariantTypeProps) => {
  const { t } = useTranslation();

  const onVariantValueChange = (vVId: string) => {
    const variantValue = dVT.displayedVariantValues.find(
      (dVV) => dVV.variantValue.id === vVId
    )?.variantValue;
    if (variantValue) props.onVariantValueChange(variantValue);
  };

  if (dVT.variantType.isColorSelection) {
    return (
      <S.VariantType>
        <S.VariantTypeName>{dVT.variantType.name}</S.VariantTypeName>
        {dVT.displayedVariantValues.map((dVV) => (
          <VariantValue
            key={dVV.variantValue.id}
            type={dVT.variantType.selectionType}
            dVV={dVV}
            onVariantValueChange={onVariantValueChange}
          />
        ))}
      </S.VariantType>
    );
  }

  const selectOptions = dVT.displayedVariantValues.map((dVV) => ({
    value: dVV.variantValue.id,
    label: dVV.variantValue.name,
  }));
  const selectValue = product.selectedVariantValues.find(
    (sVV) => sVV.variantTypeId === dVT.variantType.id
  )?.id;

  return (
    <S.VariantType>
      <S.VariantTypeName>{dVT.variantType.name}</S.VariantTypeName>
      <Select
        placeholder={t(`${NS}:detail.variantType.selectPlaceholder`)}
        options={selectOptions}
        value={selectValue}
        onChange={onVariantValueChange}
      />
    </S.VariantType>
  );
};

type VariantValueType = {
  type: IkasVariantSelectionType;
  dVV: IkasDisplayedVariantValue;
  onVariantValueChange: (vVId: string) => void;
};

const VariantValue = ({ dVV, type, ...props }: VariantValueType) => {
  // render also Box type
  const onClick = () => {
    props.onVariantValueChange(dVV.variantValue.id);
  };

  if (dVV.variantValue.thumbnailImage?.id) {
    return (
      <S.ImageSwatch title={dVV.variantValue.name} onClick={onClick}>
        <S.ImageSwatchImg
          src={dVV.variantValue.thumbnailImage?.thumbnailSrc}
          $isSelected={dVV.isSelected}
        />
      </S.ImageSwatch>
    );
  }

  return (
    <S.ColorSwatch
      title={dVV.variantValue.name}
      $isSelected={dVV.isSelected}
      $color={dVV.variantValue.colorCode || ""}
      onClick={onClick}
    />
  );
};
