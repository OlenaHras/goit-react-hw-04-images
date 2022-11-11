import { useState, useEffect } from 'react';
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
          // this.setState({
          //   images: images.concat(hits),
          //   loader: false,
          //   loadMore: true,
          // });
          if (page >= Math.ceil(totalHits / perPage)) {
            setLoadMore(false);
            // this.setState({
            //   loadMore: false,
            // });
            toast.info('It is the last page of images');
          }
        } catch (error) {
          setError(error);
          setLoader(false);
          // this.setState({
          //   error,
          //   loader: false,
          // })
        }
      }
      fetchData();
    }
  }, [search, page]);

  const handleSearchInfo = data => {
    setImages([]);
    setSearch(data);
    setPage(1);
    // this.setState({ images: [], search: data, page: 1 });
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
  };

  const handleImgClick = largeImg => {
    setModalImg(largeImg);

    setShowModal(true);
    // this.setState({ modalImg: largeImg, showModal: true });
  };

  const loadMoreBtn = () => {
    setPage(page + 1);
    // this.setState({ page: this.state.page + 1 });
  };

  return (
    <AppContainer>
      {showModal && (
        <Modal onCloseWindow={toggleModal}>
          <img src={modalImg} alt="LargeImage" />
        </Modal>
      )}
      <SearchBar onSubmit={handleSearchInfo} />

      {images && <ImageGallery images={images} onImgClick={handleImgClick} />}
      {loader && <Loader />}
      {loadMore && <Button onClickBtn={loadMoreBtn} />}
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </AppContainer>
  );
}

// export class App extends Component {
//   state = {
//     images: [],
//     search: '',
//     page: 1,
//     loader: false,
//     loadMore: false,
//     error: null,
//     showModal: false,
//     modalImg: '',
//   };
//   async componentDidUpdate(prevProps, prevState) {
//     const { search, page, images } = this.state;

//     if (prevState.search !== search || prevState.page !== page) {
//       try {
//         this.setState({ loader: true });
//         const response = await axios.get(
//           `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}`,
//           {
//             params: {
//               image_type: 'photo',
//               orientation: 'horizontal',
//               per_page: perPage,
//             },
//           }
//         );
//         const { total, hits, totalHits } = response.data;

//         if (total === 0) {
//           this.setState({ loader: false });
//           toast.error(
//             'Sorry, there are no images matching your search query. Please try again.'
//           );
//           return;
//         }

//         this.setState({
//           images: images.concat(hits),
//           loader: false,
//           loadMore: true,
//         });
//         if (this.state.page >= Math.ceil(totalHits / perPage)) {
//           this.setState({
//             loadMore: false,
//           });
//           toast.info('It is the last page of images');
//         }
//       } catch (error) {
//         this.setState({
//           error,
//           loader: false,
//         });
//       }
//     }
//   }
//   handleSearchInfo = data => {
//     this.setState({ images: [], search: data, page: 1 });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };
//   handleImgClick = largeImg => {
//     this.setState({ modalImg: largeImg, showModal: true });
//   };

//   loadMoreBtn = () => {
//     this.setState({ page: this.state.page + 1 });
//   };
//   render() {
//     const { showModal, modalImg, images } = this.state;
//     return (
//       <AppContainer>
//         {showModal && (
//           <Modal onCloseWindow={this.toggleModal}>
//             <img src={modalImg} alt="LargeImage" />
//           </Modal>
//         )}
//         <SearchBar onSubmit={this.handleSearchInfo} />

//         {this.state.images && (
//           <ImageGallery images={images} onImgClick={this.handleImgClick} />
//         )}
//         {this.state.loader && <Loader />}
//         {this.state.loadMore && <Button onClickBtn={this.loadMoreBtn} />}
//         <ToastContainer autoClose={3000} />
//         <GlobalStyle />
//       </AppContainer>
//     );
//   }
// }
