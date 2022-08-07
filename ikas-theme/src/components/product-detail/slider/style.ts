import styled, { css } from "styled-components";

export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

export const Thumbnails = styled.div``;
export const Thumbnail = styled.button<{ $selected: boolean }>`
  display: flex;

  border-width: 1px;
  border-style: solid;

  ${({ $selected }) => `border-color: ${$selected ? "black" : "transparent"};`}

  margin-bottom: 24px;
  :last-child {
    margin-bottom: 0;
  }
`;

export const MainImage = styled.div`
  position: relative;
  width: 100%;
`;
