import styled, { css } from "styled-components";

export const UploadButtonWrapper = styled.div`
  position: relative;
`;

export const UploadInputLabel = styled.label.attrs({
  htmlFor: "product-option-file",
  className: "visually-hidden",
})``;

export const UploadInput = styled.input.attrs({
  id: "product-option-file",
  className: "visually-hidden",
  type: "file",
})``;

export const Files = styled.div`
  margin: 20px 0;
`;
export const FileListTitle = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-weight: bold;
`;
export const FileList = styled.ul``;
export const FileListItem = styled.li`
  display: flex;
  align-items: center;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;
export const FileListItemTitle = styled.span``;
export const FileListItemButton = styled.button`
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
  width: 20px;
  height: 20px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  border-radius: 4px;

  :hover {
    opacity: 0.8;
  }

  svg {
    width: 10px;
  }
`;
