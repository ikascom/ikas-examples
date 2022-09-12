import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const ProductList = styled.section`
  @media screen and (min-width: ${breakpoints.md}) {
    margin-top: 36px;
  }

  margin-bottom: 120px;
`;
export const Wrapper = styled.div`
  display: flex;
  gap: 48px;
`;
