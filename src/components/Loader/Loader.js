import React from 'react';
import { Grid } from 'react-loader-spinner';
import styles from './Loader.module.css';

class Loader extends React.Component {
  render() {
    const { isLoading } = this.props;

    return (
      <div className={styles.Loader__box}>
        {isLoading && (
    
          <Grid
            height="80"
            width="80"
            color="#3f51b5"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
      </div>
    );
  }
}

export default Loader;
