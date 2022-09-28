import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Cart = styled.div`
  margin-top: 24px;
  margin-bottom: 80px;
`;
export const Title = styled.h1`
  font-weight: 400;
  font-size: 28px;
  line-height: 48px;
  margin-bottom: 24px;
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 48px;

  @media screen and (max-width: ${breakpoints.lg}) {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }
`;
export const Main = styled.main`
  grid-column: span 8 / span 8;
`;
export const Items = styled.ul``;
export const Summary = styled.aside`
  grid-column: span 4 / span 4;
`;

export const ItemsHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  padding: 10px 0;

  @media screen and (max-width: ${breakpoints.md}) {
    display: none;
  }
`;

export const ProductColumn = styled.div`
  grid-column: span 6 / span 6;

  @media screen and (max-width: ${breakpoints.sm}) {
    grid-column: span 9 / span 9;
    margin-bottom: 20px;
  }
`;
export const QuantityColumn = styled.div`
  grid-column: span 3 / span 3;
  @media screen and (max-width: ${breakpoints.sm}) {
    order: 2;
    grid-column: span 12 / span 12;
    text-align: center;
  }
`;

export const PriceColumn = styled.div`
  grid-column: span 2 / span 2;
  @media screen and (max-width: ${breakpoints.sm}) {
    order: 1;
    grid-column: span 2 / span 2;
  }
`;

export const RemoveColumn = styled.div`
  grid-column: span 1 / span 1;
  @media screen and (max-width: ${breakpoints.sm}) {
    order: 1;
    grid-column: span 1 / span 1;
  }
`;

// SUMMARY
export const SummaryBox = styled.div`
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(112, 144, 176, 0.12);
  border-radius: 12px;
`;

export const BoxTitle = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 24px;
`;

export const SummaryBoxInner = styled.div``;
export const SummaryBoxText = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SummaryButtonWrapper = styled.div`
  margin-top: 24px;
  > *:first-child {
    margin-bottom: 12px;
  }
`;

export const SummaryFreeShippingText = styled.div`
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  margin-top: 18px;
  text-align: center;

  span {
    display: inline-block;
    vertical-align: middle;
  }
  span:first-child {
    margin-right: 8px;
  }
`;

export const SummaryBoxInfo = styled.div``;
