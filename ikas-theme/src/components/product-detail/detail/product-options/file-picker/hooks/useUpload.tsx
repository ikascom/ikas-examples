import { IkasProductOption } from "@ikas/storefront";
import React, { useState } from "react";

type Props = {
  option: IkasProductOption;
};

export function useUpload({ option }: Props) {
  const hasFileSettings = !!option.fileSettings;
  const isNoMaxLimit =
    hasFileSettings && option.fileSettings?.maxQuantity === null;
  const isNoMinAndMaxQuantityBiggerOne = hasFileSettings
    ? (option.fileSettings?.minQuantity === null &&
        option.fileSettings?.maxQuantity) ||
      0 > 1
    : true;
  const isMinAndMaxExistAndMultiple = hasFileSettings
    ? option.fileSettings?.maxQuantity &&
      option.fileSettings?.minQuantity &&
      option.fileSettings.maxQuantity - option.fileSettings.minQuantity > 1
    : true;
  const multiple = hasFileSettings
    ? !!isNoMaxLimit ||
      !!isNoMinAndMaxQuantityBiggerOne ||
      !!isMinAndMaxExistAndMultiple
    : true;

  return {
    multiple,
  };
}
