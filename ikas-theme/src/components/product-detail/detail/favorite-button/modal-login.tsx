import React from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";

import Modal from "src/components/components/modal";
import Button from "src/components/components/button";

function LoginRequiredModal({
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
}) {
  return (
    <Modal visible={isModalVisible} title={title} onClose={onClose}>
      <p className="text-text-light mb-8">{text}</p>
      <Link href={`/account/login?redirect=${decodeURIComponent(redirectUrl)}`}>
        <Button anchor>{loginButtonText}</Button>
      </Link>
      <Link
        href={`/account/register?redirect=${decodeURIComponent(redirectUrl)}`}
      >
        {noAccountText}
      </Link>
    </Modal>
  );
}

export default observer(LoginRequiredModal);
