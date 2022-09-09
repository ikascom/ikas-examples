import breakpoints from "src/styles/breakpoints";
import styled, { css } from "styled-components";

export const Wrapper = styled.li``;

type ImageWrapperProps = {
  $hasStock: boolean;
};

export const ImageWrapper = styled.figure<ImageWrapperProps>`
  position: relative;
  margin-bottom: 12px;

  ${({ $hasStock }) => {
    if ($hasStock) return ``;
    return css`
      :after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(34, 37, 42, 0.4);
      }
    `;
  }};
`;

type DiscountBadgeProps = {
  $hasStock: boolean;
};

export const DiscountBadge = styled.div<DiscountBadgeProps>`
  position: absolute;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: ${breakpoints.md}) {
    width: 56px;
    height: 56px;
    right: 12px;
    top: 12px;
    padding: 10px;
  }
  top: 12px;
  right: 12px;
  padding: 12px 14px;
  width: 64px;
  height: 64px;

  ${({ $hasStock, theme }) => {
    if ($hasStock) {
      return css`
        background-color: ${theme.color.productBadgeBg};
        color: ${theme.color.productBadgeText};
      `;
    }

    return css`
      background-color: #77777b;
      color: #22252a;
    `;
  }};

  border-radius: 50%;
  text-align: center;
`;
export const DiscountBadgeDiscountRatio = styled.span`
  display: block;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;
export const DiscountBadgeSoldOut = styled.span`
  display: block;
  font-size: 100%;
  line-height: 16px;
  color: #22252a;
`;
export const DiscountBadgeDiscountText = styled.span`
  display: block;
  font-size: 10px;
  line-height: 16px;
`;
export const Title = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;
export const PriceWrapper = styled.div``;

export const SellPrice = styled.span`
  color: ${({ theme }) => theme.color.sellPrice};
  margin-right: 8px;
  text-decoration: line-through;
`;

type FinalPriceProps = {
  $hasStock: boolean;
};

export const FinalPrice = styled.span<FinalPriceProps>`
  color: ${({ theme, $hasStock }) =>
    $hasStock ? theme.color.finalPrice : "#22252A"};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 14px;
  }
`;
