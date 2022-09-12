import styled, { css } from "styled-components";

type FiltersWrapperProps = {
  $noBorder?: boolean;
};

export const FiltersWrapper = styled.div<FiltersWrapperProps>`
  ${({ $noBorder }) =>
    !$noBorder &&
    css`
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
    `};
`;

export const FilterTitleWrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const FilterTitle = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
`;

export const FilterTitleExpandButton = styled.span`
  display: inline-block;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
`;
