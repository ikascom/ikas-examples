import styled from "styled-components";

export const RefundStatus = styled.div`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.secondaryText};
`;

export type RefundStatusTextColor = "orange" | "green" | "red" | "blue";
type RefundStatusText = { $color: RefundStatusTextColor };

export const RefundStatusText = styled.span<RefundStatusText>`
  color: ${({ $color, theme }) => theme.color[$color]};
`;
