import styled from "styled-components";

// OPTION TITLE

export const Title = styled.h3<{ $hasError: boolean }>`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  gap: 8px;
  color: ${({ $hasError, theme }) =>
    $hasError ? theme.color.red : theme.color.primaryText};
`;

export const Name = styled.span``;

export const Price = styled.span`
  font-weight: normal;
  color: ${({ theme }) => theme.color.secondaryText};
`;

export const InfoSVGWrapper = styled.span<{ $hasError: boolean }>`
  color: ${({ $hasError, theme }) =>
    $hasError ? theme.color.red : theme.color.secondaryText};
`;
