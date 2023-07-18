import React from "react";
import { observer } from "mobx-react-lite";

// Components
import Review from "./review";

// Hooks
import useProductReviews from "src/components/product-reviews/useProductReviews";

// Styles
import * as S from "./style";

// prettier-ignore
type ReviewProps = {
  customerReviewList: ReturnType<typeof useProductReviews>["customerReviewList"];
};

const Reviews = (props: ReviewProps) => {
  const { customerReviewList } = props;

  return customerReviewList && customerReviewList.data?.length > 0 ? (
    <S.Reviews>
      {customerReviewList.data.map((review, index) => (
        <Review key={review.id + review.createdAt + index} review={review} />
      ))}
    </S.Reviews>
  ) : null;
};

export default observer(Reviews);
