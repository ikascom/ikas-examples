import styled from "styled-components";
import { ButtonSizes } from "../style";

type ButtonProps = {
  $bgColor: string;
  $color: string;
  $borderColor: string;
};

export const Button = styled.button<ButtonProps>`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.inputBorderRadius};
  width: 100%;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  font-size: 16px;
  line-height: 28px;
  height: ${ButtonSizes.middle}px;
`;

export const Icon = styled.span`
  width: 45px;
  height: 45px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize["2xl"]};
`;

type LineProps = {
  $bgColor: string;
};

export const Line = styled.div<LineProps>`
  position: absolute;
  height: 100%;
  left: 46px;
  width: 1px;
  background-color: ${({ $bgColor }) => $bgColor};
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  text-align: left;
`;

export const Text = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1;
  font-weight: 500;
`;

export const SubText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-top: 2px;
  line-height: 1;
  font-weight: 300;
  display: block;
`;
