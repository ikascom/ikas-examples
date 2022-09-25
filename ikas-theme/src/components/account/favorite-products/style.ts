import styled from "styled-components";

import breakpoints from "src/styles/breakpoints";

export const Products = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  row-gap: 32px;

  @media screen and (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const NoProducts = styled.div`
  margin-top: 40px;
  text-align: center;

  a {
    color: ${({ theme }) => theme.color.link};
    text-decoration: underline;
    font-weight: 700;
  }
`;

export const NoProductsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
  font-weight: 500;
  margin-bottom: 16px;
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  height: 300px;
`;

export const ProductWrapper = styled.li`
  position: relative;
`;

export const ProductFavoriteButton = styled.button`
  position: absolute;
  left: 12px;
  top: 12px;
  color: ${({ theme }) => theme.color.button};
  background-color: ${({ theme }) => theme.color.buttonBg};
  z-index: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;
