import breakpoints from "src/styles/breakpoints";
import styled, { css } from "styled-components";

export const Main = styled.main``;

export const Products = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 48px;

  @media screen and (min-width: ${breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: ${breakpoints.md}) {
    grid-gap: 48px;
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  @media screen and (max-width: ${breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const TotalProductCount = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;
export const ProductOrderWrapper = styled.div``;
