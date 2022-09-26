import { IkasAdjustmentType } from "@ikas/storefront";
import styled from "styled-components";

export const Summary = styled.div`
  padding: 16px 0;
  border-top: 1px solid var(--border-color);
`;

export const Title = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;

export const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

export const ContentItem = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

export const ContentItemTitle = styled.div`
  font-weight: 500;
`;

export const ContentItemText = styled.div`
  flex: 1 1 0%;
  text-align: right;
`;

export const OrderAdjustment = styled.div`
  display: flex;
`;

export const OrderAdjustmentTitle = styled.div`
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const OrderAdjustmentText = styled.div<{ $type: IkasAdjustmentType }>`
  flex: 1 1 0%;
  text-align: right;
  white-space: nowrap;

  color: ${({ $type, theme }) => {
    if ($type === IkasAdjustmentType.DECREMENT) {
      return theme.color.green;
    }
    return theme.color.red;
  }};
`;

export const PriceWrapper = styled.div`
  display: flex;
  padding-top: 8px;
`;

export const PriceTitle = styled.div`
  font-weight: 500;
`;

export const Price = styled.div`
  flex: 1 1 0%;
  text-align: right;
`;
