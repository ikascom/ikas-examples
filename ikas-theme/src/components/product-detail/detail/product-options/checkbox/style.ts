import styled from "styled-components";

export const Wrapper = styled.span`
  display: block;
`;

export const TextWrapper = styled.span`
  margin-left: 8px;
`;

export const Price = styled.span`
  margin-left: 4px;
  color: ${({ theme }) => theme.color.secondaryText};
`;
