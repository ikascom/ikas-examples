import styled from "styled-components";

export const Pagination = styled.footer`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

export const Button = styled.button`
  :disabled {
    color: ${({ theme }) => theme.color.secondaryText};
  }
`;

export const NextButton = styled(Button)``;
export const PrevButton = styled(Button)``;
