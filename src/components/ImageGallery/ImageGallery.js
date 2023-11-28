import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={styles.ImageGallery}>
      {images.map((image, index) => (
        <ImageGalleryItem key={index} image={image} onImageClick={onImageClick} />
      ))}
    </ul>
  );
};

export default ImageGallery;
