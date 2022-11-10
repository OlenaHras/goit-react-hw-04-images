import { LoadMoreBtn } from './Button.styled';
const Button = ({ onClickBtn }) => {
  return (
    <LoadMoreBtn type="button" onClick={onClickBtn}>
      Load more
    </LoadMoreBtn>
  );
};
export default Button;
