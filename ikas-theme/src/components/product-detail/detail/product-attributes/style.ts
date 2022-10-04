import styled from "styled-components";

import Collapse from "src/components/components/collapse";

export const ProductAttributes = styled.div`
  margin-top: 20px;
`;

export const AttributeValueWrapper = styled(Collapse)`
  position: relative;
  :not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
  }
  padding-top: 12px;
  padding-bottom: 12px;

  .collapse-header {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
    color: ${({ theme }) => theme.color.primaryText};
  }

  .collapse-children {
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 28px;
    color: ${({ theme }) => theme.color.primaryText};
  }

  table {
    width: 100%;
  }
`;
