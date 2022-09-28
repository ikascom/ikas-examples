import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Item = styled.li`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding: 24px 0%;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const ItemProductImageAndNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;

  @media screen and (max-width: ${breakpoints.md}) {
    flex-direction: column;
  }
`;

export const ItemProductImage = styled.picture`
  width: 100px;
  flex-shrink: 0;
`;

export const ItemProductName = styled.div``;
export const ItemProductVariantValuesText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.secondaryText};
`;

export const ItemRemove = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

export const ItemPriceWrapper = styled.div`
  margin-bottom: 24px;
  font-size: 16px;
  line-height: 24px;
  @media screen and (max-width: ${breakpoints.sm}) {
    font-size: 14px;
  }
`;

export const ItemSellPrice = styled.div`
  font-weight: 400;

  text-decoration: line-through;
  color: ${({ theme }) => theme.color.sellPrice};
`;

export const ItemPrice = styled.div`
  color: ${({ theme }) => theme.color.finalPrice};
  font-weight: 600;
`;

export const ItemOptions = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.secondaryText};
`;

export const OptionFileDownloadButton = styled.button`
  svg {
    font-size: 20px;
    color: ${({ theme }) => theme.color.link};
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }

  span:first-child {
    margin-right: 4px;
  }

  :hover {
    color: ${({ theme }) => theme.color.link};
  }
`;

export const OptionColorPicker = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
