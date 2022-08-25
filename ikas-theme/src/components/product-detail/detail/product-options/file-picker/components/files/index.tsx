import { IkasProductOption, useTranslation } from "@ikas/storefront";
import React from "react";
import Tooltip, { InfoSVG } from "src/components/components/tooltip";

import CloseSVG from "src/components/svg/close";
import LoadingSVG from "src/components/svg/loading";

import * as S from "../../style";

type FilesProps = {
  namespace: string;
  option: IkasProductOption;
  files: File[];
  uploadedFiles: {
    key: string;
    label: string;
  }[];
  incorrectFiles: File[];
  setIncorrectFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const Files = ({
  namespace,
  incorrectFiles,
  files,
  option,
  uploadedFiles,
  setIncorrectFiles,
}: FilesProps) => {
  return (
    <>
      <IncorrectFileList
        namespace={namespace}
        incorrectFiles={incorrectFiles}
        setIncorrectFiles={setIncorrectFiles}
      />
      <SelectedFileList namespace={namespace} files={files} />
      <UploadedFileList
        namespace={namespace}
        uploadedFiles={uploadedFiles}
        option={option}
      />
    </>
  );
};

export default Files;

type UploadedFileListProps = {
  namespace: string;
  option: IkasProductOption;
  uploadedFiles: {
    key: string;
    label: string;
  }[];
};

const UploadedFileList = ({
  namespace,
  uploadedFiles,
  option,
}: UploadedFileListProps) => {
  const { t } = useTranslation();
  return (
    <FileList
      type="uploaded"
      title={t(`${namespace}.file.uploadedFiles`)}
      uploadedFiles={uploadedFiles}
      onFileDeleteClick={(file: any) => {
        option.values = option.values.filter((v) => v !== file.key);
      }}
    />
  );
};

type SelectedFileListProps = {
  namespace: string;
  files: File[];
};

const SelectedFileList = ({ namespace, files }: SelectedFileListProps) => {
  const { t } = useTranslation();
  return (
    <FileList
      type="selected"
      title={
        <>
          <span>{t(`${namespace}.file.selectedFiles`)}</span>
          <LoadingSVG style={{ marginLeft: "8px" }} />
        </>
      }
      files={files}
    />
  );
};

type IncorrectFileListProps = {
  namespace: string;
  incorrectFiles: File[];
  setIncorrectFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const IncorrectFileList = ({
  namespace,
  incorrectFiles,
  setIncorrectFiles,
}: IncorrectFileListProps) => {
  const { t } = useTranslation();
  const title = (
    <Tooltip text={t(`${namespace}.common.settings.maxFileSizeInfoText`)}>
      <span style={{ display: "inline-block " }}>
        {t(`${namespace}.file.incorrectFiles`)}
      </span>
      <InfoSVG style={{ display: "inline-block", marginLeft: "8px" }} />
    </Tooltip>
  );
  const onFileDeleteClick = (file: any) => {
    setIncorrectFiles(incorrectFiles.filter((ff) => file.name !== ff.name));
  };

  return (
    <FileList
      type="incorrect"
      title={title}
      files={incorrectFiles}
      onFileDeleteClick={onFileDeleteClick}
    />
  );
};

export type FilesType = "incorrect" | "selected" | "uploaded";

type FileListProps = {
  type: FilesType;
  title: React.ReactNode;
  onFileDeleteClick?: (data: any) => void;
  files?: File[];
  uploadedFiles?: Array<{ key: string; label: string }>;
};

const FileList = ({
  type,
  title,
  files,
  uploadedFiles,
  onFileDeleteClick,
}: FileListProps) => {
  if (!files?.length && !uploadedFiles?.length) return null;

  return (
    <S.Files>
      <S.FileListTitle>{title}</S.FileListTitle>
      {!!files?.length && (
        <S.FileList>
          {files.map((file, index) => (
            <FileListItem
              key={index}
              text={file.name}
              onClick={
                onFileDeleteClick ? () => onFileDeleteClick(file) : undefined
              }
            />
          ))}
        </S.FileList>
      )}
      {!!uploadedFiles?.length && (
        <S.FileList>
          {uploadedFiles.map((file, index) => (
            <FileListItem
              key={index}
              text={file.label}
              onClick={
                onFileDeleteClick ? () => onFileDeleteClick(file) : undefined
              }
            />
          ))}
        </S.FileList>
      )}
    </S.Files>
  );
};

type FileListItemProps = {
  text: string;
  onClick?: () => void;
};
const FileListItem = (props: FileListItemProps) => {
  return (
    <S.FileListItem>
      <S.FileListItemTitle>{props.text}</S.FileListItemTitle>
      {!!props.onClick && (
        <S.FileListItemButton onClick={props.onClick}>
          <CloseSVG />
        </S.FileListItemButton>
      )}
    </S.FileListItem>
  );
};
