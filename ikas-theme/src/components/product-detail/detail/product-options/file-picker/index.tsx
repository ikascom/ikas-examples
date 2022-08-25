import React from "react";
import { observer } from "mobx-react-lite";
import {
  IkasProduct,
  IkasProductOption,
  useTranslation,
} from "@ikas/storefront";

import OptionTitle from "../common/option-title";
import FormItem from "src/components/components/form/form-item";

import { useFiles } from "./hooks/useFiles";

import { optionSettingsText } from "../common/option-settings-text";
import { formattedOptionPrice } from "../common/option-price";

import UploadButton from "./components/upload-button";
import Files from "./components/files";

type Props = {
  showOptionError: boolean;
  namespace: string;
  option: IkasProductOption;
  product: IkasProduct;
};

const ProductOptionFile: React.FC<Props> = ({
  showOptionError,
  namespace,
  option,
  product,
}) => {
  const { t } = useTranslation();
  const fileRef: React.MutableRefObject<HTMLInputElement | null> =
    React.createRef();

  const {
    isLoading,
    files,
    uploadedFiles,
    incorrectFiles,
    setIncorrectFiles,
    onFilePickerChange,
  } = useFiles({ option, fileRef });

  const hasFormError = showOptionError && !option.hasValidValues;
  const tooltipText = optionSettingsText({ option, t });
  const optionTitlePrice = formattedOptionPrice(option.price, product);

  return (
    <div>
      <OptionTitle
        name={option.name}
        isOptional={option.isOptional}
        price={optionTitlePrice}
        hasError={hasFormError}
        tooltipText={tooltipText}
      />
      <FormItem
        status={hasFormError ? "error" : undefined}
        help={hasFormError ? tooltipText : ""}
      >
        <UploadButton
          isLoading={isLoading}
          namespace={namespace}
          option={option}
          fileRef={fileRef}
          onFilePickerChange={onFilePickerChange}
        />
        <Files
          namespace={namespace}
          option={option}
          files={files}
          uploadedFiles={uploadedFiles}
          incorrectFiles={incorrectFiles}
          setIncorrectFiles={setIncorrectFiles}
        />
      </FormItem>
    </div>
  );
};

export default observer(ProductOptionFile);
