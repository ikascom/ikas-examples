import React from "react";
import { observer } from "mobx-react-lite";
import { Image, Link } from "@ikas/storefront";

import { HeroBannerProps } from "../__generated__/types";
import { Container } from "../components/container";

import breakpoints from "src/styles/breakpoints";

import * as S from "./style";

export const imageSizes = `(max-width: 320px) 300px, (max-width: 450px) 400px, (max-width: ${breakpoints.sm}) ${breakpoints.sm}, (max-width: ${breakpoints.md}) ${breakpoints.md}, (max-width: ${breakpoints.lg}) ${breakpoints.lg}, (max-width: ${breakpoints.xl}) ${breakpoints.xl}, (max-width: ${breakpoints.xxl}) ${breakpoints.xxl}, ${breakpoints.xxl}`;

// function formatImageAspectRatio(
//   imageAspectRatio: HeroBannerProps["imageAspectRatio"]
// ) {
//   const width = imageAspectRatio.split("_")[0]; // 3
//   const height = imageAspectRatio.split("_")[1]; // 1

//   return { width, height };
// }

function HeroBanner({ image, link, title, showContent }: HeroBannerProps) {
  // also you can take aspect ratio from prop.
  // const { width, height } = formatImageAspectRatio(imageAspectRatio);

  return (
    <Container>
      <S.InnerContainer>
        <Image
          image={image}
          layout="responsive"
          // aspect ratio
          width={3}
          height={1}
          useBlur={true}
          sizes={imageSizes}
          objectFit="cover"
          alt=""
        />

        {!!showContent && (
          <S.Content>
            <S.Title>{title}</S.Title>
            <Link passHref href={link.href}>
              <S.Anchor>{link.label}</S.Anchor>
            </Link>
          </S.Content>
        )}
      </S.InnerContainer>
    </Container>
  );
}

export default observer(HeroBanner);
