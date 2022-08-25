import { IkasProductOption, IkasProductOptionType } from "@ikas/storefront";
import { TFunction } from "@ikas/storefront/build/utils/i18n";
import { NS } from "src/components/product-detail";

type Props = {
  option: IkasProductOption;
  t: TFunction;
};

type ReturnType = string | undefined;

export function optionSettingsText({ option, t }: Props): ReturnType {
  const ns = NS + ":detail.productOptions.common.settings";

  switch (option.type) {
    case IkasProductOptionType.TEXT:
    case IkasProductOptionType.TEXT_AREA:
      if (
        !option.isOptional &&
        !option.textSettings?.min &&
        !option.textSettings?.max
      ) {
        return t(`${ns}.min`, { min: 1 });
      }
      if (!option.textSettings) return;

      if (option.textSettings.min && !option.textSettings.max) {
        return t(`${ns}.min`, {
          min: option.textSettings.min,
        });
      }

      if (!option.textSettings.min && option.textSettings.max) {
        if (!option.isOptional) {
          return t(`${ns}.minMax`, {
            min: 1,
            max: option.textSettings.max,
          });
        }

        return t(`${ns}.max`, {
          max: option.textSettings.max,
        });
      }

      if (option.textSettings.min && option.textSettings.max) {
        return t(`${ns}.minMax`, {
          min: option.textSettings.min,
          max: option.textSettings.max,
        });
      }
      break;
    case IkasProductOptionType.CHECKBOX:
      break;
    case IkasProductOptionType.CHOICE:
      if (
        !option.isOptional &&
        !option.selectSettings?.minSelect &&
        !option.selectSettings?.maxSelect
      ) {
        return t(`${ns}.selectMin`, { min: 1 });
      }

      if (!option.selectSettings) return;

      if (option.selectSettings.minSelect && !option.selectSettings.maxSelect) {
        return t(`${ns}.selectMin`, {
          min: option.selectSettings.minSelect,
        });
      }

      if (!option.selectSettings.minSelect && option.selectSettings.maxSelect) {
        if (!option.isOptional) {
          return t(`${ns}.selectMinMax`, {
            min: 1,
            max: option.selectSettings.maxSelect,
          });
        }

        return t(`${ns}.selectMax`, {
          max: option.selectSettings.maxSelect,
        });
      }

      if (option.selectSettings.minSelect && option.selectSettings.maxSelect) {
        return t(`${ns}.selectMinMax`, {
          min: option.selectSettings.minSelect,
          max: option.selectSettings.maxSelect,
        });
      }
      break;
    case IkasProductOptionType.COLOR_PICKER:
      break;
    case IkasProductOptionType.DATE_PICKER:
      break;
    case IkasProductOptionType.FILE:
      if (
        !option.isOptional &&
        !option.fileSettings?.minQuantity &&
        !option.fileSettings?.maxQuantity
      ) {
        return t(`${ns}.selectMin`, { min: 1 });
      }

      if (!option.fileSettings) return;

      if (option.fileSettings.minQuantity && !option.fileSettings.maxQuantity) {
        return t(`${ns}.selectMin`, {
          min: option.fileSettings.minQuantity,
        });
      }

      if (!option.fileSettings.minQuantity && option.fileSettings.maxQuantity) {
        if (!option.isOptional) {
          return t(`${ns}.selectMinMax`, {
            min: 1,
            max: option.fileSettings.maxQuantity,
          });
        }
        return t(`${ns}.selectMax`, {
          max: option.fileSettings.maxQuantity,
        });
      }

      if (option.fileSettings.minQuantity && option.fileSettings.maxQuantity) {
        return t(`${ns}.selectMinMax`, {
          min: option.fileSettings.minQuantity,
          max: option.fileSettings.maxQuantity,
        });
      }
      break;
  }

  return "";
}
