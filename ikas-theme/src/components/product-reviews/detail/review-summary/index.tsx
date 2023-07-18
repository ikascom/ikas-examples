import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "@ikas/storefront";
import { ProductReviewsProps } from "src/components/__generated__/types";

import ReviewForm from "../review-form";
import Stars, { type StarType } from "../stars";
import Button from "src/components/components/button";

import useProductReviews from "src/components/product-reviews/useProductReviews";

import { NS } from "src/components/product-reviews";

import * as S from "./style";

// prettier-ignore
type Props = ProductReviewsProps & {
  isFormVisible: ReturnType<typeof useProductReviews>["isFormVisible"];
  customerReviewList: ReturnType<typeof useProductReviews>["customerReviewList"];
  onWriteReviewButtonClick: ReturnType<typeof useProductReviews>["onWriteReviewButtonClick"];
};

const ReviewsSummary = (props: Props) => {
  const {
    productDetail,
    customerReviewList,
    isFormVisible,
    onWriteReviewButtonClick,
  } = props;

  const { t } = useTranslation();

  const [isWriteReviewButtonHidden, setHiddenWriteReviewButton] =
    useState(false);

  const isWriteReviewButtonVisible =
    !isWriteReviewButtonHidden && productDetail.isCustomerReviewEnabled;

  const isPreviewVisible =
    customerReviewList && customerReviewList.data?.length > 0;

  return (
    <S.ReviewsSummary>
      <S.ReviewsHeader>
        {isPreviewVisible ? (
          <S.Preview>
            <Stars
              title={t(`${NS}:xStar`, {
                x: productDetail.averageRating || "0" })}
              editable={false}
              size="24px"
              star={(productDetail.averageRating as StarType) || 0}
            />

            <S.PreviewDesciption>
              {t(`${NS}:basedOnXReviews`, {
                x: productDetail.reviewCount || "0" })}
            </S.PreviewDesciption>
          </S.Preview>
        ) : (
          <S.PreviewEmpty>{t(`${NS}:emptyReview`)}</S.PreviewEmpty>
        )}

        {isWriteReviewButtonVisible && (
          <Button onClick={onWriteReviewButtonClick}>
            {isFormVisible
              ? t(`${NS}:closeReviewForm`)
              : t(`${NS}:writeAReview`)}
          </Button>
        )}
      </S.ReviewsHeader>

      <ReviewForm
        product={productDetail}
        onSubmitSuccess={() => setHiddenWriteReviewButton(true)}
        visible={isFormVisible}
      />
    </S.ReviewsSummary>
  );
};

export default observer(ReviewsSummary);
