import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import {
  IkasBaseStore,
  IkasCustomerReviewList,
  IkasProduct,
  useTranslation,
} from "@ikas/storefront";

function useProductReviews({ productDetail }: { productDetail: IkasProduct }) {
  const store = IkasBaseStore.getInstance();
  const router = useRouter();

  // States
  const [isFormVisible, setFormVisible] = useState(false);
  const [customerReviewList, setCustomerReviewList] =
    useState<IkasCustomerReviewList | null>(null);

  // Refs
  const reviewsElementRef = useRef<HTMLDivElement>(null);

  const onWriteReviewButtonClick = () => {
    if (
      productDetail.isCustomerReviewLoginRequired &&
      !store.customerStore.customer
    ) {
      const route = decodeURIComponent(
        "/account/login?redirect=" + productDetail.href
      );

      router.push(route);
    } else {
      setFormVisible((prev) => !prev);
    }
  };

  const getCustomerReviews = async () => {
    try {
      const result = await productDetail.getCustomerReviews({ limit: 6 });
      setCustomerReviewList(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onPageChange = async (page: number) => {
    await customerReviewList?.getPage(page);

    window.scrollTo({
      top: reviewsElementRef.current?.offsetTop ?? 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setFormVisible(false);
    getCustomerReviews();
  }, [productDetail]);

  return {
    isFormVisible,
    customerReviewList,
    reviewsElementRef,
    onWriteReviewButtonClick,
    onPageChange,
  };
}

export default useProductReviews;
