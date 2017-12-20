import React, { Component } from 'react';
import PhotoCard from './elements/PhotoCard';
import { getDateString } from '../helpers/date';
import photoCollection from '../photos';
import SortSection from '../components/SortSection';
import Pagination from '../components/Pagination';

import {
  getPhotosByFilter,
  getPhotosByFilterAndPage,
  getPhotosByPage,
  getOrderedPhotos,
  findPhotos
} from '../helpers/photo';


class Photos extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      photos: getPhotosByPage(photoCollection.data, 1),
      filter: 'All'
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSortClick = this.onSortClick.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
  }

  onFilterChange(e) {
    this.setState({
      filter: e.target.value,
      photos: getPhotosByFilterAndPage(e.target.value, 1, this.state.searchTerm),
      page: 1
    });
  }

  onPageChange(e) {
    e.preventDefault();
    const page = parseInt(e.target.getAttribute('value'), 10);

    this.setState({
      page: page,
      photos: getOrderedPhotos(
        getPhotosByFilterAndPage(this.state.filter, page, this.state.searchTerm),
        this.state.usernameSort
      )
    });

    window.scrollTo(0, 0);
  }

  onSortClick() {
    let photos;

    if (this.state.usernameSort === 'DESC') {

      photos = getOrderedPhotos(
        getPhotosByFilter(this.state.filter, this.state.searchTerm),
        'ASC'
      );

      this.setState({
        usernameSort: 'ASC',
        photos: photos.slice(0, 6),
        page: 1
      });
    } else {

      photos = getOrderedPhotos(
        getPhotosByFilter(this.state.filter, this.state.searchTerm),
        'DESC'
      );

      this.setState({
        usernameSort: 'DESC',
        photos: photos.slice(0, 6),
        page: 1
      });
    }
  }

  onSearchInput(e) {
    const searchTerm = e.target.value;

    this.setState({
      page: 1,
      usernameSort: null,
      photos: findPhotos(getPhotosByFilter(this.state.filter), searchTerm).slice(0, 6),
      searchTerm: searchTerm
    });
  }

  render() {
    const filteredPhotos = getPhotosByFilter(this.state.filter);
    const photos = this.state.photos;
    let photoCount;

    if (this.state.searchTerm) {
      photoCount = findPhotos(filteredPhotos, this.state.searchTerm).length;
    } else {
      photoCount = filteredPhotos.length;
    }

    const photoCards = photos.map(photo => {
      const created = getDateString(photo.created_time);
      const caption = photo.caption || '';

      return (
        <PhotoCard
          imgLink={photo.images.low_resolution.url}
          username={photo.user.username}
          created={created}
          likes={photo.likes.count.toLocaleString()}
          comments={photo.comments.count.toLocaleString()}
          caption={caption.text}
          filter={photo.filter}
          key={photo.id}
        />
      );
    });

    const paginationCollection = findPhotos(filteredPhotos, this.state.searchTerm);
    const pagination = (
      <Pagination
        collection={paginationCollection}
        currentPage={this.state.page}
        perPage="6"
        onClick={this.onPageChange}
      />
    );

    return (
      <div className="Photos container">
        <SortSection
          onChange={this.onFilterChange}
          photoCount={photoCount}
          pagination={pagination}
          onSortClick={this.onSortClick}
          usernameSortType ={this.state.usernameSort}
          onSearchInput={this.onSearchInput}
        />

        <section className="PhotoCards">
          {photoCards}
        </section>

        <div className="col-md-3 pull-right">
          {pagination}
        </div>
      </div>
    );
  }
}

export default Photos;
