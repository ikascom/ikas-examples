import styled from "styled-components";
import { FormItemStatus } from ".";

type StyledStatusProp = {
  $status: FormItemStatus;
};

export const FormItemWrapper = styled.fieldset`
  margin-bottom: 20px;
`;
export const LabelChildrenWrapper = styled.div`
  display: block;
`;
export const LabelWrapper = styled.div``;
export const Help = styled.div<StyledStatusProp>`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, $status }) => {
    if ($status === "error") {
      return theme.color.red;
    }
    return theme.color.primaryText;
  }};
`;
