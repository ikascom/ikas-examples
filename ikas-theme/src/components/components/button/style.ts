import styled from "styled-components";

export const Button = styled.button<{ $block?: boolean }>`
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  background-color: ${({ theme }) => theme.color.buttonBg};
  color: ${({ theme }) => theme.color.button};

  ${({ $block }) => $block && `width: 100%;`}

  padding: 12px 24px;
  border-radius: 12px;

  :hover {
    opacity: 0.9;
  }
`;
