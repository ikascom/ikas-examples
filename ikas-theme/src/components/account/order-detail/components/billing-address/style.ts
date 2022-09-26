import styled from "styled-components";

export const BillingAddress = styled.div`
  padding-bottom: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.color.border};
`;

export const Title = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

export const Text = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
