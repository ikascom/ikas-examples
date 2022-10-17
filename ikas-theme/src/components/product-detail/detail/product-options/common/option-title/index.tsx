import React from "react";
import Tooltip, { InfoSVG } from "src/components/components/tooltip";
import * as S from "./style";

type Props = {
  name: string;
  isOptional?: boolean;
  hasError?: boolean;
  price?: string;
  tooltipText?: string;
};

const OptionTitle = ({
  name,
  price,
  isOptional,
  hasError = false,
  tooltipText,
}: Props) => {
  return (
    <S.Title $hasError={hasError}>
      <S.Name>
        {name} {!isOptional && "*"}
      </S.Name>
      {price && <S.Price>({price})</S.Price>}
      {tooltipText && (
        <Tooltip text={tooltipText}>
          <S.InfoSVGWrapper $hasError={hasError}>
            <InfoSVG />
          </S.InfoSVGWrapper>
        </Tooltip>
      )}
    </S.Title>
  );
};

export default OptionTitle;
