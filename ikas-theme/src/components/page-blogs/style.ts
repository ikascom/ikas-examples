import { mediaQuery } from "src/styles/breakpoints";
import styled from "styled-components";

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["3xl"]};
  font-weight: 700;
  margin: 50px 0;
`;

export const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-column-gap: 20px;
  grid-row-gap: 40px;
  margin-top: 16px;
  margin-bottom: 32px;
`;

export const Blog = styled.li`
  grid-column: span 3 / span 3;

  ${mediaQuery.lg} {
    grid-column: span 4 / span 4;
  }

  ${mediaQuery.md} {
    grid-column: span 6 / span 6;
  }

  ${mediaQuery.sm} {
    grid-column: span 12 / span 12;
  }
`;
