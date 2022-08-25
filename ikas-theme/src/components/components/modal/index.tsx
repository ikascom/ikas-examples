import React from "react";

import useOnClickOutside from "src/utils/hooks/useOnClickOutside";
import Close from "src/components/svg/close";

import * as S from "./style";

type Props = {
  visible: boolean;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
};

function Modal({ visible, title, children, onClose }: Props) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => visible && onClose && onClose());

  React.useEffect(() => {
    if (visible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [visible]);

  React.useEffect(() => {
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <S.Modal $visible={visible} aria-hidden={!visible}>
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
}

export default Modal;
