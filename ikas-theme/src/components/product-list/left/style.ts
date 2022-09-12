import styled, { css } from "styled-components";

export const Left = styled.aside`
  width: 25%;
  flex-shrink: 0;
`;

export const Categories = styled.div``;

type FilterCategoryProps = {
  $isSelected: boolean;
};

export const FilterCategory = styled.div<FilterCategoryProps>`
  font-weight: ${({ $isSelected }) => ($isSelected ? 400 : 300)};
  font-size: 14px;
  line-height: 24px;
`;
