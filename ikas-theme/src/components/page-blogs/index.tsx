import React, { useRef } from "react";
import { observer } from "mobx-react-lite";

import Pagination from "src/components/components/pagination";
import BlogCard from "./blog-card";
import { Container } from "src/components/components/container";
import { PageBlogsProps } from "../__generated__/types";

import * as S from "./style";

const BlogList = ({ blogList, ...props }: PageBlogsProps) => {
  const blogsRef = useRef<HTMLDivElement>(null);

  const onPaginationChange = async (page: number) => {
    await blogList.getPage(page);
    window.scrollTo({
      top: blogsRef.current?.offsetTop ?? 0,
      behavior: "smooth",
    });
  };

  return (
    <Container ref={blogsRef}>
      <S.Title>{props.title}</S.Title>
      <S.List>
        {blogList?.data.map((blog) => (
          <S.Blog key={blog.id}>
            <BlogCard
              data={blog}
              showAuthor={!!props.showAuthor}
              showDescription={!!props.showDescription}
              showPublishedDate={!!props.showPublishedDate}
              showCategory={props.showCategory}
              imageAspectRatio={props.imageAspectRatio}
            />
          </S.Blog>
        ))}
      </S.List>
      <Pagination
        hasNext={blogList.hasNext}
        hasPrev={blogList.hasPrev}
        page={blogList.page}
        pageCount={blogList.pageCount}
        count={blogList.count}
        loading={blogList.isLoading}
        getPage={onPaginationChange}
      />
    </Container>
  );
};

export default observer(BlogList);
