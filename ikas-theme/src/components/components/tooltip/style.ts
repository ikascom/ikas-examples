import styled, { css } from "styled-components";
import { PlacementType } from ".";

type Props = {
  $noCursor: boolean;
  $placement: PlacementType;
};

export const Tooltip = styled.div<Props>`
  position: relative;
  display: inline-block;
  z-index: 1;

  ${({ $noCursor }) => !$noCursor && "cursor: help;"};

  :hover > div,
  :focus-visible > div {
    ${({ $placement }) => {
      if ($placement === "left") {
        return "animation-name: show-tooltip-left;";
      }
      return "animation-name: show-tooltip-bottom;";
    }};
    animation-duration: 200ms;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
    animation-fill-mode: forwards;
  }

  :hover > div {
    animation-delay: 150ms;
  }

  @keyframes show-tooltip-left {
    100% {
      top: 50%;
      transform: translateY(-50%);
      right: 100%;
      opacity: 100;
      visibility: visible;
    }
  }

  @keyframes show-tooltip-bottom {
    100% {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      opacity: 100;
      visibility: visible;
    }
  }
`;

type TooltipTextWrapperProps = {
  $placement: PlacementType;
};

export const TooltipTextWrapper = styled.div<TooltipTextWrapperProps>`
  position: absolute;
  visibility: hidden;
  opacity: 0;
  min-width: 150px;

  ${({ $placement }) => {
    if ($placement === "left") {
      return css`
        top: calc(50%);
        transform: translateY(-50%);
        right: calc(100% - 10px);
      `;
    }

    return css`
      top: calc(100% - 10px);
      left: 50%;
      transform: translateX(-50%);
    `;
  }};

  padding: 8px 4px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: default;
`;
export const TooltipText = styled.span`
  color: ${({ theme }) => theme.color.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;
