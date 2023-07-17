import React, { useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasBaseStore,
  IkasCustomerReviewList,
  useTranslation,
} from "@ikas/storefront";
import { useRouter } from "next/router";

// Types
import { ProductReviewsProps } from "../__generated__/types";

// Components
import { Container } from "src/components/components/container";
import Pagination from "../components/pagination";
import Button from "../components/button";
import ReviewForm from "./review-form";
import Review from "./review";
import Stars, { type StarType } from "./stars";

// Utils
import urls from "src/utils/urls";

// Styles
import * as S from "./style";

const ProductReviews = (props: ProductReviewsProps) => {
  const { productDetail } = props;

  const { t } = useTranslation();
  const store = IkasBaseStore.getInstance();
  const router = useRouter();
  const namespace = "product-reviews";

  // States
  const [isFormVisible, setFormVisible] = useState(false);
  const [isWriteReviewButtonHidden, setHiddenWriteReviewButton] =
    useState(false);
  const [customerReviewList, setCustomerReviewList] =
    useState<IkasCustomerReviewList | null>(null);

  // Refs
  const productReviewRef = useRef<HTMLDivElement>(null);

  const getCustomerReviews = async () => {
    try {
      const result = await productDetail.getCustomerReviews({ limit: 6 });
      setCustomerReviewList(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onWriteReviewButtonClick = () => {
    if (
      productDetail.isCustomerReviewLoginRequired &&
      !store.customerStore.customer
    ) {
      const route = decodeURIComponent(
        urls.login + "?redirect=" + productDetail.href
      );

      router.push(route);
    } else {
      setFormVisible((prev) => !prev);
    }
  };

  const onReviewFormSubmitSuccess = () => {
    setHiddenWriteReviewButton(true);
  };

  const onPageChange = async (page: number) => {
    await customerReviewList?.getPage(page);

    window.scrollTo({
      top: productReviewRef.current?.offsetTop ?? 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    setFormVisible(false);
    getCustomerReviews();
  }, [productDetail]);

  return (
    <S.ProductReviews ref={productReviewRef}>
      <Container>
        <S.Wrapper>
          <S.Title>{t(`${namespace}:title`)}</S.Title>

          <S.ReviewsSummary>
            {customerReviewList && (
              <>
                {customerReviewList && customerReviewList.data?.length ? (
                  <S.Preview>
                    <Stars
                      title={t(`${namespace}:xStar`, {
                        x: productDetail.averageRating || "0",
                      })}
                      editable={false}
                      size="24px"
                      star={(productDetail.averageRating as StarType) || 0}
                    />

                    <S.PreviewDesciption>
                      {t(`${namespace}:basedOnXReviews`, {
                        x: productDetail.reviewCount || "0",
                      })}
                    </S.PreviewDesciption>
                  </S.Preview>
                ) : (
                  <S.PreviewDesciption>
                    {t(`${namespace}:emptyReview`)}
                  </S.PreviewDesciption>
                )}
              </>
            )}
            {!isWriteReviewButtonHidden &&
              productDetail.isCustomerReviewEnabled && (
                <Button onClick={onWriteReviewButtonClick}>
                  {isFormVisible
                    ? t(`${namespace}:closeReviewForm`)
                    : t(`${namespace}:writeAReview`)}
                </Button>
              )}
          </S.ReviewsSummary>

          <div>
            {isFormVisible && (
              <ReviewForm
                namespace={namespace}
                product={productDetail}
                onSubmitSuccess={onReviewFormSubmitSuccess}
              />
            )}
            {customerReviewList && customerReviewList.data?.length > 0 && (
              <S.Reviews>
                {customerReviewList.data.map((review, index) => (
                  <Review
                    key={review.id + review.createdAt + index}
                    noCommentText={t(`${namespace}:noComment`)}
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
