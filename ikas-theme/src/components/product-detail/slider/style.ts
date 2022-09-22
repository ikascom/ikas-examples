import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const SliderWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  flex-direction: column;

  @media (min-width: ${breakpoints.lg}) {
    position: relative;
    margin-bottom: auto;
  }
`;

export const Thumbnails = styled.div`
  order: 1;
  display: flex;
  width: 100px;
  gap: 10px;

  @media (min-width: ${breakpoints.lg}) {
    position: absolute;
    display: block;
    height: 100%;
    overflow: auto;
  }
`;

export const Thumbnail = styled.button<{ $selected: boolean }>`
  display: flex;

  width: 100px;

  border-width: 1px;
  border-style: solid;

  ${({ $selected }) => `border-color: ${$selected ? "black" : "transparent"};`}

  @media (min-width: ${breakpoints.lg}) {
    display: block;
    margin-bottom: 24px;
    :last-child {
      margin-bottom: 0;
    }
  }
`;

export const MainImage = styled.figure`
  position: relative;

  @media (min-width: ${breakpoints.lg}) {
    width: calc(100% - 124px);
    margin-left: 124px;
  }
`;
