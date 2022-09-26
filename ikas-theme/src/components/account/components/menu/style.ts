import styled from "styled-components";

import breakpoints from "src/styles/breakpoints";

export const DesktopTitle = styled.h1`
  font-weight: 300;
  font-size: 28px;
  line-height: 48px;
  padding-bottom: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.black};
`;

export const MobileOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #00000090;
  z-index: 1;
`;

export const Wrapper = styled.nav`
  flex-shrink: 0;
  display: inline-block;

  @media screen and (max-width: ${breakpoints.lg}) {
    position: fixed;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 1;
    bottom: 0;
    top: unset;
    overflow: auto;
    z-index: 1;
    max-height: 100vh;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const ToggleButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  background-color: ${({ theme }) => theme.color.buttonBg};
  color: ${({ theme }) => theme.color.button};
  border-radius: 50%;
  font-size: 24px;
  z-index: 2;

  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-weight: 300;
  font-size: 28px;
  line-height: 48px;
  padding: 0 10px;
`;

export const List = styled.ul`
  @media screen and (max-width: ${breakpoints.lg}) {
    padding: 20px 10px;
  }
`;

type ListItemProps = {
  $selected?: boolean;
};
export const ListItem = styled.li<ListItemProps>`
  & > * {
    display: block;
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 12px;
    color: ${({ $selected, theme }) =>
      $selected ? theme.color.primaryText : theme.color.secondaryText};
    font-weight: ${({ $selected }) => ($selected ? 400 : 300)};

    :hover {
      text-decoration: underline;
    }
  }
`;
