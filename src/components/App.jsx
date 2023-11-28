import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar.js';
import ImageGallery from './ImageGallery/ImageGallery.js';
import Loader from './Loader/Loader.js';
import Button from './Button/Button.js';
import Modal from './Modal/Modal.js';

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

  componentDidMount() {
    if (this.state.query.trim().length > 0) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchData();
    }
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
        webformatURL: image.webformatURL.replace(/^http:/, 'https:'),
        largeImageURL: image.largeImageURL.replace(/^http:/, 'https:'),
        altText: image.altText,
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

    if (trimmedQuery.length > 0 && trimmedQuery !== this.state.query) {
      this.setState({
        query: trimmedQuery,
        page: 1,
        images: [],
        loading: true,
      });
    }
  };

  handleLoadMore = () => {
    const { images, loading } = this.state;

    if (images.length > 0 && !loading) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
  };

  handleImageClick = selectedImage => {
    this.setState({ selectedImage });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { loading, images, selectedImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        <Loader isLoading={loading} />
        <Button onClick={this.handleLoadMore} hasMore={images.length > 0} />

        {selectedImage && (
          <Modal
            largeImageURL={selectedImage.largeImageURL}
            altText={selectedImage.altText}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;
