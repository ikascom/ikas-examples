import React, { useRef, useEffect } from "react";

import useOnClickOutside from "src/utils/hooks/useOnClickOutside";
import Close from "src/components/svg/close";

import * as S from "./style";

type Props = {
  visible: boolean;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
};

const Modal = ({ visible, title, children, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, () => {
    visible && onClose && onClose();
  });

  useEffect(() => {
    document.documentElement.style.overflow = visible ? "hidden" : "auto";
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [visible]);

  if (!visible) return null;
  return (
    <S.Modal
      $visible={visible}
      aria-hidden={!visible}
      role="dialog"
      aria-label="modal"
      aria-modal="true"
    >
      <S.ModalInner ref={modalRef}>
        <S.CloseButton onClick={onClose}>
          <Close />
        </S.CloseButton>
        <S.ModalContent>
          <S.ModalTitle>{title}</S.ModalTitle>
          <S.ModalChildren>{children}</S.ModalChildren>
        </S.ModalContent>
      </S.ModalInner>
    </S.Modal>
  );
};

export default Modal;
