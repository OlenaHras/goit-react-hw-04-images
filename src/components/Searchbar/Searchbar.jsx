import { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default function SearchBar({ onSubmit }) {
  const [value, setValue] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(value);
    e.target.reset();
  };
  const handleInput = e => {
    setValue(e.currentTarget.value);
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch size={30} />
        </SearchFormButton>

        <SearchFormInput
          onChange={handleInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Searchbar>
  );
}
