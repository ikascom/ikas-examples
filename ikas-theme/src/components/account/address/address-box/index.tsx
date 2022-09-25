import React from "react";
import { observer } from "mobx-react-lite";
import { IkasCustomerAddress, useTranslation } from "@ikas/storefront";

import { NS } from "src/components/account";

import * as S from "./style";

type Props = {
  address: IkasCustomerAddress;
  index: number;
  onEdit: (address: IkasCustomerAddress, index: number) => void;
  onDelete: (address: IkasCustomerAddress, index: number) => void;
};

const AddressBox = ({ address, index, ...props }: Props) => {
  const { t } = useTranslation();

  const onEdit = () => props.onEdit(address, index);
  const onDelete = () => {
    const isDeleteConfirm = window.confirm(t(`${NS}:address.deleteConfirm`));
    isDeleteConfirm && props.onDelete(address, index);
  };

  return (
    <S.AddressBox>
      <S.Title>{address.title}</S.Title>
      <S.Content>
        <S.AddressText>{address.addressText}</S.AddressText>
        <S.ButtonsWrapper>
          <S.Button onClick={onEdit}>{t(`${NS}:address.editAddress`)}</S.Button>
          <S.Button onClick={onDelete}>{t(`${NS}:address.delete`)}</S.Button>
        </S.ButtonsWrapper>
      </S.Content>
    </S.AddressBox>
  );
};

export default observer(AddressBox);
