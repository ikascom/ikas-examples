import styled, { css } from "styled-components";

export const ColorSwatch = styled.button<{
  $isSelected: boolean;
  $color: string;
  $noMargin?: boolean;
}>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 6px;

  ::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background-color: ${({ $color }) => $color};
    border-radius: 50%;
    position: relative;
    box-shadow: 0px 0px 2px #000;
  }

  ${({ $noMargin }) =>
    !$noMargin &&
    css`
      margin-right: 12px;
      margin-bottom: 12px;
    `};

  :last-child {
    margin-right: 0;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      outline: 1px solid #77777b;
      outline-offset: 0px;
    `};
`;

export const ImageSwatch = styled.button`
  margin-right: 12px;
  margin-bottom: 12px;
  :disabled {
    opacity: 50%;
  }
`;
export const ImageSwatchImg = styled.img<{ $isSelected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 0px;
  object-fit: contain;

  :last-child {
    margin-right: 0;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      outline: 1px solid #77777b;
      outline-offset: 0px;
    `};
`;
