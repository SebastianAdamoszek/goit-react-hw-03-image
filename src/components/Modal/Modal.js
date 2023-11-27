import React from 'react';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import styles from './Modal.module.css';

const Modal = ({ largeImageURL, altText, onClose }) => {
  const openModal = () => {
    const instance = basicLightbox.create(`
    <div class="${styles.Overlay}">
        <div class="${styles.Modal}">
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

    return handleClose;
  };

  return (
    <div className={styles.Overlay} onClick={openModal()}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt={altText} />
      </div>
    </div>
  );
};

export default Modal;
