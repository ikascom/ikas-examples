import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Wrapper = styled.nav`
  flex-shrink: 0;
  display: inline-block;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
`;

export const ToggleButton = styled.button`
  font-size: 30px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-weight: 300;
  font-size: 28px;
  line-height: 48px;
`;

export const List = styled.ul`
  @media screen and (max-width: ${breakpoints.md}) {
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
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
