import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation, Image, IkasOrderLineItem } from "@ikas/storefront";

import OrderLineItemRefundStatus from "./components/refund-status";
import Select from "src/components/components/select";
import FormItem from "src/components/components/form/form-item";

import PlaceholderSVG from "src/components/svg/product-image-placeholder";

import * as S from "./style";

type OrderLineItemComponentProps = {
  orderLineItem: IkasOrderLineItem;
  refundProcess?: boolean;
};

const OrderLineItem = ({
  orderLineItem,
  refundProcess,
}: OrderLineItemComponentProps) => {
  const { t } = useTranslation();
  const quantityTitle = t("orderDetail.orderLineItem.quantityTitle", {
    quantity: orderLineItem.quantity,
  });

  return (
    <S.Wrapper>
      <S.Picture>
        {!orderLineItem.variant.mainImage?.id ? (
          <PlaceholderSVG />
        ) : (
          <Image
            layout="responsive"
            objectFit="contain"
            width={1}
            height={1}
            image={orderLineItem.variant.mainImage}
            sizes="150px"
            alt=""
          />
        )}
      </S.Picture>
      <S.Content>
        <S.VariantName>
          {orderLineItem.variant.name}
          <S.Quantity title={quantityTitle}>
            {" x "}
            {orderLineItem.quantity}
          </S.Quantity>
        </S.VariantName>

        <div>
          {orderLineItem.variant.variantValues?.map((vV) => (
            <S.VariantType key={vV.variantTypeId + vV.variantValueId}>
              {vV.variantValueName} {vV.variantTypeName}
            </S.VariantType>
          ))}
        </div>
        <S.Price>{orderLineItem.formattedFinalPrice}</S.Price>
        <OrderLineItemRefundStatus orderLineItemStatus={orderLineItem.status} />
        {refundProcess && (
          <RefundQuantitySelect orderLineItem={orderLineItem} />
        )}
      </S.Content>
    </S.Wrapper>
  );
};

export default observer(OrderLineItem);

type RefundQuantitySelectProps = {
  orderLineItem: IkasOrderLineItem;
};

const RefundQuantitySelect = observer((props: RefundQuantitySelectProps) => {
  const { t } = useTranslation();
  const quantityOptions = useMemo(() => {
    const quantities = [];

    for (let i = 0; i <= props.orderLineItem.quantity; i++) {
      quantities.push({ label: `${i}`, value: `${i}` });
    }
    return quantities;
  }, [props.orderLineItem]);

  return (
    <S.RefundQuantitySelectWrapper>
      <FormItem label={t("orderDetail.refund.selectRefundQuantity")}>
        <Select
          value={props.orderLineItem.refundQuantity || "0"}
          options={quantityOptions}
          onChange={(value) => {
            props.orderLineItem.refundQuantity =
              value === "-1" ? null : parseInt(value as string);
          }}
        />
      </FormItem>
    </S.RefundQuantitySelectWrapper>
  );
});
