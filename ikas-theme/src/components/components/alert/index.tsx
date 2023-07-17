import React, { useState } from "react";

import * as S from "./style";

export type FormAlertType = {
  title?: string;
  text: string;
  status: "error" | "success" | "info";
};

type AlertComponentProps = FormAlertType & {
  closable?: boolean;
  onClose?: () => void;
  style?: React.CSSProperties;
};

const AlertComponent = (props: AlertComponentProps) => {
  const [isVisible, setVisibility] = useState(true);

  const onClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setVisibility(false);
    props.onClose && props.onClose();
  };

  if (!isVisible) return null;
  return (
    <S.AlertWrapper $status={props.status} style={props.style}>
      {props.title && <S.AlertTitle>{props.title}</S.AlertTitle>}
      <S.AlertText>{props.text}</S.AlertText>
      {props.closable && <S.CloseButton onClick={onClose}>x</S.CloseButton>}
    </S.AlertWrapper>
  );
};

export default AlertComponent;
