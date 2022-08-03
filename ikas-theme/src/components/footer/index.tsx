import React from "react";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { Container } from "../components/container";
import { FooterProps } from "../__generated__/types";

import VisaSVG from "src/components/svg/visa";
import MaestroSVG from "src/components/svg/maestro";
import MastercardSVG from "src/components/svg/mastercard";
import FacebookSVG from "src/components/svg/facebook";
import InstagramSVG from "src/components/svg/instagram";
import TwitterSVG from "src/components/svg/twitter";
import PinterestSVG from "src/components/svg/pinterest";
import IkasSVG from "src/components/svg/ikas";

import * as S from "./style";
import { useTranslation } from "@ikas/storefront";

const NS = "footer"; // Namespace for translation (i18n);

function Footer(props: FooterProps) {
  return (
    <S.Footer>
      <Container>
        <LogoAndLinksArea {...props} />
        <SocialMediaAndPaymentArea {...props} />
        <S.Divider />
        <CopyrightAndPoweredByArea {...props} />
      </Container>
    </S.Footer>
  );
}

export default observer(Footer);

const CopyrightAndPoweredByArea = (props: FooterProps) => {
  const { t } = useTranslation();

  return (
    <S.CopyrightWrapper>
      <S.CopyrightText>{t(`${NS}:copyrightText`)}</S.CopyrightText>
      <S.PoweredBy>
        <S.PoweredByText>This site was created by</S.PoweredByText>{" "}
        <S.PoweredByLogo>
          <IkasSVG />
        </S.PoweredByLogo>
      </S.PoweredBy>
    </S.CopyrightWrapper>
  );
};

const LogoAndLinksArea = (props: FooterProps) => {
  return (
    <S.LogoLinksArea>
      <Logo {...props} />
      <Links {...props} />
    </S.LogoLinksArea>
  );
};

const SocialMediaAndPaymentArea = (props: FooterProps) => {
  return (
    <S.SocialMediaAndPaymentArea>
      <SocialMedia {...props} />
      <PaymentOptions />
    </S.SocialMediaAndPaymentArea>
  );
};

const SocialMediaItem = ({
  href,
  Icon,
}: {
  href?: string;
  Icon: () => JSX.Element;
}) => {
  if (!href) return null;
  return (
    <S.SocialMediaListItem>
      <S.SocialMediaItem href={href} target="_blank">
        <Icon />
      </S.SocialMediaItem>
    </S.SocialMediaListItem>
  );
};

export const SocialMedia = ({ socialMedia }: FooterProps) => {
  return (
    <S.SocialMediaList>
      <SocialMediaItem href={socialMedia.facebook} Icon={FacebookSVG} />
      <SocialMediaItem href={socialMedia.instagram} Icon={InstagramSVG} />
      <SocialMediaItem href={socialMedia.twitter} Icon={TwitterSVG} />
      <SocialMediaItem href={socialMedia.pinterest} Icon={PinterestSVG} />
    </S.SocialMediaList>
  );
};

export const PaymentOptions = () => {
  return (
    <S.PaymentOptionsWrapper>
      <S.PaymentOption>
        <VisaSVG />
      </S.PaymentOption>
      <S.PaymentOption>
        <MaestroSVG />
      </S.PaymentOption>
      <S.PaymentOption>
        <MastercardSVG />
      </S.PaymentOption>
    </S.PaymentOptionsWrapper>
  );
};

const Logo = (props: FooterProps) => {
  return (
    <S.LogoWrapper>
      <img src={props.logo.src} loading="lazy" />
    </S.LogoWrapper>
  );
};

const Links = (props: FooterProps) => {
  return (
    <S.LinksWrapper>
      {props.links.map((link, index) => (
        <S.LinkWrapper key={index}>
          <S.LinkTitle>{link.label}</S.LinkTitle>
          <S.SubLinksWrapper>
            {link.subLinks.map((subLink, subIndex) => (
              <S.SubLinkWrapper key={subIndex}>
                <Link passHref href={subLink.href}>
                  <S.Link>{subLink.label}</S.Link>
                </Link>
              </S.SubLinkWrapper>
            ))}
          </S.SubLinksWrapper>
        </S.LinkWrapper>
      ))}
    </S.LinksWrapper>
  );
};
