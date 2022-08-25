import styled from "styled-components";
import breakpoints from "src/styles/breakpoints";

export const InnerContainer = styled.div`
  position: relative;
`;

export const Content = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 2rem;

  @media (min-width: ${breakpoints.md}) {
    font-size: 3.2rem;
  }
`;

export const Anchor = styled.a`
  color: #fff;
  font-size: 1rem;
  text-decoration: underline;
  @media (min-width: ${breakpoints.md}) {
    font-size: 2rem;
  }
`;
