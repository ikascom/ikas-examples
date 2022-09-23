import breakpoints from "src/styles/breakpoints";
import styled, { css } from "styled-components";

type LocaleBarProps = {
  $color: string;
  $backgroundColor: string;
};

export const LocaleBar = styled.div<LocaleBarProps>`
  position: relative;
  ${({ $color, $backgroundColor }) => css`
    color: ${$color};
    background-color: ${$backgroundColor};
  `};
  padding: 20px 0;

  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 14px;
  }
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  @media screen and (max-width: ${breakpoints.md}) {
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 0;
  }
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;

  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 14px;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    margin-bottom: 16px;
    padding-right: 50px;
  }
`;

export const LocaleSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  @media screen and (max-width: ${breakpoints.md}) {
    position: absolute;
    top: 16px;
    right: 16px;
  }
`;
