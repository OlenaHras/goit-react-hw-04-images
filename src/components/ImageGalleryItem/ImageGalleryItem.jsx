import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, onModal }) => {
  return (
    <GalleryItem>
      <GalleryItemImg
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onModal(image.largeImageURL)}
      />
    </GalleryItem>
  );
};
export default ImageGalleryItem;
