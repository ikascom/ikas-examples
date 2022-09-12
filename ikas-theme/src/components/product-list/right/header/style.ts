import breakpoints from "src/styles/breakpoints";
import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  @media screen and (max-width: ${breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const MobileHeader = styled.div``;

export const MobileHeaderActionWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  margin-bottom: 24px;
`;

export const MobileHeaderDivider = styled.div`
  width: 1px;
  background-color: ${({ theme }) => theme.color.border};
`;

export const MobileHeaderButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 0;
`;

export const TotalProductCount = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
`;
