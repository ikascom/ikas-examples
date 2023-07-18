import styled from "styled-components";

export const StarsWrapper = styled.div`
  display: flex;
`;

export const Star = styled.span<{
  $isHovered?: boolean;
  $isClickable?: boolean;
}>`
  display: inline-block;
  position: relative;
  fill: ${(props) => props.theme.color.buttonBg};

  &:hover {
    color: ${(props) => props.theme.color.buttonBg};
  }

  opacity: ${(props) => (props.$isHovered ? "0.6" : "1")};
  cursor: ${(props) => (props.$isClickable ? "pointer" : "default")};
`;

export const Inner = styled.span<{
  $isHovered?: boolean;
}>`
  opacity: ${(props) => (props.$isHovered ? "0" : "1")};

  .start-icon {
    width: 100%;
    height: 100%;
  }
`;

export const Outher = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;

  .start-icon {
    width: 100%;
    height: 100%;
  }
`;
