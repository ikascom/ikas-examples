import React from "react";
import { observer } from "mobx-react-lite";

import Review from "./review";

import useProductReviews from "src/components/product-reviews/useProductReviews";

import * as S from "./style";

// prettier-ignore
type ReviewProps = {
  customerReviewList: ReturnType<typeof useProductReviews>["customerReviewList"];
};

const Reviews = (props: ReviewProps) => {
  const { customerReviewList } = props;

  const isVisible = customerReviewList && customerReviewList.data?.length > 0;

  if (!isVisible) return null;

  return (
    <S.Reviews>
      {customerReviewList.data.map((review, index) => (
        <Review key={review.id + review.createdAt + index} review={review} />
      ))}
    </S.Reviews>
  );
};

export default observer(Reviews);
