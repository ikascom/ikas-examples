import React from "react";
import { observer } from "mobx-react-lite";
import { Image } from "@ikas/storefront";

import { Container } from "src/components/components/container";
import { PageBlogProps } from "../__generated__/types";

import * as S from "./style";
import formatImageAspectRatio from "src/utils/formatImageAspectRatio";

const Blog = (props: PageBlogProps) => {
  const { blog } = props;

  return (
    <S.Wrapper>
      <BlogImage {...props} />
      <Container>
        <S.Title>{blog.title}</S.Title>
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{ __html: blog.blogContent.content }}
        />
      </Container>
    </S.Wrapper>
  );
};

export default observer(Blog);

const BlogImage = observer(
  ({ showImage, imageAspectRatio, blog }: PageBlogProps) => {
    if (!blog.image?.id || !showImage) return null;

    const { width, height } = formatImageAspectRatio(imageAspectRatio);
    return (
      <S.Picture>
        <Image
          useBlur
          image={blog.image}
          layout="responsive"
          sizes="100vw"
          width={width}
          height={height}
          objectFit="cover"
        />
      </S.Picture>
    );
  }
);
