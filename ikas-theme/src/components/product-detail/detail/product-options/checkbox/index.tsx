import * as React from "react";
import { observer } from "mobx-react-lite";
import { IkasProduct, IkasProductOption } from "@ikas/storefront";

import FormItem from "src/components/components/form/form-item";
import Checkbox from "src/components/components/checkbox";
import { formattedOptionPrice } from "../common/option-price";

import * as S from "./style";

type Props = {
  option: IkasProductOption;
  product: IkasProduct;
  showOptionError: boolean;
};

const ProductOptionCheckBox: React.FC<Props> = ({ option, product }) => {
  const price = formattedOptionPrice(option.price, product);

  const onChange = () => {
    option.values = option.values.length ? [] : ["true"];
  };

  return (
    <FormItem>
      <S.Wrapper>
        <Checkbox checked={!!option.values.length} onChange={onChange}>
          <S.TextWrapper>
            {option.name}
            {option.isOptional && <span>{option.isOptional}</span>}
            {!!price && <S.Price>(+{price})</S.Price>}
          </S.TextWrapper>
        </Checkbox>
      </S.Wrapper>
    </FormItem>
  );
};

export default observer(ProductOptionCheckBox);
