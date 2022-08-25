import React from "react";
import { useTranslation } from "@ikas/storefront";

import { ProductDetailProps } from "src/components/__generated__/types";
import { NS } from "src/components/product-detail";

import * as S from "../style";

import FacebookSVG from "src/components/svg/facebook";
import WhatsAppSVG from "src/components/svg/whatsApp";
import TwitterSVG from "src/components/svg/twitter";
import PinterestSVG from "src/components/svg/pinterest";

export const SocialShare = (props: ProductDetailProps) => {
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
