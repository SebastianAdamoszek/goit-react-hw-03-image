import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar.js';
import ImageGallery from './ImageGallery/ImageGallery.js';
import Button from './Button/Button.js';

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
    const trimmedQuery = newQuery.trim();

    if (trimmedQuery.length > 0) {
      this.setState(
        {
          query: trimmedQuery,
          page: 1,
          images: [],
          loading: true,
        },
        () => {
          this.fetchData();
        }
      );
    }
  };

  handleLoadMore = () => {
    const { images, loading } = this.state;

    if (images.length > 0 && !loading) {
      this.setState(
        prevState => ({ page: prevState.page + 1 }),
        () => {
          this.fetchData();
        }
      );
    }
  };

  render() {
    const { loading, images } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        {loading && <div>Loading...</div>}
        <ImageGallery
          images={this.state.images}
          onImageClick={this.handleImageClick}
        />
        <Button onClick={this.handleLoadMore}
          hasMore={images.length > 0}
        />
      </div>
    );
  }
}

export default App;
