import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
const ImageGallery = ({ images, onImgClick }) => {
  return (
    <GalleryList>
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} onModal={onImgClick} />
      ))}
    </GalleryList>
  );
};
export default ImageGallery;
