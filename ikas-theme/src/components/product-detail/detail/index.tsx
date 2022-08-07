import React from "react";
import { observer } from "mobx-react-lite";
import {
  IkasDisplayedVariantType,
  IkasDisplayedVariantValue,
  IkasVariantSelectionType,
  IkasVariantValue,
  useTranslation,
} from "@ikas/storefront";

import { ProductDetailProps } from "src/components/__generated__/types";
import Button from "src/components/components/button";

import FavoriteSVG from "src/components/svg/favorite";
import FacebookSVG from "src/components/svg/facebook";
import WhatsAppSVG from "src/components/svg/whatsApp";
import TwitterSVG from "src/components/svg/twitter";
import PinterestSVG from "src/components/svg/pinterest";

import * as S from "./style";

const NS = "product-detail"; // for translation (i18n)

function Detail(props: ProductDetailProps) {
  return (
    <S.Wrapper>
      <Title {...props} />
      <FavoriteButton {...props} />
      <Price {...props} />
      <VariantValues {...props} />
      <AddToCartButton {...props} />
      <Description {...props} />
      <SocialShare {...props} />
    </S.Wrapper>
  );
}

export default observer(Detail);

const Title = (props: ProductDetailProps) => {
  return <S.Title>{props.product.name}</S.Title>;
};

const FavoriteButton = (props: ProductDetailProps) => {
  return (
    <S.FavoriteButton>
      <FavoriteSVG />
    </S.FavoriteButton>
  );
};

const Price = (props: ProductDetailProps) => {
  const { price } = props.product.selectedVariant;
  return (
    <S.PriceWrapper>
      {price.hasDiscount && (
        <S.SellPrice>{price.formattedSellPrice}</S.SellPrice>
      )}
      <S.Price>{price.formattedFinalPrice}</S.Price>
    </S.PriceWrapper>
  );
};

const VariantValues = (props: ProductDetailProps) => {
  const onVariantSelect = (value: IkasVariantValue) => {
    props.product.selectVariantValue(value);
  };

  return (
    <S.VariantValuesWrapper>
      {props.product.displayedVariantTypes.map((dVT) => (
        <VariantType
          key={dVT.variantType.id}
          dVT={dVT}
          onVariantSelect={onVariantSelect}
        />
      ))}
    </S.VariantValuesWrapper>
  );
};

type VariantTypeProps = {
  dVT: IkasDisplayedVariantType;
  onVariantSelect: (value: IkasVariantValue) => void;
};

const VariantType = ({ dVT }: VariantTypeProps) => {
  if (dVT.variantType.isColorSelection) {
    return (
      <S.VariantType>
        <S.VariantTypeName>{dVT.variantType.name}</S.VariantTypeName>
        {dVT.displayedVariantValues.map((dVV) => (
          <VariantValue
            key={dVV.variantValue.id}
            type={dVT.variantType.selectionType}
            dVV={dVV}
          />
        ))}
      </S.VariantType>
    );
  }

  return (
    <S.VariantType>
      <S.VariantTypeName>{dVT.variantType.name}</S.VariantTypeName>
      <S.BoxSelect>
        {dVT.displayedVariantValues.map((dVV) => (
          <option key={dVV.variantValue.id} value={dVV.variantValue.id}>
            {dVV.variantValue.name}
          </option>
        ))}
      </S.BoxSelect>
    </S.VariantType>
  );
};

type VariantValueType = {
  type: IkasVariantSelectionType;
  dVV: IkasDisplayedVariantValue;
};

const VariantValue = ({ dVV, type }: VariantValueType) => {
  // render also Box type
  return (
    <S.ColorSwatch
      title={dVV.variantValue.name}
      $isSelected={dVV.isSelected}
      style={{ backgroundColor: dVV.variantValue.colorCode || "" }}
      onClick={() => {}}
    />
  );
};

const AddToCartButton = (props: ProductDetailProps) => {
  const { t } = useTranslation();
  return <Button block>{t(`${NS}:detail.addToCartButton.text`)}</Button>;
};

const Description = (props: ProductDetailProps) => {
  const { t } = useTranslation();
  if (!props.product.description) return null;
  return (
    <S.DescriptionWrapper>
      <S.DescriptionTitle>
        {t(`${NS}:detail.description.title`)}
      </S.DescriptionTitle>
      <S.Description
        dangerouslySetInnerHTML={{ __html: props.product.description }}
      />
    </S.DescriptionWrapper>
  );
};

type Facebook = {
  type: "facebook";
  href: string;
};

type Twitter = {
  type: "twitter";
  href: string;
  text?: string;
};

type Pinterest = {
  type: "pinterest";
  href: string;
  qsMedia?: string;
  qsDescription?: string;
};

type WhatsApp = {
  type: "whatsApp";
  href: string;
  text: string;
};

export type SocialMediaProps = Facebook | Twitter | Pinterest | WhatsApp;
const SocialMedia = ({
  Icon,
  ...props
}: SocialMediaProps & {
  Icon: () => JSX.Element;
}) => {
  let href;

  switch (props.type) {
    case "facebook":
      href = "//www.facebook.com/sharer.php?u=" + props.href;
      break;
    case "twitter":
      href = `//twitter.com/share?url=${props.href}&text=${props.text || ""}`;
      break;
    case "pinterest":
      href =
        `//pinterest.com/pin/create/button/?url=${props.href}&amp;media=${
          props.qsMedia || ""
        }?description=${props.qsDescription || ""}` + props.href;
      break;
    case "whatsApp":
      href = `https://wa.me/?text=${props.text} ${props.href}`;
      break;
    default:
      return null;
  }

  if (!href) return null;
  return (
    <S.SocialMedia>
      <S.SocialMediaIcon href={href} target="_blank">
        <Icon />
      </S.SocialMediaIcon>
    </S.SocialMedia>
  );
};

const SocialShare = (props: ProductDetailProps) => {
  const [origin, setOrigin] = React.useState("");
  const { t } = useTranslation();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <S.SocialShareWrapper>
      <S.SocialShareTitle>{t(`${NS}:detail.share.title`)}</S.SocialShareTitle>

      <S.SocialMediaWrapper>
        <SocialMedia
          type="facebook"
          href={origin + props.product.href}
          Icon={FacebookSVG}
        />
        <SocialMedia
          type="twitter"
          href={origin + props.product.href}
          Icon={TwitterSVG}
        />
        <SocialMedia
          type="whatsApp"
          href={origin + props.product.href}
          text="Hey, check this product: "
          Icon={WhatsAppSVG}
        />
        <SocialMedia
          type="pinterest"
          href={origin + props.product.href}
          Icon={PinterestSVG}
          qsDescription={props.product.description}
          qsMedia={props.product.mainVariantValue?.thumbnailImage?.src}
        />
      </S.SocialMediaWrapper>
    </S.SocialShareWrapper>
  );
};
