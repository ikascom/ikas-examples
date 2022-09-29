import React from "react";
import { observer } from "mobx-react-lite";
import {
  IkasProduct,
  IkasProductOption,
  useTranslation,
} from "@ikas/storefront";

import OptionTitle from "../common/option-title";
import Input from "src/components/components/input";
import FormItem from "src/components/components/form/form-item";

import { formattedOptionPrice } from "../common/option-price";
import { optionSettingsText } from "../common/option-settings-text";

type Props = {
  showOptionError: boolean;
  namespace: string;
  option: IkasProductOption;
  product: IkasProduct;
};

const ProductOptionText = ({
  showOptionError,
  namespace,
  option,
  product,
}: Props) => {
  const { t } = useTranslation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    option.values = value ? [value] : [];
  };

  const tooltipText = optionSettingsText({ option, t });
  const hasFormError = showOptionError && !option.hasValidValues;
  const optionTitlePrice = formattedOptionPrice(option.price, product);
  const formStatus = hasFormError ? "error" : undefined;

  return (
    <div>
      <OptionTitle
        name={option.name}
        price={optionTitlePrice}
        hasError={hasFormError}
        isOptional={option.isOptional}
        tooltipText={tooltipText}
      />
      <FormItem
        status={formStatus}
        help={hasFormError ? tooltipText : undefined}
      >
        <Input
          required={!option.isOptional}
          value={option.values.length ? option.values[0] : ""}
          status={formStatus}
          minLength={option.textSettings?.min || undefined}
          maxLength={option.textSettings?.max || undefined}
          onChange={handleChange}
        />
      </FormItem>
    </div>
  );
};

export default observer(ProductOptionText);
