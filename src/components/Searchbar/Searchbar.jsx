import React, { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    value: null,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    e.target.reset();
  };

  handleInput = e => {
    this.setState({ value: e.currentTarget.value });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FcSearch size={30} />
          </SearchFormButton>

          <SearchFormInput
            onChange={this.handleInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Searchbar>
    );
  }
}
