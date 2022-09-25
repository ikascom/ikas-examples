import styled from "styled-components";
import breakpoints from "src/styles/breakpoints";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 24px 0;
`;

export const HeaderTitle = styled.h2`
  font-weight: 600;
  font-size: 36px;

  @media screen and (max-width: ${breakpoints.md}) {
    font-size: 20px;
    line-height: 36px;
  }
`;
