import { mediaQuery } from "src/styles/breakpoints";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: block;
  margin: 32px 0;
`;

export const Picture = styled.picture`
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 80px;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize["6xl"]};
  margin-top: 20px;
  margin-bottom: 32px;

  ${mediaQuery.sm} {
    font-size: ${({ theme }) => theme.fontSize["4xl"]};
  }
`;
