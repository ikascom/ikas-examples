import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  IkasProduct,
  useTranslation,
  CustomerReviewForm,
} from "@ikas/storefront";

// Compontents
import AlertComponent from "src/components/components/alert";
import FormItem from "src/components/components/form/form-item";
import Form from "src/components/components/form";
import Input from "src/components/components/input";
import TextArea from "src/components/components/textarea";
import Button from "src/components/components/button";
import Stars from "../stars";

// Styles
import * as S from "./style";

const REVIEW_TITLE_MAX_LENGTH = 64;
const REVIEW_COMMENT_MAX_LENGTH = 256;

function ReviewForm({
  namespace,
  product,
  onSubmitSuccess,
}: {
  namespace: string;
  product: IkasProduct;
  onSubmitSuccess: () => void;
}) {
  const { t } = useTranslation();

  // States
  const [responseStatus, setResponseStatus] = useState<
    "success" | "error" | undefined
  >();
  const [isPending, setPending] = useState(false);
  const [form] = useState<CustomerReviewForm>(
    new CustomerReviewForm({
      productId: product.id,
      message: { starRule: t(`${namespace}:form.requiredRule`) },
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

  return (
    <S.ReviewForm>
      <S.Wrapper>
        <S.Title>{t(`${namespace}:formTitle`)}</S.Title>

        {responseStatus === "success" && (
          <AlertComponent
            status="success"
            text={t(`${namespace}:form.successText`)}
          />
        )}

        {responseStatus !== "success" && (
          <>
            {responseStatus === "error" && (
              <AlertComponent
                status="error"
                text={t(`${namespace}:form.errorText`)}
                style={{
                  marginBottom: "1rem",
                }}
              />
            )}

            <Form onSubmit={onSubmit}>
              <FormItem
                status={form.starErrorMessage ? "error" : undefined}
                help={form.starErrorMessage}
                label={t(`${namespace}:form.reviewStarts`)}
              >
                <Stars
                  star={form.star as 1 | 2 | 3 | 4 | 5}
                  onClick={(star) => form.onStarChange(star)}
                />
              </FormItem>
              <FormItem label={t(`${namespace}:form.reviewTitle`)}>
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
              <FormItem label={t(`${namespace}:form.bodyOfReview`)}>
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
                {t(`${namespace}:form.submitReview`)}
              </Button>
            </Form>
          </>
        )}
      </S.Wrapper>
    </S.ReviewForm>
  );
}

export default observer(ReviewForm);
