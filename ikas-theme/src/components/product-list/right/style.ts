import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
`;

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

export const ProductOrderWrapper = styled.div``;
