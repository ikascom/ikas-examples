import React from "react";
import { Link } from "@ikas/storefront";
import { observer } from "mobx-react-lite";

import Modal from "src/components/components/modal";
import Button from "src/components/components/button";

import * as S from "./style";

const LoginRequiredModal = ({
  isModalVisible,
  title,
  text,
  loginButtonText,
  redirectUrl,
  noAccountText,
  onClose,
}: {
  isModalVisible: boolean;
  title: string;
  text: string;
  loginButtonText: string;
  noAccountText: string;
  redirectUrl: string;
  onClose: () => void;
}) => {
  return (
    <Modal visible={isModalVisible} title={title} onClose={onClose}>
      <S.Text>{text}</S.Text>
      <S.Login>
        <Link
          passHref
          href={`/account/login?redirect=${decodeURIComponent(redirectUrl)}`}
        >
          <Button anchor>{loginButtonText}</Button>
        </Link>
      </S.Login>
      <S.Register>
        <Link
          href={`/account/register?redirect=${decodeURIComponent(redirectUrl)}`}
        >
          {noAccountText}
        </Link>
      </S.Register>
    </Modal>
  );
};

export default observer(LoginRequiredModal);
