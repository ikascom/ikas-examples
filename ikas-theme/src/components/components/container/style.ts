import styled from "styled-components";
import breakpoints from "src/styles/breakpoints";

export const Section = styled.section`
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-right: 10px;

  @media (min-width: ${breakpoints.md}) {
    width: calc(100% - 32px);
    margin-left: 16px;
    margin-right: 16px;
  }

  @media (min-width: ${breakpoints.lg}) {
    max-width: 1024px;
    margin: auto;
  }
`;
