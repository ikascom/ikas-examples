import styled from "styled-components";

import breakpoints from "src/styles/breakpoints";

export const ProductReviews = styled.div`
  padding-block: 2rem;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;

  @media (min-width: ${breakpoints.md}) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;
