import styled from "styled-components";

type Props = {
  $color: "red" | "green" | "black";
};

export const Text = styled.div<Props>`
  margin-bottom: 10px;
  color: ${({ theme, $color }) => theme.color[$color]};
  font-weight: 700;
`;
