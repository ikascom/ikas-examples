import styled from "styled-components";

import breakpoints from "src/styles/breakpoints";

export const AddressBoxes = styled.ul<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? "grid" : "none")};
  grid-template-columns: repeat(1, 1fr);
  column-gap: 16px;
  row-gap: 32px;

  @media screen and (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
