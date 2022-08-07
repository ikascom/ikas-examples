import React from "react";
import { withTheme } from "styled-components";

import * as S from "./style";

interface ButtonProps {
  block?: boolean;
  children: React.ReactNode;
  theme: any;
}

function Button(props: ButtonProps) {
  return <S.Button $block={!!props.block}>{props.children}</S.Button>;
}

export default withTheme(Button);
