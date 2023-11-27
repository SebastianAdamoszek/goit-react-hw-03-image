import React from 'react';
import styles from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ image, onImageClick }) => {
  if (!image) {
    return null;
  }

  const { webformatURL, altText, largeImageURL } = image;

  const openModal = () => {
    const modal = <Modal imageURL={largeImageURL} altText={altText} onClose={closeModal} />;
    document.body.appendChild(modal);
  };

  const closeModal = () => {
    const modal = document.querySelector('.basicLightbox');
   modal && modal.parentNode.removeChild(modal);
  };

  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={altText}
        onClick={() => {
          onImageClick(image);
          openModal();
        }}
        className={styles.ImageGalleryItem__image}
      />
    </li>
  );
};

export default ImageGalleryItem;


