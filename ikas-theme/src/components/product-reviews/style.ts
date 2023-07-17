import styled from "styled-components";
import breakpoints from "src/styles/breakpoints";

export const ProductReviews = styled.div`
  padding-block: 2rem;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;

  @media (min-width: ${breakpoints.md}) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;

export const ReviewsSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

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
  font-size: 1rem;
  line-height: 1.5rem;
`;

export const Reviews = styled.div`
  border-top: 1px solid ${(props) => props.theme.color.border};
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding-block: 1rem;

  @media (min-width: ${breakpoints.md}) {
    gap: 0.5rem 2rem;
  }
`;
