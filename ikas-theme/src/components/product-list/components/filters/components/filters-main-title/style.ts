import styled from "styled-components";

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const FiltersTitle = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
`;

export const ClearFiltersButton = styled.button`
  text-decoration: underline;
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.secondaryText};
`;
