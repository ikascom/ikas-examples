import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasNavigationLink,
  Link,
  useStore,
  useTranslation,
} from "@ikas/storefront";

import UIStore from "src/store/ui-store";

import { HeaderProps } from "src/components/__generated__/types";
import FavoriteSVG from "src/components/svg/favorite";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";
import LocalizationBar from "../components/localization-bar";
import { SearchInput } from "src/components/header/desktop";

import IOMenuSVG from "./svg/io-menu";
import IOCloseSVG from "./svg/io-close";

import * as S from "./style";

import { NS } from "..";

function MobileHeader(props: HeaderProps) {
  return (
    <>
      {props.showLocalization && <LocalizationBar {...props.localization} />}
      <S.Header>
        <S.Row>
          <LeftSide {...props} />
          <RightSide {...props} />
        </S.Row>
        <SearchInput {...props} />
        <Sidenav {...props} />
      </S.Header>
    </>
  );
}

export default observer(MobileHeader);

const LeftSide = observer((props: HeaderProps) => {
  const uiStore = UIStore.getInstance();
  return (
    <S.LeftSide>
      <S.SidenavButton onClick={uiStore.toggleSidenav}>
        <IOMenuSVG />
      </S.SidenavButton>
      <S.Logo>
        <img src={props.logo.src} />
      </S.Logo>
    </S.LeftSide>
  );
});

const Sidenav = observer((props: HeaderProps) => {
  const uiStore = UIStore.getInstance();
  return (
    <>
      {uiStore.sidenavVisible && (
        <S.SidenavOverlay onClick={() => uiStore.toggleSidenav()} />
      )}
      <S.Sidenav $visible={uiStore.sidenavVisible}>
        <S.SidenavHeader>
          <S.SidenavCloseButton onClick={uiStore.toggleSidenav}>
            <IOCloseSVG />
          </S.SidenavCloseButton>
        </S.SidenavHeader>
        <Navigation {...props} />
      </S.Sidenav>
    </>
  );
});

const Navigation = (props: HeaderProps) => {
  return (
    <S.Navigation>
      <S.NavigationList>
        {props.links?.map((link, index) => (
          <NavigationListItem key={index} link={link} />
        ))}
      </S.NavigationList>
    </S.Navigation>
  );
};

const NavigationListItem = ({ link }: { link: IkasNavigationLink }) => {
  const [showSubLinks, setSubLinks] = useState(false);

  return (
    <S.NavigationListItem>
      <S.NavigationListItemTitle>
        <Link href={link.href} passHref>
          {link.label}
        </Link>
        {!!link.subLinks.length && (
          <S.NavigationListItemChildButton
            onClick={() => setSubLinks((prev) => !prev)}
          >
            {showSubLinks ? "-" : "+"}
          </S.NavigationListItemChildButton>
        )}
      </S.NavigationListItemTitle>
      {!!link.subLinks.length && showSubLinks && (
        <S.NavigationItemDropdown>
          <S.NavigationItemDropdownList>
            {link.subLinks.map((subLink, subIndex) => (
              <S.NavigationItemDropdownListItem key={subIndex}>
                <Link href={subLink.href} passHref>
                  {subLink.label}
                </Link>
              </S.NavigationItemDropdownListItem>
            ))}
          </S.NavigationItemDropdownList>
        </S.NavigationItemDropdown>
      )}
    </S.NavigationListItem>
  );
};

const RightSide = observer((props: HeaderProps) => {
  const store = useStore();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  return (
    <S.RightSide>
      <S.FavoriteWrapper>
        <FavoriteSVG />
      </S.FavoriteWrapper>
      <S.AccountWrapper>
        <AccountSVG />
      </S.AccountWrapper>
      <S.CartWrapper>
        <S.CartQuantity>{quantity}</S.CartQuantity>
        <CartSVG />
      </S.CartWrapper>
    </S.RightSide>
  );
});
