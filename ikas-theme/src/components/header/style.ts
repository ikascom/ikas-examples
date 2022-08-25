import styled, { css } from "styled-components";

export const Header = styled.header`
  ${({ theme }) => css`
    color: ${theme.color.headerText};
    background-color: ${theme.color.headerBg};
  `};
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  gap: 16px;
`;

export const LeftSide = styled.div``;
export const Logo = styled.div`
  position: relative;
  height: 100%;
`;
export const SearchInputWrapper = styled.form`
  max-width: 50%;
  flex: 1;
`;
export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const FavoriteWrapper = styled.button``;
export const AccountWrapper = styled.button``;
export const CartWrapper = styled.button`
  position: relative;
`;

export const CartQuantity = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};
  background-color: ${({ theme }) => theme.color.headerBg};
  right: -4px;
  top: -4px;
  border-radius: 50%;
  padding: 2px;
`;

export const SearchInput = styled.input`
  background-color: #fff;
  padding: 14px 16px;
  border: none;
  border-radius: 12px;
  width: 100%;

  ::placeholder {
    color: #77777b;
  }
`;
