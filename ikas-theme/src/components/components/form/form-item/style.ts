import styled, { css } from "styled-components";
import { FormItemStatus } from ".";

type StyledStatusProp = {
  $status: FormItemStatus;
};

export const FORM_ITEM_MARGIN_BOTTOM = 20;
export const FormItemWrapper = styled.fieldset<{
  $noMargin: boolean;
}>`
  ${({ $noMargin }) =>
    !$noMargin &&
    css`
      margin-bottom: ${FORM_ITEM_MARGIN_BOTTOM}px;
    `};
`;
export const LabelChildrenWrapper = styled.div`
  display: block;
`;
export const LabelWrapper = styled.div`
  margin-bottom: 4px;
  font-weight: 300;
  font-size: 16px;
  line-height: 28px;
`;
export const Help = styled.div<StyledStatusProp>`
  margin-top: 8px;
  font-weight: 300;
  line-height: 28px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, $status }) => {
    if ($status === "error") {
      return theme.color.red;
    }
    return theme.color.primaryText;
  }};
`;
