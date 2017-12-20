import React, { Component } from 'react';
import PhotoCard from './elements/PhotoCard';
import { getDateString } from '../helpers/date';
import photoCollection from '../photos';
import SortSection from '../components/SortSection';
import Pagination from '../components/Pagination';
import { getPhotosByFilter, getPhotosByFilterAndPage, getPhotosByPage } from '../helpers/photo';


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
  }

  onFilterChange(e) {
    this.setState({
      filter: e.target.value,
      photos: getPhotosByFilterAndPage(e.target.value, this.state.page)
    });
  }

  onPageChange(e) {
    e.preventDefault();
    const page = parseInt(e.target.getAttribute('value'), 10);

    this.setState({
      page: page,
      photos: getPhotosByPage(photoCollection.data, page)
    });
  }

  // onSortButton(e) {
  //   if (this.state.usernameSort === 'ASC') {
  //     this.setState({usernameSort: 'DESC'});
  //     getOrderedPhotos(//)
  //   }
  // }

  render() {
    const photos = this.state.photos;
    const photoCount = getPhotosByFilter(this.state.filter).length;
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

    const pagination = (
      <Pagination
        collection={getPhotosByFilter(this.state.filter)}
        currentPage={this.state.page}
        perPage="6"
        onClick={this.onPageChange}
      />
    );

    return (
      <div className="Photos container">
        <SortSection onChange={this.onFilterChange} photoCount={photoCount} pagination={pagination} />
        {photoCards}
        {pagination}
      </div>
    );
  }
}

export default Photos;
