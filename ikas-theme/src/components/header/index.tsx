import React from "react";
import { observer } from "mobx-react-lite";

import { useScreen } from "src/utils/hooks/useScreen";
import { HeaderProps } from "../__generated__/types";

import DesktopHeader from "./desktop";
import MobileHeader from "./mobile";
import useClient from "src/utils/hooks/useClient";

export const NS = "header"; // for translations (i18n)

function Header(props: HeaderProps) {
  const isClient = useClient();
  const { isMobile } = useScreen();

  if (!isClient) return null;
  if (isMobile) return <MobileHeader {...props} />;
  return <DesktopHeader {...props} />;
}

export default observer(Header);
