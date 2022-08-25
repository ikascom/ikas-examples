import React from "react";
import { observer } from "mobx-react-lite";
import { IkasProductOption, useTranslation } from "@ikas/storefront";

import { useUpload } from "../../hooks/useUpload";
import Button from "src/components/components/button";

import * as S from "../../style";

type UploadButtonProps = {
  isLoading: boolean;
  namespace: string;
  fileRef: React.MutableRefObject<HTMLInputElement | null>;
  option: IkasProductOption;
  onFilePickerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadButton = observer(
  ({
    isLoading,
    namespace,
    fileRef,
    option,
    onFilePickerChange,
  }: UploadButtonProps) => {
    const { t } = useTranslation();
    const { multiple } = useUpload({ option });

    const buttonTitle = `${
      option.fileSettings?.allowedExtensions?.join(",") || ""
    } ${t(namespace + ".common.settings.maxFileSizeInfoText")}`;

    return (
      <S.UploadButtonWrapper>
        <Button
          block
          title={buttonTitle}
          loading={isLoading}
          disabled={isLoading}
          onClick={() => fileRef.current?.click()}
        >
          {isLoading
            ? t(`common:buttonLoading`)
            : t(`${namespace}.file.selectFile`)}
          <S.UploadInputLabel>
            <S.UploadInput
              ref={fileRef}
              disabled={isLoading}
              title={option.fileSettings?.allowedExtensions?.join(", ")}
              accept={option.fileSettings?.allowedExtensions?.join(",")}
              multiple={multiple}
              onChange={onFilePickerChange}
            />
          </S.UploadInputLabel>
        </Button>
      </S.UploadButtonWrapper>
    );
  }
);

export default UploadButton;
