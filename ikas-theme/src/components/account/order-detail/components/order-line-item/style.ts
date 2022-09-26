import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;

  @media screen and (max-width: ${breakpoints.sm}) {
    display: block;
  }
`;

export const Picture = styled.picture`
  display: block;
  width: 150px;
  flex-shrink: 0;
  @media screen and (max-width: ${breakpoints.md}) {
    width: 100%;
    margin-bottom: 16px;
  }
`;

export const Content = styled.div`
  @media screen and (min-width: ${breakpoints.md}) {
    margin-left: 16px;
  }
`;

export const VariantName = styled.div`
  margin-bottom: 8px;
  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 20px;
  }
`;

export const Quantity = styled.span`
  color: ${({ theme }) => theme.color.secondaryText};
`;

export const VariantType = styled.div`
  color: ${({ theme }) => theme.color.secondaryText};
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSize.base};
`;

export const Price = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: 500;
  color: ${({ theme }) => theme.color.finalPrice};
`;

export const RefundQuantitySelectWrapper = styled.div`
  margin-top: 20px;

  select {
    width: unset;
  }
`;
