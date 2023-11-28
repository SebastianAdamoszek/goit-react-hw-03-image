import React from 'react';
import styles from './Modal.module.css';

class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey);
    this.props.onClose();
  }

  handleEscapeKey = event => {
    if (event.key === 'Escape') {
      this.handleClose();
    }
  };

  handleClose = () => {
    document.removeEventListener('keydown', this.handleEscapeKey);
    this.props.onClose();
  };

  render() {
    const { largeImageURL, altText } = this.props;

    return (
      <div className={styles.Overlay} onClick={this.handleClose}>
        <div className={styles.Modal}>
          <img src={largeImageURL} alt={altText} />
        </div>
      </div>
    );
  }
}

export default Modal;
