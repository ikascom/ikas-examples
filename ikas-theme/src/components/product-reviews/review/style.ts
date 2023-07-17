import styled, { css } from "styled-components";

import breakpoints from "src/styles/breakpoints";

export const Review = styled.div`
  padding-block: 1rem;
  grid-column: span 12 / span 12;

  @media (min-width: ${breakpoints.md}) {
    grid-column: span 6 / span 6;
  }

  @media (min-width: ${breakpoints.lg}) {
    grid-column: span 4 / span 4;
  }
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h3`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;

  @media (min-width: ${breakpoints.md}) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;

export const Description = styled.div<{
  $bigger?: boolean;
}>`
  color: ${(props) => props.theme.color.secondaryText};
  font-size: ${(props) => (props.$bigger ? "15px" : "13px")};
`;

export const Comment = styled.div<{
  $noComment?: boolean;
}>`
  margin-top: 0.5rem;
  overflow-wrap: break-word;

  ${(props) =>
    props.$noComment &&
    css`
      font-style: italic;
      font-weight: 300;
      color: ${(props) => props.theme.color.secondaryText};
    `}
`;
