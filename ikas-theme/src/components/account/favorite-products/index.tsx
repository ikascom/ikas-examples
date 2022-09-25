import React from "react";
import { observer } from "mobx-react-lite";
import {
  Link,
  useTranslation,
  IkasProduct,
  useStore,
  IkasBaseStore,
} from "@ikas/storefront";

import Product from "src/components/product-list/right/product";
import Header from "src/components/account/components/header";
import Tooltip from "src/components/components/tooltip";
import useFavoriteProducts from "./useFavoriteProducts";

import FavoriteSVG from "src/components/svg/favorite";

import { NS } from "src/components/account";

import * as S from "./style";

const FavoriteProducts = () => {
  const { t } = useTranslation();
  const store = useStore();
  const { products, isPending, getFavoriteProducts } = useFavoriteProducts();

  const headerTitle =
    t(`${NS}:favoriteProducts.title`) + ` (${products.length})`;

  return (
    <div>
      <Header title={headerTitle} />
      {isPending && (
        <S.Loading>{t(`${NS}:favoriteProducts.loading`)}</S.Loading>
      )}
      {!isPending && products.length === 0 && <NoProducts />}
      {!isPending && !!products.length && (
        <Products
          products={products}
          store={store}
          getFavoriteProducts={getFavoriteProducts}
        />
      )}
    </div>
  );
};

export default observer(FavoriteProducts);

type ProductsProps = {
  products: IkasProduct[];
  store: IkasBaseStore;
  getFavoriteProducts: () => void;
};

const Products = observer(
  ({ store, products, getFavoriteProducts }: ProductsProps) => {
    return (
      <S.Products>
        {products.map((product, index) => {
          const onClick = async () => {
            await store.customerStore.removeProductFromFavorites(product.id);
            getFavoriteProducts();
          };

          return (
            <S.ProductWrapper key={product.id + index}>
              <S.ProductFavoriteButton onClick={onClick}>
                <Tooltip noCursor text="Remove from favorites">
                  <FavoriteSVG fill />
                </Tooltip>
              </S.ProductFavoriteButton>
              <Product product={product} />
            </S.ProductWrapper>
          );
        })}
      </S.Products>
    );
  }
);

const NoProducts = () => {
  const { t } = useTranslation();
  return (
    <S.NoProducts>
      <S.NoProductsTitle className="text-xl mb-4">
        {t(`${NS}:favoriteProducts.noFavoriteProduct`)}
      </S.NoProductsTitle>
      <Link passHref href="/">
        <a>{t(`${NS}:favoriteProducts.browseProduct`)}</a>
      </Link>
    </S.NoProducts>
  );
};
