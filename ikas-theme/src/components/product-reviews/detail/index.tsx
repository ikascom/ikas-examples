import React from "react";
import { observer } from "mobx-react-lite";

import { ProductReviewsProps } from "src/components/__generated__/types";

import Reviews from "./reviews";
import ReviewsSummary from "./review-summary";
import Pagination from "src/components/components/pagination";

import useProductReviews from "../useProductReviews";

const Detail = (props: ProductReviewsProps) => {
  const { productDetail } = props;

  const {
    isFormVisible,
    customerReviewList,
    onPageChange,
    onWriteReviewButtonClick,
    reviewsElementRef,
  } = useProductReviews({ productDetail });

  return (
    <>
      <ReviewsSummary
        productDetail={productDetail}
        customerReviewList={customerReviewList}
        isFormVisible={isFormVisible}
        onWriteReviewButtonClick={onWriteReviewButtonClick}
      />

      <div ref={reviewsElementRef}>
        <Reviews customerReviewList={customerReviewList} />
      </div>

      {customerReviewList && (
        <Pagination
          pageCount={customerReviewList.pageCount}
          page={customerReviewList.page}
          loading={customerReviewList.isLoading}
          hasPrev={customerReviewList.hasPrev}
          hasNext={customerReviewList.hasNext}
          getPage={onPageChange}
          count={customerReviewList.count}
        />
      )}
    </>
  );
};

export default observer(Detail);
