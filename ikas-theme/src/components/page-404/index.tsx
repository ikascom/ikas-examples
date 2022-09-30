import React from "react";
import { useTranslation } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Button from "../components/button";
import { Container } from "../components/container";

import * as S from "./style";

const NS = "page-404";

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <S.Wrapper>
        <S.Title>{t(`${NS}:title`)}</S.Title>
        <S.Text>{t(`${NS}:text`)}</S.Text>
        <Button anchor href="/">
          {t(`${NS}:link`)}
        </Button>
      </S.Wrapper>
    </Container>
  );
};

export default observer(Page404);
