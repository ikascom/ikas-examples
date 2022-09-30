import React from "react";
import {
  IkasOrderTransaction,
  useTranslation,
  IkasPaymentMethodType,
} from "@ikas/storefront";

import * as S from "./style";

type Props = {
  orderTransactions: IkasOrderTransaction[];
};

const Payment = ({ orderTransactions }: Props) => {
  const { t } = useTranslation();
  return (
    <S.Payment>
      <S.Title>{t("orderDetail.payment")}</S.Title>
      <S.Text>
        {orderTransactions?.map((oT) => {
          const paymentMethodText = t(
            `orderTransactions.paymentMethod.${oT.paymentMethod}`
          );
          return (
            <div key={oT.id}>
              <S.OrderTransaction>
                {paymentMethodText}
                <div>{oT.formattedAmount}</div>
              </S.OrderTransaction>
              {oT.paymentMethod === IkasPaymentMethodType.CREDIT_CARD && (
                <div>
                  **** **** **** {oT.paymentMethodDetail?.lastFourDigits}
                </div>
              )}
            </div>
          );
        })}
      </S.Text>
    </S.Payment>
  );
};

export default Payment;
