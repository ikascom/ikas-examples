import React from "react";
import { IkasTrackingInfo } from "@ikas/storefront";

import * as S from "./style";

type Props = {
  trackingInfo: IkasTrackingInfo;
};

const OrderPackageTrackingInfo = ({ trackingInfo }: Props) => {
  if (
    !trackingInfo ||
    !trackingInfo.trackingLink ||
    !trackingInfo.trackingNumber
  )
    return null;

  return (
    <S.Wrapper>
      <S.CargoCompany>{trackingInfo.cargoCompany}</S.CargoCompany>
      <S.TrackingInfo>
        <S.TrackingInfoTitle>Takip Numarası:</S.TrackingInfoTitle>
        <S.TrackingNumber
          href={trackingInfo.trackingLink || ""}
          target="_blank"
        >
          {trackingInfo.trackingNumber}
        </S.TrackingNumber>
      </S.TrackingInfo>
    </S.Wrapper>
  );
};

export default OrderPackageTrackingInfo;
