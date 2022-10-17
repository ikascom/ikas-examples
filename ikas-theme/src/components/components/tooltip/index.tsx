import React from "react";
import * as S from "./style";

export type PlacementType = "bottom" | "left";

type TooltipProps = {
  noCursor?: boolean;
  text: React.ReactNode;
  /** * default bottom */
  placement?: PlacementType;
  children: React.ReactNode;
};

const Tooltip = (props: TooltipProps) => {
  const { placement = "bottom", text, noCursor, children } = props;
  return (
    <S.Tooltip tabIndex={0} $placement={placement} $noCursor={!!noCursor}>
      {children}
      <S.TooltipTextWrapper $placement={placement}>
        <S.TooltipText>{text}</S.TooltipText>
      </S.TooltipTextWrapper>
    </S.Tooltip>
  );
};

export default Tooltip;

export const InfoSVG = (props: JSX.IntrinsicElements["svg"]) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" d="M0 0h24v24H0V0z"></path>
    <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
  </svg>
);
