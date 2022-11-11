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
  console.log(children);
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

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onCloseWindow();
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onCloseWindow();
//     }
//   };
//   render() {
//     // return createPortal(
//     //   <Overlay onClick={this.handleBackdropClick}>
//     //     <ModalCont>{this.props.children}</ModalCont>
//     //   </Overlay>,
//     //   modalRoot
//     // );
//   }
// }
