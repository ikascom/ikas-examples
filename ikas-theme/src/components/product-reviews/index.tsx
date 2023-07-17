import React from "react";
import { observer } from "mobx-react-lite";

// Types
import { ProductReviewsProps } from "../__generated__/types";

// Components
import { Container } from "src/components/components/container";
import Pagination from "../components/pagination";
import Button from "../components/button";
import ReviewForm from "./review-form";
import Review from "./review";
import Stars, { type StarType } from "./stars";

// Hooks
import useProductReviews from "./hooks/useProductReviews";

// Styles
import * as S from "./style";

export const NS = "product-reviews"; // for translation (i18n)

const ProductReviews = (props: ProductReviewsProps) => {
  const { productDetail } = props;

  const {
    t,
    isFormVisible,
    isWriteReviewButtonHidden,
    setHiddenWriteReviewButton,
    customerReviewList,
    productReviewRef,
    onWriteReviewButtonClick,
    onPageChange,
  } = useProductReviews({ productDetail });

  return (
    <S.ProductReviews ref={productReviewRef}>
      <Container>
        <S.Wrapper>
          <S.Title>{t(`${NS}:title`)}</S.Title>

          <S.ReviewsSummary>
            {customerReviewList && (
              <>
                {customerReviewList && customerReviewList.data?.length ? (
                  <S.Preview>
                    <Stars
                      title={t(`${NS}:xStar`, {
                        x: productDetail.averageRating || "0",
                      })}
                      editable={false}
                      size="24px"
                      star={(productDetail.averageRating as StarType) || 0}
                    />

                    <S.PreviewDesciption>
                      {t(`${NS}:basedOnXReviews`, {
                        x: productDetail.reviewCount || "0",
                      })}
                    </S.PreviewDesciption>
                  </S.Preview>
                ) : (
                  <S.PreviewDesciption>
                    {t(`${NS}:emptyReview`)}
                  </S.PreviewDesciption>
                )}
              </>
            )}
            {!isWriteReviewButtonHidden &&
              productDetail.isCustomerReviewEnabled && (
                <Button onClick={onWriteReviewButtonClick}>
                  {isFormVisible
                    ? t(`${NS}:closeReviewForm`)
                    : t(`${NS}:writeAReview`)}
                </Button>
              )}
          </S.ReviewsSummary>

          <div>
            {isFormVisible && (
              <ReviewForm
                product={productDetail}
                onSubmitSuccess={() => setHiddenWriteReviewButton(true)}
              />
            )}
            {customerReviewList && customerReviewList.data?.length > 0 && (
              <S.Reviews>
                {customerReviewList.data.map((review, index) => (
                  <Review
                    key={review.id + review.createdAt + index}
                    noCommentText={t(`${NS}:noComment`)}
                    review={review}
                  />
                ))}
              </S.Reviews>
            )}
            <div>
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
            </div>
          </div>
        </S.Wrapper>
      </Container>
    </S.ProductReviews>
  );
};

export default observer(ProductReviews);
