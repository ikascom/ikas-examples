import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize["6xl"]};
  font-weight: 700;
  margin-bottom: 30px;
  letter-spacing: 15px;
`;

export const Text = styled.p`
  margin-bottom: 40px;
  color: ${({ theme }) => theme.color.secondaryText};
  font-size: ${({ theme }) => theme.fontSize["xl"]};
  letter-spacing: 0.8px;
`;
