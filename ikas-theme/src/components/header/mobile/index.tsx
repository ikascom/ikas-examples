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

const SearchInput = (props: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <S.SearchInputWrapper>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.256 2.77075C13.5917 5.12126 13.5798 8.92023 11.2293 11.256C8.87874 13.5917 5.07977 13.5798 2.74401 11.2293C0.408262 8.87874 0.420231 5.07977 2.77075 2.74401C5.12126 0.408263 8.92023 0.420231 11.256 2.77075ZM12.2781 11.5985C14.6724 8.85601 14.5712 4.68827 11.9653 2.06587C9.24027 -0.676398 4.80814 -0.690361 2.06587 2.03468C-0.676398 4.75973 -0.690361 9.19186 2.03468 11.9341C4.64184 14.5578 8.81159 14.684 11.569 12.3036L16.6474 17.3545L17.3526 16.6455L12.2781 11.5985Z"
          fill="#77777B"
        />
      </svg>

      <S.SearchInput
        type="search"
        placeholder={t(`${NS}:searchInput.placeholder`)}
      />
    </S.SearchInputWrapper>
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
