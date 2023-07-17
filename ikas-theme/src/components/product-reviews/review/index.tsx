import React from "react";
import { observer } from "mobx-react-lite";
import { IkasCustomerReview, useTranslation } from "@ikas/storefront";

// Components
import Stars from "../stars";

// Utils
import getMonthName from "src/utils/getMonthName";

// Styles
import * as S from "./style";

function Review({
  review,
  noCommentText,
}: {
  review: IkasCustomerReview;
  noCommentText: string;
}) {
  const { t } = useTranslation();

  const createdAt = React.useMemo(() => {
    const _date = new Date(review.createdAt);
    const date = _date.getDate();
    const month = getMonthName(_date, { month: "short" });
    const year = _date.getFullYear();

    return `${date} ${month}, ${year}`;
  }, [review.createdAt]);

  return (
    <S.Review>
      <S.Header>
        <Stars
          editable={false}
          size="14px"
          star={review.star as 1 | 2 | 3 | 4 | 5}
        />
        <S.Title>{review.title}</S.Title>
        {!!review.orderId && (
          <S.Description>{t("common:purchased")}</S.Description>
        )}
        {!!review.firstName && !!review.lastName && (
          <S.Description>
            {review.firstName} {review.lastName}
          </S.Description>
        )}
        <S.Description $bigger>{createdAt}</S.Description>
      </S.Header>
      <S.Comment aria-label="content" $noComment={!!!review.comment}>
        {review.comment || noCommentText}
      </S.Comment>
    </S.Review>
  );
}

export default observer(Review);
