import styled from "styled-components";
import { FORM_ITEM_MARGIN_BOTTOM } from "../components/form/form-item/style";

export const Wrapper = styled.div`
  margin: auto;
  margin-top: 72px;
  margin-bottom: 150px;
  max-width: 500px;
  width: 100%;
`;

export const Title = styled.h1`
  font-weight: 300;
  font-size: 36px;
  line-height: 56px;
  margin-bottom: 24px;
`;

export const Footer = styled.footer`
  margin-top: 12px;
  font-weight: 300;
  font-size: 16px;
  line-height: 28px;

  a {
    font-weight: 400;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const SocialLoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: ${FORM_ITEM_MARGIN_BOTTOM}px;
`;
