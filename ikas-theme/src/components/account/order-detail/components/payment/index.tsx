import React from "react";
import {
  IkasOrderTransaction,
  useTranslation,
  IkasPaymentMethod,
  IkasPaymentMethodType,
  formatCurrency,
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
                <div>
                  {/**TODO use formattedAmount  */}
                  {formatCurrency(
                    oT.amount || 0,
                    oT.currencyCode!,
                    oT.currencySymbol!
                  )}
                </div>
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
