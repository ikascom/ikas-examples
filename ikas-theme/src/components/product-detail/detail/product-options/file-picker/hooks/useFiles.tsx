import { IkasProductOption } from "@ikas/storefront";
import React, { useMemo, useState } from "react";
import getBase64, { getBase64Size } from "src/utils/getBase64";

const MAX_FILE_SIZE = 3; // mb

type Props = {
  option: IkasProductOption;
  fileRef: React.MutableRefObject<HTMLInputElement | null>;
};

export function useFiles({ option, fileRef }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [incorrectFiles, setIncorrectFiles] = useState<File[]>([]);
  const [isLoading, setLoading] = useState(false);

  const onFilePickerChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    if (
      option.fileSettings?.maxQuantity &&
      event.target.files.length > option.fileSettings?.maxQuantity
    ) {
      if (fileRef?.current) fileRef.current.value = "";
      setFiles([]);
      setIncorrectFiles([]);
      return;
    }

    const files: File[] = [];
    const incorrectFiles: File[] = [];

    const prepareFiles = async (fileList: FileList) => {
      return new Promise(async (resolve) => {
        for (let i = 0; i < fileList.length; i++) {
          const file = fileList[i];

          const base64 = await getBase64(file);
          if (!base64) return;
          const size = getBase64Size(base64);
          if (size > MAX_FILE_SIZE) {
            incorrectFiles.push(file);
          } else {
            files.push(file);
          }
        }

        resolve(true);
      });
    };
    await prepareFiles(event.target.files);
    setIncorrectFiles(incorrectFiles);
    setFiles(files);
    uploadFiles(files);
    if (fileRef.current) fileRef.current.value = "";
  };

  const uploadFiles = async (files: File[]) => {
    try {
      setLoading(true);
      const fileIds = await option.productOptionFileUpload(files);
      const fileUrls: string[] = [];
      fileIds.forEach((id) => id && fileUrls.push(id));
      if (!fileUrls.length) return;
      option.values = fileUrls;
    } finally {
      setFiles([]);
      setLoading(false);
    }
  };

  const uploadedFiles = useMemo(() => {
    if (!Array.isArray(option.values)) return [];

    return option.values.map((file: string) => ({
      key: file,
      label: decodeURIComponent(file.split("/")[file.split("/").length - 1]),
    }));
  }, [option.values]);

  return {
    isLoading,
    files,
    uploadedFiles,
    incorrectFiles,
    setIncorrectFiles,
    onFilePickerChange,
  };
}
