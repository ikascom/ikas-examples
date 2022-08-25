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
  :focus > div {
    /* animation: name duration timing-function delay iteration-count direction fill-mode; */
    animation-name: show-tooltip;
    animation-duration: 200ms;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
    animation-fill-mode: forwards;
  }

  :hover > div {
    animation-delay: 150ms;
  }

  @keyframes show-tooltip {
    100% {
      ${({ $placement }) => {
        if ($placement === "left") {
          return css`
            right: 100%;
            transform: translateY(-50%);
          `;
        }

        return css`
          top: 100%;
          transform: translateX(-50%);
        `;
      }};

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
