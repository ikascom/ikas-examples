import React from "react";
import { observer } from "mobx-react-lite";
import {
  formatCurrency,
  IkasOrderLineItem,
  IkasOrderLineItemOption,
  IkasOrderLineItemOptionValue,
  IkasProductOptionType,
  useStore,
  Image,
  Link,
  IkasBaseStore,
} from "@ikas/storefront";

import ProductImagePlaceholder from "src/components/svg/product-image-placeholder";
import { maxQuantityPerCartHandler } from "src/utils/hooks/useAddToCart";
import { QuantityButton } from "src/components/product-detail/detail/add-to-cart";
import { ColorSwatch } from "src/components/components/swatch/style";

import AiOutlineCloudDownloadSVG from "./svg/ai-outline-cloud-download";
import RemoveSVG from "./svg/remove";

import * as S from "./style";

import {
  PriceColumn,
  ProductColumn,
  QuantityColumn,
  RemoveColumn,
} from "../style";

const Item = observer(({ item }: { item: IkasOrderLineItem }) => {
  const store = useStore();

  return (
    <S.Item>
      <ItemProductColumn item={item} store={store} />
      <ItemQuantityColumn item={item} store={store} />
      <ItemPriceColumn item={item} />
      <ItemRemoveColumn item={item} store={store} />
    </S.Item>
  );
});

export default Item;

const ItemProductColumn = observer(
  ({ item, store }: { item: IkasOrderLineItem; store: IkasBaseStore }) => {
    const variantValuesText = item.variant.variantValues
      ?.map((vV) => vV.variantValueName)
      .join(", ");
    return (
      <ProductColumn>
        <S.ItemProductImageAndNameWrapper>
          <ItemImage item={item} />
          <div>
            <S.ItemProductName>{item.variant.name}</S.ItemProductName>
            <S.ItemProductVariantValuesText>
              {variantValuesText}
            </S.ItemProductVariantValuesText>
            <ItemOptions
              item={item}
              currencyCode={store.cartStore.cart!.currencyCode || ""}
              currencySymbol={store.cartStore.cart!.currencySymbol || ""}
            />
          </div>
        </S.ItemProductImageAndNameWrapper>
      </ProductColumn>
    );
  }
);

const ItemQuantityColumn = observer(
  ({ item, store }: { item: IkasOrderLineItem; store: IkasBaseStore }) => {
    const handleQuantityChange = async (value: number) => {
      const result = await store.cartStore.changeItemQuantity(item, value);
      if (result.response?.graphQLErrors) {
        maxQuantityPerCartHandler({
          productName: item.variant.name,
          errors: result.response?.graphQLErrors,
        });
      }
    };
    return (
      <QuantityColumn>
        <QuantityButton
          isFullWidth={false}
          quantity={item.quantity}
          onChange={handleQuantityChange}
        />
      </QuantityColumn>
    );
  }
);

const ItemPriceColumn = observer(({ item }: { item: IkasOrderLineItem }) => {
  return (
    <PriceColumn>
      <S.ItemPriceWrapper>
        {item.discountPrice !== null && (
          <S.ItemSellPrice>{item.formattedPriceWithQuantity}</S.ItemSellPrice>
        )}
        <S.ItemPrice>{item.formattedFinalPriceWithQuantity}</S.ItemPrice>
      </S.ItemPriceWrapper>
    </PriceColumn>
  );
});

const ItemRemoveColumn = observer(
  ({ item, store }: { item: IkasOrderLineItem; store: IkasBaseStore }) => {
    return (
      <RemoveColumn>
        <S.ItemRemove onClick={() => store.cartStore.removeItem(item)}>
          <RemoveSVG />
        </S.ItemRemove>
      </RemoveColumn>
    );
  }
);

const ItemImage = observer(({ item }: { item: IkasOrderLineItem }) => {
  return (
    <S.ItemProductImage>
      <Link passHref href={item.variant.href || ""}>
        <a>
          {!item.variant.mainImage?.id ? (
            <ProductImagePlaceholder />
          ) : (
            <Image
              image={item.variant.mainImage}
              layout="responsive"
              width="1"
              height="1"
              sizes="200px"
            />
          )}
        </a>
      </Link>
    </S.ItemProductImage>
  );
});

type ItemOptionsProps = {
  item: IkasOrderLineItem;
  currencyCode: string;
  currencySymbol: string;
};

const formatOptionPrice = (
  price: number,
  currencyCode: string,
  currencySymbol: string
) => formatCurrency(price, currencyCode, currencySymbol);

const ItemOptions = observer(
  ({ item, currencyCode, currencySymbol }: ItemOptionsProps) => {
    const OptionValue = ({
      option,
      value,
    }: {
      option: IkasOrderLineItemOption;
      value: IkasOrderLineItemOptionValue;
    }) => {
      const price = value.price
        ? `+ ${formatOptionPrice(value.price, currencyCode, currencySymbol)}`
        : "";
      const OptionMeta = () => {
        return (
          <span>
            {option.name} {price}
          </span>
        );
      };
      switch (option.type) {
        case IkasProductOptionType.TEXT:
          return (
            <div>
              <OptionMeta /> - {value.value}
            </div>
          );
        case IkasProductOptionType.TEXT_AREA:
          return (
            <div>
              <OptionMeta /> - {value.value}
            </div>
          );
        case IkasProductOptionType.CHECKBOX:
          return (
            <div>
              <OptionMeta />
            </div>
          );
        case IkasProductOptionType.CHOICE:
          return (
            <div>
              <OptionMeta /> - {value.name}
            </div>
          );
        case IkasProductOptionType.COLOR_PICKER:
          return (
            <div>
              <OptionMeta />
              {" - "}
              <ColorSwatch
                as="span"
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
                $noMargin
                $isSelected={false}
                $color={value.value}
              />
            </div>
          );
        case IkasProductOptionType.FILE:
          return (
            <div>
              <OptionMeta />
              {" - "}
              <S.OptionFileDownloadButton
                onClick={async () => await value.downloadFile()}
              >
                <span>
                  <AiOutlineCloudDownloadSVG />
                </span>
                <span>{value.fileName}</span>
              </S.OptionFileDownloadButton>
            </div>
          );
        default:
          return null;
      }
    };

    if (!item.options || !item.options?.length) return null;
    return (
      <S.ItemOptions>
        {item.options.map((option, index) => (
          <div key={index}>
            {option.values.map((value, valueIndex) => (
              <OptionValue key={valueIndex} option={option} value={value} />
            ))}
          </div>
        ))}
      </S.ItemOptions>
    );
  }
);
