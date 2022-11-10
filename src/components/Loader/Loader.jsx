import { ThreeDots } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderWrapper>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4f49f2"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </LoaderWrapper>
  );
};
export default Loader;
