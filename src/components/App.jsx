import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar.js';
import ImageGallery from './ImageGallery/ImageGallery.js';
import styles from '../components/Button/Button.module.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      images: [],
      loading: false,
      selectedImage: null,
      page: 1,
      perPage: 12,
    };
  }

  fetchData = async () => {
    const { query, page, perPage } = this.state;
    this.setState({ loading: true });

    try {
      const API_KEY = '39753662-13b05df2e1b75c8b2e28e56d6';
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      );

      if (!response.ok) {
        throw new Error('Error fetching images');
      }

      const data = await response.json();
      const formattedImages = data.hits.map(image => ({
        id: image.id,
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
      }));

      this.setState(prevState => ({
        images: [...prevState.images, ...formattedImages],
      }));
    } catch (error) {
      console.error('Error fetching images', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = newQuery => {
    this.setState({
      query: newQuery,
      page: 1,
      images: [],
    });
    this.fetchData();
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchData();
      }
    );
  };

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        {loading && <div>Loading...</div>}
        <ImageGallery
          images={this.state.images}
          onImageClick={this.handleImageClick}
        />
        <div className={styles.Button__box}>
          <button className={styles.Button} onClick={this.handleLoadMore}>
            Load More
          </button>
        </div>
      </div>
    );
  }
}

export default App;
