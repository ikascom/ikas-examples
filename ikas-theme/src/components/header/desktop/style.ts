import breakpoints from "src/styles/breakpoints";
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
export const Logo = styled.figure`
  position: relative;
  height: 100%;
`;

export const Center = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
`;
export const NavigationList = styled.ul``;
export const NavigationListItem = styled.li`
  position: relative;
  display: inline-block;

  > a {
    display: inline-block;
    padding: 8px 8px;
  }

  :hover > div,
  :focus-within > div {
    display: block;
  }
`;
export const NavigationItemDropdown = styled.div`
  position: absolute;
  top: 100%;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  display: none;
  width: 200px;
  z-index: ${({ theme }) => theme.zIndex.headerNavigationItem};
  padding: 8px 0;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
export const NavigationItemDropdownList = styled.ul``;
export const NavigationItemDropdownListItem = styled.li`
  & > a {
    display: block;
    padding: 12px 8px;
  }
`;

export const SearchInputWrapper = styled.form`
  min-width: 200px;
  max-width: 50%;
  flex: 1;

  @media screen and (max-width: ${breakpoints.lg}) {
    width: 100%;
    max-width: unset;
  }
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
  padding-left: 32px;
  border: none;
  border-radius: 12px;
  width: 100%;

  background-size: 20px 20px;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.256 5.77075C16.5917 8.12126 16.5798 11.9202 14.2293 14.256C11.8787 16.5917 8.07977 16.5798 5.74401 14.2293C3.40826 11.8787 3.42023 8.07977 5.77075 5.74401C8.12126 3.40826 11.9202 3.42023 14.256 5.77075ZM15.2781 14.5985C17.6724 11.856 17.5712 7.68827 14.9653 5.06587C12.2403 2.3236 7.80814 2.30964 5.06587 5.03468C2.3236 7.75973 2.30964 12.1919 5.03468 14.9341C7.64184 17.5578 11.8116 17.684 14.569 15.3036L19.6474 20.3545L20.3526 19.6455L15.2781 14.5985Z' fill='%2377777B'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position-x: 10px;
  background-position-y: 50%;

  ::placeholder {
    color: #77777b;
  }
`;
