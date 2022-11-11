import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { AppContainer } from './App.styled';
import { GlobalStyle } from './GlobalStyle';

const API_KEY = '29464393-3094de1b222949b883fcd7df9';
const perPage = 12;

export default function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    if (search) {
      setLoader(true);
      async function fetchData() {
        try {
          const response = await axios.get(
            `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}`,
            {
              params: {
                image_type: 'photo',
                orientation: 'horizontal',
                per_page: perPage,
              },
            }
          );

          const { total, hits, totalHits } = response.data;

          if (total === 0) {
            setLoader(false);
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }
          setImages(images.concat(hits));
          setLoader(false);
          setLoadMore(true);

          if (page >= Math.ceil(totalHits / perPage)) {
            setLoadMore(false);
            toast.info('It is the last page of images');
          }
        } catch (error) {
          setError(error);

          setLoader(false);
        }
      }
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const handleSearchInfo = data => {
    setImages([]);
    setSearch(data);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const handleImgClick = largeImg => {
    setModalImg(largeImg);

    setShowModal(true);
  };

  const loadMoreBtn = () => {
    setPage(page + 1);
  };

  return (
    <AppContainer>
      {showModal && (
        <Modal onCloseWindow={toggleModal}>
          <img src={modalImg} alt="LargeImage" />
        </Modal>
      )}
      <SearchBar onSubmit={handleSearchInfo} />
      {error && <p>"Ups...there are some problem. Try again later"</p>}

      {images && <ImageGallery images={images} onImgClick={handleImgClick} />}
      {loader && <Loader />}
      {loadMore && <Button onClickBtn={loadMoreBtn} />}
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </AppContainer>
  );
}

App.propTypes = {
  images: PropTypes.array,
  search: PropTypes.string,
  page: PropTypes.number,
  loader: PropTypes.bool,
  loadMore: PropTypes.bool,
  error: PropTypes.string,
  showModal: PropTypes.bool,
  modalImg: PropTypes.string,
};
