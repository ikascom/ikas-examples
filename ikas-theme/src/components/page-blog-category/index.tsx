import React from "react";
import { observer } from "mobx-react-lite";

import BlogList from "../page-blogs";
import { PageBlogCategoryProps } from "../__generated__/types";

const BlogCategoryList = ({ ...props }: PageBlogCategoryProps) => {
  const title =
    Array.isArray(props.blogList.data) && props.blogList.data?.length
      ? props.blogList.data[0].category?.name
      : undefined;

  return <BlogList title={title} {...props} />;
};

export default observer(BlogCategoryList);
