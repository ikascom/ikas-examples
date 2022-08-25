import styled from "styled-components";
import breakpoints from "src/styles/breakpoints";

export const ProductDetail = styled.div``;

export const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 72px;
  margin-top: 48px;
  margin-bottom: 120px;

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;
