import photoCollection from '../photos';

export function getFilters() {
  let filters = photoCollection.data.map(photo => {
    return photo.filter;
  });

  filters = Array.from(new Set(filters));
  filters.unshift('All');

  return filters;
}

export function getPhotosByFilter(filter, page) {
  if (filter === 'All') {
    return photoCollection.data;
  } else {
    return photoCollection.data.filter(photo => {
      return photo.filter === filter;
    });
  }
}

export function getPhotosByFilterAndPage(filter, page) {
  if (filter === 'All') {
    return getPhotosByPage(photoCollection.data, page);
  } else {
    const photos = photoCollection.data.filter(photo => {
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
