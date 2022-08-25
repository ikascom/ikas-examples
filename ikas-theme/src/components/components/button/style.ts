import styled from "styled-components";

export const Button = styled.button<{ $block?: boolean }>`
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  background-color: ${({ theme }) => theme.color.buttonBg};
  color: ${({ theme }) => theme.color.button};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $block }) => $block && `width: 100%;`};

  padding: 10px 24px;
  border-radius: 12px;

  :hover {
    opacity: 0.9;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const AnchorButton = styled.a(Button);

export const Loading = styled.span`
  display: inline-block;
  margin-right: 8px;
`;
