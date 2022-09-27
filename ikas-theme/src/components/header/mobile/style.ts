import { SIDENAV_WIDTH } from "src/styles/styled";
import styled, { css } from "styled-components";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const Header = styled.header`
  padding: 12px 24px 24px 24px;
  ${({ theme }) => css`
    color: ${theme.color.headerText};
    background-color: ${theme.color.headerBg};
  `};
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const SidenavButton = styled.button`
  width: 30px;
  height: 30px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

type SidenavProps = {
  $visible: boolean;
};

export const SidenavOverlay = styled.div`
  position: fixed;
  background-color: hsla(0, 0%, 0%, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 1sn ease-in-out;
  z-index: ${({ theme }) => theme.zIndex.sidenav};
`;

export const Sidenav = styled.div<SidenavProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.sidenavBg};
  color: ${({ theme }) => theme.color.sidenavText};
  width: ${SIDENAV_WIDTH}px;
  max-width: 100%;
  z-index: ${({ theme }) => theme.zIndex.sidenav};
  padding: 24px 0;
  transition: transform 300ms ease-in-out;
  overflow: auto;

  ${({ $visible }) => {
    if ($visible) return `transform: translateX(0);`;
    return `transform: translateX(-${SIDENAV_WIDTH}px);`;
  }};
`;

export const Logo = styled.div`
  position: relative;
  height: 100%;
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

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;

  margin: 24px 0;
`;
export const NavigationList = styled.ul`
  width: 100%;
`;
export const NavigationListItem = styled.li``;

export const NavigationListItemChildButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 4px;
`;

export const NavigationListItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  padding: 16px;

  a {
    display: block;
  }
`;

export const NavigationItemDropdown = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  padding: 0px 16px;
`;
export const NavigationItemDropdownList = styled.ul``;
export const NavigationItemDropdownListItem = styled.li`
  & > a {
    display: block;
    padding: 12px 8px;
  }
`;

export const SidenavHeader = styled.div`
  display: flex;

  justify-content: space-between;
  padding: 0 16px;
`;

export const SidenavCloseButton = styled.button`
  width: 40px;
  height: 40px;
  margin-left: auto;
  svg {
    width: 100%;
    height: 100%;
  }
`;
