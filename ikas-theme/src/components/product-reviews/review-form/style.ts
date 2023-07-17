import styled from "styled-components";

import breakpoints from "src/styles/breakpoints";

export const ReviewForm = styled.div`
  padding-block: 2rem;
  border-top: 1px solid ${(props) => props.theme.color.border};
`;

export const Wrapper = styled.div`
  max-width: ${breakpoints.md};
  margin-left: auto;
  margin-right: auto;
`;

export const Title = styled.h3`
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
`;
