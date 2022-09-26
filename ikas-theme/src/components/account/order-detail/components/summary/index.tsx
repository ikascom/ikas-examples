import React from "react";
import {
  formatCurrency,
  IkasAdjustmentType,
  IkasOrder,
  useTranslation,
} from "@ikas/storefront";

import * as S from "./style";

type Props = {
  order: IkasOrder;
};

const Summary = ({ order }: Props) => {
  const { t } = useTranslation();
  return (
    <S.Summary>
      <S.Title>{t("orderDetail.summary")}</S.Title>
      <S.Content>
        <S.ContentItem>
          <S.ContentItemTitle>
            {t("orderDetail.orderAmount")}
          </S.ContentItemTitle>
          <S.ContentItemText>{order.formattedTotalPrice}</S.ContentItemText>
        </S.ContentItem>
        <S.ContentItem>
          <S.ContentItemTitle>{t("orderDetail.cargo")}</S.ContentItemTitle>
          <S.ContentItemText>
            {order.shippingLines && order.formattedShippingTotal}
          </S.ContentItemText>
        </S.ContentItem>
        <S.ContentItem>
          <S.ContentItemTitle>
            {t("orderDetail.estimatedTax")}
          </S.ContentItemTitle>
          <S.ContentItemText>
            {order.taxLines && order.formattedTotalTax}
          </S.ContentItemText>
        </S.ContentItem>
        {!!order.orderAdjustments &&
          order.orderAdjustments?.length > 0 &&
          order.orderAdjustments?.map((orderAdj, index) => {
            const title =
              orderAdj.name === "INTEREST"
                ? t("orderDetail.interest")
                : orderAdj.name;
            const text = `${
              orderAdj.type === IkasAdjustmentType.DECREMENT ? "- " : ""
            } ${formatCurrency(
              orderAdj.amount,
              order.currencyCode!,
              order.currencySymbol!
            )}`;
            return (
              <S.OrderAdjustment key={index}>
                <S.OrderAdjustmentTitle>{title}</S.OrderAdjustmentTitle>
                <S.OrderAdjustmentText $type={orderAdj.type}>
                  {text}
                </S.OrderAdjustmentText>
              </S.OrderAdjustment>
            );
          })}

        <S.PriceWrapper>
          <S.PriceTitle>{t("orderDetail.total")}</S.PriceTitle>
          <S.Price>{order.formattedTotalFinalPrice}</S.Price>
        </S.PriceWrapper>
      </S.Content>
    </S.Summary>
  );
};

export default Summary;
