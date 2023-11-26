import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, onImageClick }) => {
  if (!image) {
    return null;
  }

  const { webformatURL, altText } = image;

  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={altText}
        onClick={() => onImageClick(image)}
        className={styles.ImageGalleryItem__image}
      />
    </li>
  );
};

export default ImageGalleryItem;

