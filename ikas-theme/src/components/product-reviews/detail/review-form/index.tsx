import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasProduct,
  useTranslation,
  CustomerReviewForm,
} from "@ikas/storefront";

import AlertComponent from "src/components/components/alert";
import FormItem from "src/components/components/form/form-item";
import Form from "src/components/components/form";
import Input from "src/components/components/input";
import TextArea from "src/components/components/textarea";
import Button from "src/components/components/button";
import Stars from "../stars";

import { NS } from "src/components/product-reviews";

import * as S from "./style";

const REVIEW_TITLE_MAX_LENGTH = 64;
const REVIEW_COMMENT_MAX_LENGTH = 256;

type Props = {
  product: IkasProduct;
  onSubmitSuccess: () => void;
  visible: boolean;
};

const ReviewForm = (props: Props) => {
  const { product, onSubmitSuccess, visible } = props;
  const { t } = useTranslation();

  // States
  const [responseStatus, setResponseStatus] = useState<
    "success" | "error" | undefined
  >();
  const [isPending, setPending] = useState(false);
  const [form, setForm] = useState<CustomerReviewForm>(
    new CustomerReviewForm({
      productId: product.id,
      message: { starRule: t(`${NS}:form.requiredRule`) },
    })
  );

  const onSubmit = async () => {
    try {
      setPending(true);
      const result = await form.submit();

      if (result.isFormError) return;

      if (result.isSuccess) {
        setResponseStatus("success");
        onSubmitSuccess();
        return;
      }
      if (!result.isSuccess) {
        setResponseStatus("error");
      }
    } catch (error) {
      setResponseStatus("error");
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    if (visible) {
      setPending(false);
      setResponseStatus(undefined);
      setForm(
        new CustomerReviewForm({
          productId: product.id,
          message: { starRule: t(`${NS}:form.requiredRule`) },
        })
      );
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <S.ReviewForm>
      <S.Wrapper>
        <S.Title>{t(`${NS}:formTitle`)}</S.Title>

        {responseStatus === "success" && (
          <AlertComponent status="success" text={t(`${NS}:form.successText`)} />
        )}

        {responseStatus !== "success" && (
          <>
            {responseStatus === "error" && (
              <AlertComponent
                status="error"
                text={t(`${NS}:form.errorText`)}
                style={{
                  marginBottom: "1rem",
                }}
              />
            )}

            <Form onSubmit={onSubmit}>
              <FormItem
                status={form.starErrorMessage ? "error" : undefined}
                help={form.starErrorMessage}
                label={t(`${NS}:form.reviewStarts`)}
              >
                <Stars
                  star={form.star as 1 | 2 | 3 | 4 | 5}
                  onClick={(star) => form.onStarChange(star)}
                />
              </FormItem>
              <FormItem label={t(`${NS}:form.reviewTitle`)}>
                <Input
                  maxLength={REVIEW_TITLE_MAX_LENGTH}
                  value={form.title}
                  onChange={(event) => {
                    if (event.target.value.length > REVIEW_TITLE_MAX_LENGTH)
                      return;

                    form.onTitleChange(event.target.value);
                  }}
                />
              </FormItem>
              <FormItem label={t(`${NS}:form.bodyOfReview`)}>
                <TextArea
                  maxLength={REVIEW_COMMENT_MAX_LENGTH}
                  value={form.comment}
                  onChange={(event) => {
                    if (event.target.value.length > REVIEW_COMMENT_MAX_LENGTH)
                      return;

                    form.onCommentChange(event.target.value);
                  }}
                  style={{
                    minHeight: "150px",
                  }}
                />
              </FormItem>
              <Button size="small" loading={isPending} disabled={isPending}>
                {t(`${NS}:form.submitReview`)}
              </Button>
            </Form>
          </>
        )}
      </S.Wrapper>
    </S.ReviewForm>
  );
};

export default observer(ReviewForm);
