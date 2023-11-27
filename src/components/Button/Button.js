import React from 'react';
import styles from './Button.module.css';

class Button extends React.Component {
  render() {
    const { onClick, hasMore } = this.props;

    return (
      <div className={styles.Button__box}>
        {hasMore && (
          <button className={styles.Button} onClick={onClick}>
            Load more
          </button>
        )}
      </div>
    );
  }
}

export default Button;
