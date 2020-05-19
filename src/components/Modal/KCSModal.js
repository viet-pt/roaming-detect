import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style.scss';
import PropTypes from 'prop-types';

const KCSModal = props => {

  const {
    isOpenModal,
    title,
    content,
    closeButton,
    closeModal,
    confirmButton,
    confirmAction,
  } = props;

  return (
    <Modal show={isOpenModal} onHide={closeModal} className="modal-wrapper">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
      <Modal.Footer>
        {closeButton &&
          <Button onClick={closeModal} className="close-btn">
            {closeButton || 'Đóng'}
          </Button>
        }
        <Button onClick={confirmAction} className="confirm-btn">
          {confirmButton || 'OK'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

KCSModal.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isOpenModal: PropTypes.bool.isRequired,
  closeButton: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  confirmButton: PropTypes.string,
  confirmAction: PropTypes.func,
};

KCSModal.defaultProps = {
  isOpenModal: false,
  closeModal: () => {},
  confirmAction: () => {},
};

export default KCSModal;
