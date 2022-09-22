import React from "react";
import { observer } from "mobx-react-lite";
import { Image, Link } from "@ikas/storefront";

import { HeroBannerProps } from "../__generated__/types";
import formatImageAspectRatio from "src/utils/formatImageAspectRatio";
import { Container } from "../components/container";
import breakpoints from "src/styles/breakpoints";

import * as S from "./style";

export const imageSizes = `(max-width: ${breakpoints.xxl}) 100vw, ${breakpoints.xxl}`;

function HeroBanner({
  image,
  link,
  title,
  imageAspectRatio,
  buttonBackgroundColor,
  buttonTextColor,
  showButton,
}: HeroBannerProps) {
  const isContentVisible =
    (showButton && !!link?.label && !!link?.href) || !!title;
  const contentProps = {
    title,
    showButton,
    link,
    buttonTextColor,
    buttonBackgroundColor,
  };

  return (
    <Container>
      <S.InnerContainer>
        <RenderImage image={image} imageAspectRatio={imageAspectRatio} />
        {isContentVisible && <RenderContent {...contentProps} />}
      </S.InnerContainer>
    </Container>
  );
}

export default observer(HeroBanner);

type RenderImageProps = Pick<HeroBannerProps, "image" | "imageAspectRatio">;

const RenderImage = observer(
  ({ image, imageAspectRatio }: RenderImageProps) => {
    const { width, height } = formatImageAspectRatio(imageAspectRatio);

    return (
      <Image
        image={image}
        layout="responsive"
        width={width}
        height={height}
        useBlur={true}
        sizes={imageSizes}
        objectFit="cover"
        alt=""
      />
    );
  }
);

type RenderContentProps = Pick<
  HeroBannerProps,
  "showButton" | "link" | "title" | "buttonTextColor" | "buttonBackgroundColor"
>;

const RenderContent = observer(
  ({
    showButton,
    title,
    link,
    buttonBackgroundColor,
    buttonTextColor,
  }: RenderContentProps) => {
    const isButtonVisible = !!showButton && !!link?.href && !!link?.label;

    return (
      <S.Content>
        <S.ContentInner>
          {title && <S.Title>{title}</S.Title>}
          {isButtonVisible && (
            <Link passHref href={link.href}>
              <S.Anchor
                style={{
                  backgroundColor: buttonBackgroundColor,
                  color: buttonTextColor,
                }}
              >
                {link.label}
              </S.Anchor>
            </Link>
          )}
        </S.ContentInner>
      </S.Content>
    );
  }
);
