import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onImageClick }) => {
  if (!image) {
    return null;
  }

  const { webformatURL, altText } = image;

  const openModal = () => {
    onImageClick(image);
  };

  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={altText}
        onClick={openModal}
        className={styles.ImageGalleryItem__image}
      />
    </li>
  );
};

export default ImageGalleryItem;
