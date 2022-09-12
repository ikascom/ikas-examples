import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Sort = styled.div``;
export const Label = styled.label`
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  margin-right: 8px;
`;
export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;

  @media screen and (max-width: ${breakpoints.md}) {
    display: block;
  }
`;
export const Select = styled.select`
  appearance: none;
  padding-right: 40px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  @media screen and (max-width: ${breakpoints.md}) {
    width: 100%;
  }
`;
export const Option = styled.option``;
export const SelectIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
`;
