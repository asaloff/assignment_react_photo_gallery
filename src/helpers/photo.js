import photoCollection from '../photos';

export function getFilters() {
  let filters = photoCollection.data.map(photo => {
    return photo.filter;
  });

  filters = Array.from(new Set(filters));
  filters.unshift('All');

  return filters;
}

export function getPhotosByFilter(filter) {
  if (filter === 'All') {
    return photoCollection.data;
  } else {
    return photoCollection.data.filter(photo => {
      return photo.filter === filter;
    });
  }
}

export function getPhotosByFilterAndPage(filter, page, searchTerm) {
  let photos;

  if (searchTerm) {
    photos = findPhotos(photoCollection.data, searchTerm);
  } else {
    photos = photoCollection.data;
  }

  if (filter === 'All') {
    return getPhotosByPage(photos, page);
  } else {
    photos = photos.filter(photo => {
      return photo.filter === filter;
    });
    return getPhotosByPage(photos, page);
  }
}

export function getPhotosByPage(photos, page) {
  let startIndex = page * 6 - 6;
  let endIndex = startIndex + 6;
  return photos.slice(startIndex, endIndex);
}

export function getOrderedPhotos(photos, direction, searchTerm) {
  if (searchTerm) photos = findPhotos(photos, searchTerm);

  return photos.sort(function(a, b) {
    if (direction === 'DESC') {
      return a.user.username.localeCompare(b.user.username);
    } else if (direction === 'ASC') {
      return b.user.username.localeCompare(a.user.username);
    } else {
      return null;
    }
  });
}

export function findPhotos(photos, searchTerm) {
  if (!searchTerm) return photos;

  return photos.filter(photo => {
    let caption = photo.caption || '';
    let username = photo.user.username;
    return (caption && caption.text.includes(searchTerm)) || username.includes(searchTerm);
  });
}
