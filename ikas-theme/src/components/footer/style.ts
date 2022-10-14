import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Footer = styled.footer`
  padding: 48px 0;
  background-color: var(--footer-background-color);
`;

export const LogoLinksArea = styled.div`
  text-align: center;
  @media (min-width: ${breakpoints.md}) {
    text-align: unset;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const SocialMediaAndPaymentArea = styled.div`
  text-align: center;

  @media (min-width: ${breakpoints.md}) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SocialMediaList = styled.ul`
  margin-bottom: 20px;

  @media (min-width: ${breakpoints.md}) {
    margin-bottom: unset;
  }
`;
export const SocialMediaListItem = styled.li`
  display: inline-block;

  margin-right: 16px;
  :last-child {
    margin-right: 0;
  }
`;
export const SocialMediaItem = styled.a`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #000;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const PaymentOptionsWrapper = styled.div``;
export const PaymentOption = styled.span`
  display: inline-block;
  margin-right: 16px;
  vertical-align: middle;

  :last-child {
    margin-right: 0;
  }
`;

export const LogoWrapper = styled.div`
  position: relative;
  margin: auto;
  margin-bottom: 20px;
  max-width: 200px;
  max-height: 200px;

  img {
    margin: auto;
    object-fit: contain;
  }

  @media (min-width: ${breakpoints.md}) {
    margin: unset;

    img {
      margin: unset;
    }
  }
`;

export const LinksWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 114px;

  @media (min-width: ${breakpoints.md}) {
    gap: 72px;
    flex-direction: row;
  }
`;
export const LinkWrapper = styled.li``;
export const SubLinksWrapper = styled.ul``;
export const SubLinkWrapper = styled.li``;
export const LinkTitle = styled.h4`
  margin-bottom: 12px;
  font-weight: 400;
  font-size: 20px;
`;
export const Link = styled.a`
  display: block;
  font-size: 16px;
  line-height: 28px;
  font-weight: 300;
`;

export const Divider = styled.div`
  border-top: 1px solid #000;
  margin: 24px 0;
`;

export const CopyrightWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const CopyrightText = styled.span``;
export const PoweredBy = styled.div``;
export const PoweredByText = styled.span`
  display: inline-block;
`;
export const PoweredByLogo = styled.span`
  display: inline-block;
  vertical-align: middle;
`;

export const EmailSubscriptionAndLanguage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;

  @media screen and (max-width: ${breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const LanguageSelect = styled.div`
  width: 100%;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  text-align: center;

  @media (min-width: ${breakpoints.md}) {
    text-align: left;
    margin-left: auto;
    margin-right: unset;
  }
`;

export const LanguageSelectText = styled.p`
  margin-bottom: 8px;
`;
