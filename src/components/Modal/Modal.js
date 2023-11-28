import React from 'react';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import styles from './Modal.module.css';

const Modal = ({ largeImageURL, altText, onClose }) => {
  const instance = basicLightbox.create(`
    <div className={styles.Overlay}>
      <div className={styles.Modal}>
        <img src="${largeImageURL}" alt="${altText}" />
      </div>
    </div>
  `);

  instance.show();

  const handleEscapeKey = event => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  document.addEventListener('keydown', handleEscapeKey);

  const handleClose = () => {
    document.removeEventListener('keydown', handleEscapeKey);
    instance.close();
    onClose();
  };

  return <div className={styles.Overlay} onClick={handleClose}></div>;
};

export default Modal;
