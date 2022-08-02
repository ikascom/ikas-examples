import React from "react";
import { observer } from "mobx-react-lite";
import { Image } from "@ikas/storefront";
import Link from "next/link";

import { HeroBannerProps } from "../__generated__/types";
import { Container } from "../components/container";
import { sizes } from "src/styles/sizes";

import * as S from "./style";

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
          sizes={sizes}
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
