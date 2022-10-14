import React from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useStore, useTranslation, Link } from "@ikas/storefront";

import { Container } from "src/components/components/container";
import { HeaderProps } from "src/components/__generated__/types";

import FavoriteSVG from "src/components/svg/favorite";
import AccountSVG from "src/components/svg/account";
import CartSVG from "src/components/svg/cart";
import LocalizationBar from "../components/localization-bar";
import UIStore from "src/store/ui-store";
import MaxQuantityPerCartModal from "src/components/components/modal-max-quantity-per-cart";

import { NS } from "../";

import * as S from "./style";

const DesktopHeader = (props: HeaderProps) => {
  return (
    <>
      {props.showLocalization && <LocalizationBar {...props.localization} />}
      <S.Header>
        <Container>
          <S.InnerContainer>
            <LeftSide {...props} />
            <Center {...props} />
            <RightSide {...props} />
          </S.InnerContainer>
        </Container>
      </S.Header>
      <MaxQuantityPerCartModal />
    </>
  );
};

export default observer(DesktopHeader);

const LeftSide = (props: HeaderProps) => {
  const { logo, logoMaxHeight, logoMaxWidth } = props;
  return (
    <S.LeftSide>
      <Link passHref href="/">
        <a>
          <S.LogoWrapper
            style={{
              height: logoMaxHeight.value,
              maxWidth: logoMaxWidth.value,
            }}
          >
            <S.Logo style={{ height: logoMaxHeight.value }} src={logo.src} />
          </S.LogoWrapper>
        </a>
      </Link>
    </S.LeftSide>
  );
};

const Center = (props: HeaderProps) => {
  return (
    <S.Center>
      <Navigation {...props} />
      <SearchInput {...props} />
    </S.Center>
  );
};

const Navigation = (props: HeaderProps) => {
  return (
    <S.Navigation>
      <S.NavigationList>
        {props.links?.map((link, index) => (
          <S.NavigationListItem key={index}>
            <Link href={link.href} passHref>
              {link.label}
            </Link>
            {!!link.subLinks.length && (
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
        ))}
      </S.NavigationList>
    </S.Navigation>
  );
};

export const SearchInput = observer((props: HeaderProps) => {
  const { t } = useTranslation();
  const uiStore = UIStore.getInstance();
  const router = useRouter();

  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/search?s=${uiStore.searchKeyword}`);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    uiStore.searchKeyword = event.target.value;
  };

  return (
    <S.SearchInputWrapper>
      <S.SearchInput
        type="search"
        value={uiStore.searchKeyword}
        placeholder={t(`${NS}:searchInput.placeholder`)}
        onKeyPress={onKeyPress}
        onChange={onChange}
      />
    </S.SearchInputWrapper>
  );
});

const RightSide = observer((props: HeaderProps) => {
  const store = useStore();
  const quantity = store.cartStore.cart?.itemQuantity ?? 0;
  return (
    <S.RightSide>
      <Link href="/account/favorite-products" passHref>
        <S.FavoriteWrapper as="a">
          <FavoriteSVG />
        </S.FavoriteWrapper>
      </Link>
      <Link href="/account" passHref>
        <S.AccountWrapper as="a">
          <AccountSVG />
        </S.AccountWrapper>
      </Link>
      <Link passHref href="/cart">
        <S.CartWrapper as="a">
          <S.CartQuantity>{quantity}</S.CartQuantity>
          <CartSVG />
        </S.CartWrapper>
      </Link>
    </S.RightSide>
  );
});
