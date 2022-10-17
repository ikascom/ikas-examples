import React from "react";
import { observer } from "mobx-react-lite";

import { useScreen } from "src/utils/hooks/useScreen";
import { HeaderProps } from "../__generated__/types";

import DesktopHeader from "./desktop";
import MobileHeader from "./mobile";

export const NS = "header"; // for translations (i18n)

const Header = (props: HeaderProps) => {
  const { isMobile } = useScreen();

  if (isMobile) return <MobileHeader {...props} />;
  return <DesktopHeader {...props} />;
};

export default observer(Header);
