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
  text-align: center;
  flex-direction: column;
`;

export const ContentInner = styled.div`
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 8px;

  @media (min-width: ${breakpoints.md}) {
    font-size: 3.2rem;
  }
`;

export const Anchor = styled.a`
  color: #fff;
  font-size: 0.75rem;
  text-decoration: underline;
  display: inline-block;
  padding: 4px 16px;
  @media (min-width: ${breakpoints.md}) {
    font-size: 1.5rem;
  }
`;
