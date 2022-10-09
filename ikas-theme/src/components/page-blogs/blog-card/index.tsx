import React, { useMemo } from "react";
import {
  Image,
  IkasBlog,
  IkasImage,
  IkasBlogWriter,
  useTranslation,
  Link,
} from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import getMonthName from "src/utils/getMonthName";
import { PageBlogsProps } from "src/components/__generated__/types";
import formatImageAspectRatio from "src/utils/formatImageAspectRatio";
import breakpoints, { point } from "src/styles/breakpoints";

import * as S from "./style";

type Props = {
  data: IkasBlog;
} & Pick<
  PageBlogsProps,
  | "showAuthor"
  | "showCategory"
  | "showDescription"
  | "showPublishedDate"
  | "imageAspectRatio"
>;

const BlogCard = (props: Props) => {
  const showPublishedDate = !!(props.showPublishedDate && props.data.createdAt);
  const showAuthor = !!props.showAuthor;
  const showTitle = !!props.data.title;
  const showDescription =
    !!props.showDescription && !!props.data.shortDescription;
  const showCategory = !!props.data.category;

  return (
    <S.BlogCard>
      {props.data.image?.id && (
        <BlogImage
          image={props.data.image}
          imageAspectRatio={props.imageAspectRatio}
          alt={props.data.title || ""}
          href={props.data.href}
        />
      )}
      <S.BlogContent>
        <div>
          <S.BlogMeta>
            {showPublishedDate && <PublishedDate date={props.data.createdAt} />}
            {showAuthor && <Author writer={props.data.writer} />}
          </S.BlogMeta>
          {showTitle && (
            <Title title={props.data.title} href={props.data.href} />
          )}
          {showDescription && (
            <Description text={props.data.shortDescription} />
          )}
          {showCategory && (
            <Category
              href={`/blog/${props.data.category.metadata?.slug}` || "/"}
              name={props.data.category.name}
              showCategory={props.showCategory}
            />
          )}
        </div>
        <DetailLink href={props.data.href} />
      </S.BlogContent>
    </S.BlogCard>
  );
};

export default observer(BlogCard);

type BlogImageProps = { image: IkasImage; alt: string; href: string } & Pick<
  PageBlogsProps,
  "imageAspectRatio"
>;

const BlogImage = (props: BlogImageProps) => {
  const { width, height } = formatImageAspectRatio(props?.imageAspectRatio);
  const sizes = `(max-width: ${breakpoints.sm}) 100vw, (max-width: ${
    breakpoints.md
  }) 50vw, (max-width: ${breakpoints.lg}) 33vw, ${point.xxl / 4}px`;

  return (
    <Link passHref href={props.href || ""}>
      <a>
        <S.BlogImage>
          <Image
            useBlur
            image={props.image}
            alt={props.alt}
            layout="responsive"
            objectFit="contain"
            sizes={sizes}
            width={width}
            height={height}
          />
        </S.BlogImage>
      </a>
    </Link>
  );
};

const PublishedDate = (props: { date: number }) => {
  const date = useMemo(() => {
    if (!props.date) return "";

    const _date = new Date(props.date);
    const day = _date.getDate();
    const month = getMonthName(_date);
    const year = _date.getFullYear();

    return `${day} ${month}, ${year}`;
  }, [props.date]);

  return <S.PublishedDate>{date}</S.PublishedDate>;
};

const Author = (props: { writer: IkasBlogWriter }) => {
  return (
    <S.Author>
      {props.writer.firstName} {props.writer.lastName}
    </S.Author>
  );
};

const Title = (props: { title: string; href: string }) => {
  return (
    <Link passHref href={props.href || ""}>
      <S.TitleAnchor>
        <S.Title>{props.title}</S.Title>
      </S.TitleAnchor>
    </Link>
  );
};

const Description = (props: { text: string }) => {
  const text =
    props.text.length > 260 ? `${props.text.slice(0, 260)}...` : props.text;

  return <S.Description>{text}</S.Description>;
};

const Category = (props: {
  href: string;
  name: string;
  showCategory?: boolean;
}) => {
  if (!props.showCategory) return null;
  return (
    <S.Category>
      <Link passHref href={props.href || ""}>
        <a>{props.name}</a>
      </Link>
    </S.Category>
  );
};

const DetailLink = (props: { href: string }) => {
  const { t } = useTranslation();
  return (
    <S.DetailLink>
      <Link passHref href={props.href || ""}>
        <a>{t("pageBlogs.blogCard.detailLinkText")}</a>
      </Link>
    </S.DetailLink>
  );
};
