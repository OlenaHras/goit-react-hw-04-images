import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalCont, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onCloseWindow, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseWindow();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onCloseWindow();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalCont>{children}</ModalCont>
    </Overlay>,
    modalRoot
  );
}
