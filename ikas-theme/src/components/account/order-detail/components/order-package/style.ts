import styled from "styled-components";

export const OrderLineItem = styled.li`
  margin-bottom: 16px;
  padding-bottom: 16px;
`;

export const OrderPackage = styled.article`
  margin-bottom: 32px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const OrderPackageTitle = styled.h3`
  position: sticky;
  top: 0;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.xl};
  padding: 8px 0;
  z-index: 1;
  background: #fff;
`;
