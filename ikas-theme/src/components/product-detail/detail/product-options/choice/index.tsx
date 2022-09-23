import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasProduct,
  IkasProductOption,
  IkasProductOptionSelectType,
  useTranslation,
} from "@ikas/storefront";

import OptionTitle from "../common/option-title";
import FormItem from "src/components/components/form/form-item";
import Select, {
  SelectOnChangeParamType,
} from "src/components/components/select";
import { Swatch } from "src/components/components/swatch";

import { formattedOptionPrice } from "../common/option-price";
import { optionSettingsText } from "../common/option-settings-text";

import * as S from "./style";

type Props = {
  showOptionError: boolean;
  namespace: string;
  option: IkasProductOption;
  product: IkasProduct;
};

const ProductOptionChoice: React.FC<Props> = ({
  showOptionError,
  namespace,
  option,
  product,
}) => {
  const { t } = useTranslation();

  const tooltipText = optionSettingsText({ option, t });
  const hasFormError = showOptionError && !option.hasValidValues;
  const optionTitlePrice = formattedOptionPrice(option.price, product);
  const formStatus = hasFormError ? "error" : undefined;

  return (
    <div>
      <OptionTitle
        name={option.name}
        isOptional={option.isOptional}
        price={optionTitlePrice}
        hasError={hasFormError}
        tooltipText={tooltipText}
      />
      <FormItem status={formStatus} help={hasFormError ? tooltipText : ""}>
        {option.selectSettings?.type === IkasProductOptionSelectType.SELECT && (
          <OptionSelect
            option={option}
            hasFormError={hasFormError}
            product={product}
          />
        )}
        {option.selectSettings?.type === IkasProductOptionSelectType.BOX && (
          <OptionBox option={option} product={product} />
        )}
        {option.selectSettings?.type === IkasProductOptionSelectType.SWATCH && (
          <OptionSwatch option={option} product={product} />
        )}
      </FormItem>
    </div>
  );
};

export default observer(ProductOptionChoice);

type OptionProps = {
  option: IkasProductOption;
  product: IkasProduct;
};

type OptionSelectProps = {
  hasFormError: boolean;
} & OptionProps;

const OptionSelect = observer(
  ({ hasFormError, option, product }: OptionSelectProps) => {
    if (!option.selectSettings) return null;

    const selectOptions = useMemo(() => {
      const data = option.selectSettings
        ? option.selectSettings.values.map((optionSelect) => {
            const price = formattedOptionPrice(option.price, product);
            return {
              value: optionSelect.id,
              label: `${optionSelect.value}${price ? ` ${price}` : ""}`,
            };
          })
        : [];
      return data;
    }, [option, product]);

    const onChange = (newValue: SelectOnChangeParamType) => {
      const isArray = Array.isArray(newValue);

      if (
        isArray &&
        option.selectSettings?.maxSelect &&
        newValue.length > option.selectSettings.maxSelect
      )
        return;

      if (isArray) {
        option.values = newValue;
      } else {
        if (newValue) {
          option.values = [newValue];
        }
      }
    };

    const selectedOptionValues = useMemo(() => {
      return selectOptions.filter(
        (sO) => option.values.findIndex((v) => v === sO.value) !== -1
      );
    }, [option.values]);
    const isNoMaxLimit = option.selectSettings?.maxSelect === null;
    const multiple = isNoMaxLimit
      ? true
      : (option.selectSettings.minSelect || 0) > 1 ||
        (option.selectSettings.maxSelect || 0) > 2;

    return (
      <Select
        placeholder=""
        status={hasFormError ? "error" : undefined}
        value={selectedOptionValues.map((option) => option.value)}
        multiple={multiple}
        onChange={onChange}
        options={selectOptions}
      />
    );
  }
);

const OptionBox = observer(({ option, product }: OptionProps) => {
  if (!option.selectSettings) return null;

  return (
    <div>
      {option.selectSettings.values.map((opt, index) => {
        const selected =
          option.values.findIndex((value) => value === opt.id) !== -1;
        const price = formattedOptionPrice(opt.price, product);
        const onClick = () => {
          if (selected) {
            option.values = option.values.filter((value) => value !== opt.id);
          } else {
            option.values = [...option.values, opt.id];
          }
        };

        return (
          <S.OptionBox key={index} $selected={selected} onClick={onClick}>
            {opt.value}
            {!!opt.price && <S.OptionBoxPrice>({price})</S.OptionBoxPrice>}
          </S.OptionBox>
        );
      })}
    </div>
  );
});

const OptionSwatch = observer(({ option }: OptionProps) => {
  if (!option.selectSettings) return null;
  return (
    <div>
      {option.selectSettings.values.map((opt, index) => {
        const selected = option.values.findIndex((sO) => sO === opt.id) !== -1;
        const onClick = () => {
          const isNoMaxLimit = option.selectSettings?.maxSelect === null;
          const hasMultiSelect = isNoMaxLimit
            ? true
            : (option.selectSettings?.maxSelect || 1) -
                (option.selectSettings?.minSelect || 0) >=
              2;
          if (selected) {
            option.values = option.values.filter((value) => value !== opt.id);
          } else {
            if (hasMultiSelect) {
              option.values = [...option.values, opt.id];
            } else {
              option.values = [opt.id];
            }
          }
        };

        return (
          <Swatch
            key={index}
            title={opt.value}
            selected={selected}
            colorCode={opt.colorCode}
            image={opt.thumbnailImage}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
});
