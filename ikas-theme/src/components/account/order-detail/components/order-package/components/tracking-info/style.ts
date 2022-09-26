import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 16px;
`;

export const CargoCompany = styled.div`
  text-transform: capitalize;
  font-weight: 500;
  margin-bottom: 4px;
`;

export const TrackingInfo = styled.div`
  display: flex; ;
`;

export const TrackingInfoTitle = styled.div`
  font-weight: 500;
`;

export const TrackingNumber = styled.a`
  text-decoration: underline;
  margin-left: 8px;
  color: ${({ theme }) => theme.color.link};
`;
