import styled from "styled-components";

import breakpoints from "src/styles/breakpoints";

export const Reviews = styled.div`
  border-top: 1px solid ${(props) => props.theme.color.border};
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding-block: 1rem;

  @media (min-width: ${breakpoints.md}) {
    gap: 0.5rem 2rem;
  }
`;
