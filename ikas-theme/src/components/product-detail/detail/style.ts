import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Title = styled.h1`
  font-style: normal;
  font-weight: 300;
  font-size: 28px;
  line-height: 48px;
  color: ${({ theme }) => theme.color.primaryText};
  padding-right: 32px;
  margin-bottom: 12px;
`;

export const FavoriteButton = styled.button`
  position: absolute;
  top: 8px; // (TitleLineHeight - FavoriteButtonHeight) / 2
  right: 0;
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.color.primaryText};
`;

export const PriceWrapper = styled.div`
  margin-bottom: 24px;
`;

export const SellPrice = styled.span`
  font-size: 20px;
  line-height: 28px;
  text-decoration: line-through;
  color: ${({ theme }) => theme.color.sellPrice};
  margin-right: 8px;
`;
export const Price = styled.span`
  color: ${({ theme }) => theme.color.finalPrice};
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
`;

export const VariantsWrapper = styled.div``;

export const VariantTypeName = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 28px;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.color.secondaryText};
`;
export const VariantType = styled.div`
  margin-bottom: 24px;
`;
export const VariantValue = styled.div``;
export const BoxSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 12px;

  border: 1px solid #dfe2e6;
`;

export const DescriptionWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.border};
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  padding-top: 12px;
  padding-bottom: 12px;
  margin-top: 32px;
  margin-bottom: 20px;
`;
export const DescriptionTitle = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: ${({ theme }) => theme.color.primaryText};
`;
export const Description = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 28px;
  color: ${({ theme }) => theme.color.primaryText};
`;

export const SocialShareWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  @media (min-width: ${breakpoints.md}) {
    margin-bottom: unset;
  }
`;

export const SocialShareTitle = styled.h4`
  display: inline-block;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  margin-right: 12px;
`;

export const SocialMediaWrapper = styled.ul`
  display: inline-block;
`;

export const SocialMedia = styled.li`
  display: inline-block;

  margin-right: 16px;
  :last-child {
    margin-right: 0;
  }
`;

export const SocialMediaIcon = styled.a`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #000000;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 14px;
    height: 14px;
  }
`;
