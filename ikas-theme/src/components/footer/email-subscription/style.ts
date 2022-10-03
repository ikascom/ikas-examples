import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const EmailSubscription = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-bottom: 50px;
  margin-right: auto;

  @media (min-width: ${breakpoints.md}) {
    margin-bottom: 20px;
    margin-left: unset;
    text-align: left;
    margin-right: unset;
  } ;
`;

export const ResponseStatus = styled.p<{ $status: "error" | "success" }>`
  color: ${({ $status, theme }) =>
    $status === "error" ? theme.color.red : theme.color.green};
`;

export const Title = styled.p`
  margin-bottom: 8px;
`;

export const Text = styled.p`
  color: ${({ theme }) => theme.color.secondaryText};
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: 8px;
`;
