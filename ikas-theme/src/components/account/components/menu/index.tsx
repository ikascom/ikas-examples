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
import CloseSVG from "src/components/svg/close";
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

const Menu = () => {
  const { t } = useTranslation();
  const store = useStore();
  const { isMobile } = useScreen();
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  const onMenuButtonClick = () => setMobileMenuVisible((prev) => !prev);

  const isListVisible = (isMobile && isMobileMenuVisible) || !isMobile;

  return (
    <>
      {isMobile && isListVisible && <S.MobileOverlay />}
      {isMobile && (
        <FixedMenuToggleButton
          active={isListVisible}
          onMenuButtonClick={onMenuButtonClick}
        />
      )}
      {isListVisible && (
        <S.Wrapper>
          {!isMobile && (
            <S.DesktopTitle>{t(`${NS}:menu.title`)}</S.DesktopTitle>
          )}
          {isMobile && <MobileTitle store={store} />}
          {isListVisible && <List store={store} />}
        </S.Wrapper>
      )}
    </>
  );
};

export default observer(Menu);

const FixedMenuToggleButton = ({
  active,
  onMenuButtonClick,
}: {
  active: boolean;
  onMenuButtonClick: () => void;
}) => {
  return (
    <S.ToggleButton title="Toggle Navigation Menu" onClick={onMenuButtonClick}>
      {active && <CloseSVG />}
      {!active && (
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
      )}
    </S.ToggleButton>
  );
};

type MobileTitleProps = {
  store: IkasBaseStore;
};

const MobileTitle = observer(({ store }: MobileTitleProps) => {
  const { t } = useTranslation();
  const currentPage = menu.find(
    (item) => item.pageType === store.currentPageType
  );
  const title =
    store.currentPageType === IkasThemeJsonPageType.ORDER_DETAIL
      ? t(`${NS}:menu.orderDetail`)
      : t(`${NS}:menu.${currentPage?.i18nKey}`);

  return (
    <S.TitleWrapper>
      <S.Title>{title}</S.Title>
    </S.TitleWrapper>
  );
});

const List = observer(({ store }: { store: IkasBaseStore }) => {
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
        <button onClick={() => store.customerStore.logout()}>
          {t(`${NS}:menu.logout`)}
        </button>
      </S.ListItem>
    </S.List>
  );
});
