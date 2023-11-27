import React, { Component } from 'react';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(this.state.query);
    } else {
      console.error('onSubmit is not a function');
    }
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button className={styles.SearchForm__button} type="submit">
            <span></span>
          </button>
          <label className={styles.SearchForm__button__label}></label>
          <input
            className={styles.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
