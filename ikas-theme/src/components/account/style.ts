import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const InnerWrapper = styled.section`
  display: flex;
  flex-wrap: nowrap;
  gap: 100px;
  margin-top: 40px;
  margin-bottom: 80px;

  @media screen and (max-width: ${breakpoints.lg}) {
    flex-direction: column;
    gap: 0;
  }
`;

export const Main = styled.div`
  flex: 1;
`;
