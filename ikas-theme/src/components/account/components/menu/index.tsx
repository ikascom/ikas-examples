import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasBaseStore,
  IkasThemeJsonPageType,
  Link,
  useStore,
  useTranslation,
} from "@ikas/storefront";

import { useScreen } from "src/utils/hooks/useScreen";
import { NS } from "../..";

import * as S from "./style";

const menu = [
  {
    i18nKey: "accountInfo",
    pageType: IkasThemeJsonPageType.ACCOUNT,
    href: "/account",
  },
  {
    i18nKey: "favoriteProducts",
    pageType: IkasThemeJsonPageType.FAVORITE_PRODUCTS,
    href: "/account/favorite-products",
  },
  {
    i18nKey: "raffles",
    pageType: IkasThemeJsonPageType.RAFFLE_ACCOUNT,
    href: "/account/raffles",
  },
  {
    i18nKey: "orders",
    pageType: IkasThemeJsonPageType.ORDERS,
    href: "/account/orders",
  },
  {
    i18nKey: "addresses",
    pageType: IkasThemeJsonPageType.ADDRESSES,
    href: "/account/addresses",
  },
];

export const Menu = observer(() => {
  const { t } = useTranslation();
  const store = useStore();
  const { isMobile } = useScreen();

  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const isListVisible = (isMobile && isMobileMenuVisible) || !isMobile;

  const onMenuButtonClick = () => setMobileMenuVisible((prev) => !prev);

  return (
    <S.Wrapper>
      <RenderTitle
        isMobile={isMobile}
        store={store}
        onMenuButtonClick={onMenuButtonClick}
      />
      {isListVisible && <RenderList store={store} />}
    </S.Wrapper>
  );
});

type RenderTitleProps = {
  isMobile: boolean;
  store: IkasBaseStore;
  onMenuButtonClick: () => void;
};

const RenderTitle = observer(
  ({ isMobile, store, onMenuButtonClick }: RenderTitleProps) => {
    const { t } = useTranslation();
    const title = isMobile
      ? t(
          `${NS}:menu.${
            menu.find((item) => item.pageType === store.currentPageType)
              ?.i18nKey
          }`
        )
      : t(`${NS}:menu.title`);
    return (
      <S.TitleWrapper>
        <S.Title>{title}</S.Title>
        {isMobile && (
          <S.ToggleButton onClick={onMenuButtonClick}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 20 20"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </S.ToggleButton>
        )}
      </S.TitleWrapper>
    );
  }
);

const RenderList = observer(({ store }: { store: IkasBaseStore }) => {
  const { t } = useTranslation();
  return (
    <S.List>
      {menu.map((item, index) => (
        <S.ListItem
          key={index}
          $selected={store.currentPageType === item.pageType}
        >
          <Link passHref href={item.href}>
            {t(`${NS}:menu.${item.i18nKey}`)}
          </Link>
        </S.ListItem>
      ))}
      <S.ListItem>
        <Link
          href="/account/login"
          onClick={() => store.customerStore.logout()}
        >
          {t(`${NS}:menu.logout`)}
        </Link>
      </S.ListItem>
    </S.List>
  );
});
