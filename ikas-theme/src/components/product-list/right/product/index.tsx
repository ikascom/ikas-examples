import React from "react";
import { IkasProduct, Image, Link, useTranslation } from "@ikas/storefront";

import * as S from "./style";
import { observer } from "mobx-react-lite";

type Props = {
  product: IkasProduct;
};

const Product = (props: Props) => {
  const { t } = useTranslation();
  const { product } = props;

  const a11yTitle = product.selectedVariant.hasStock
    ? ""
    : t("common:product.discountBadgeSoldOut");

  return (
    <S.Wrapper>
      <Link passHref href={product.href}>
        <a title={a11yTitle}>
          <S.ImageWrapper $hasStock={product.selectedVariant.hasStock}>
            <ProductImage {...props} />
            <DiscountBadge {...props} />
          </S.ImageWrapper>
          <ProductTitle {...props} />
          <Price {...props} />
        </a>
      </Link>
    </S.Wrapper>
  );
};

export default observer(Product);

const ProductImage = observer(({ product }: Props) => {
  if (!product.selectedVariant.mainImage?.image?.id) {
    return <img src="/product-dummy-image.jpeg" />;
  }

  return product.selectedVariant.mainImage.image.isVideo ? (
    <video src={product.selectedVariant.mainImage.image.src} />
  ) : (
    <Image
      layout="responsive"
      width="200px"
      height="200px"
      image={product.selectedVariant.mainImage?.image!}
    />
  );
});

const DiscountBadge = observer(({ product }: Props) => {
  const { t } = useTranslation();
  if (
    !product.selectedVariant.price.hasDiscount &&
    product.selectedVariant.hasStock
  )
    return null;
  return (
    <S.DiscountBadge $hasStock={product.selectedVariant.hasStock}>
      {!product.selectedVariant.hasStock && (
        <S.DiscountBadgeSoldOut>
          {t("common:product.discountBadgeSoldOut")}
        </S.DiscountBadgeSoldOut>
      )}
      {product.selectedVariant.hasStock && (
        <>
          <S.DiscountBadgeDiscountRatio>
            %{product.selectedVariant.price.discountPercentage}
          </S.DiscountBadgeDiscountRatio>
          <S.DiscountBadgeDiscountText>
            {t("common:product.discountText")}
          </S.DiscountBadgeDiscountText>
        </>
      )}
    </S.DiscountBadge>
  );
});

const Price = observer(({ product }: Props) => {
  return (
    <S.PriceWrapper>
      {product.selectedVariant.price.hasDiscount && (
        <S.SellPrice>
          {product.selectedVariant.price.formattedSellPrice}
        </S.SellPrice>
      )}
      <S.FinalPrice $hasStock={product.selectedVariant.hasStock}>
        {product.selectedVariant.price.formattedFinalPrice}
      </S.FinalPrice>
    </S.PriceWrapper>
  );
});

const ProductTitle = observer(({ product }: Props) => (
  <S.Title>{product.name}</S.Title>
));
