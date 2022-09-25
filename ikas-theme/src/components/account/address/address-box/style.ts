import styled from "styled-components";

export const AddressBox = styled.li`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.p`
  font-weight: 500;
  margin-bottom: 8px;
  flex-grow: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

export const AddressText = styled.p`
  flex-grow: 1;
  color: ${({ theme }) => theme.color.secondaryText};
`;

export const ButtonsWrapper = styled.footer`
  flex-grow: 0;
  display: flex;
  align-items: center;
  margin-top: 24px;
  gap: 24px;
`;

export const Button = styled.button`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.primaryText};
  :hover {
    text-decoration: underline;
  }
`;
