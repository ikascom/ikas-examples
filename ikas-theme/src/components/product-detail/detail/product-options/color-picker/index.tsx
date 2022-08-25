import * as React from "react";
import { observer } from "mobx-react-lite";
import { IkasProduct, IkasProductOption } from "@ikas/storefront";

import OptionTitle from "../common/option-title";
import FormItem from "src/components/components/form/form-item";
import { formattedOptionPrice } from "../common/option-price";
import { useEffect } from "react";

type Props = {
  showOptionError: boolean;
  option: IkasProductOption;
  product: IkasProduct;
};

const ProductOptionColorPicker: React.FC<Props> = ({ option, product }) => {
  const [value, setValue] = React.useState<string>("#000000");

  useEffect(() => {
    option.values = ["#000000"];
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    option.values = [e.target.value];
  };

  const optionTitlePrice = formattedOptionPrice(option.price, product);

  return (
    <div>
      <OptionTitle
        name={option.name}
        isOptional={option.isOptional}
        price={optionTitlePrice}
      />
      <FormItem>
        <input value={value} type="color" onChange={handleChange} />
      </FormItem>
    </div>
  );
};

export default observer(ProductOptionColorPicker);
