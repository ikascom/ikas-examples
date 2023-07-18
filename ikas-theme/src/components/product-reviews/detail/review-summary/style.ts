import styled from "styled-components";

import breakpoints from "src/styles/breakpoints";

export const ReviewsSummary = styled.div``;

export const ReviewsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Preview = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export const PreviewDesciption = styled.div`
  color: ${(props) => props.theme.color.secondaryText};
  font-size: ${(props) => props.theme.fontSize.base};
  line-height: 1.5rem;
`;

export const PreviewEmpty = styled.div`
  color: ${(props) => props.theme.color.secondaryText};
  font-size: ${(props) => props.theme.fontSize.base};
  line-height: 1.5rem;
`;
