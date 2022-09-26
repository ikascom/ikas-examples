import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Order = styled.li`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding-top: 40px;
  padding-bottom: 40px;
  gap: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  :last-child {
    border-bottom: none;
  }

  @media screen and (min-width: ${breakpoints.md}) {
    gap: 32px;
  }

  @media screen and (max-width: ${breakpoints.sm}) {
    display: flex;
    flex-direction: column;
  }
`;

export const Picture = styled.picture`
  grid-column: span 4 / span 4;
`;

export const Content = styled.section`
  grid-column: span 8 / span 8;
`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  button {
    margin-left: auto;
  }
`;

export const OrderedAt = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.secondaryText};
  margin-bottom: 4px;
`;

export const OrderNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.secondaryText};
  margin-bottom: 4px;
`;

export const ProductCount = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.secondaryText};
  margin-bottom: 4px;
`;
