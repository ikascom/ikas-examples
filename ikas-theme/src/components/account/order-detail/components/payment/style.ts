import styled from "styled-components";

export const Payment = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding: 16px 0;
`;

export const Title = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

export const Text = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const OrderTransaction = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;
