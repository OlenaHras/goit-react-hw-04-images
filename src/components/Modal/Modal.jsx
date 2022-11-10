import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalCont, Overlay } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseWindow();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseWindow();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalCont>{this.props.children}</ModalCont>
      </Overlay>,
      modalRoot
    );
  }
}
