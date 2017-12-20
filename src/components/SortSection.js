import React from 'react';
import Select from './elements/Select';
import Input from './elements/Input';
import { getFilters } from '../helpers/photo';

const SortSection = props => {
  const {
    onChange,
    photoCount,
    pagination,
    onSortClick,
    usernameSortType,
    onSearchInput
  } = props;

  const filterOptions = getFilters();

  return (
    <div className="SortSection container">
      <div className="row justify-content-between">
        <div className="col-lg-3 align-self-center">
          <Select options={filterOptions} onChange={onChange} />
        </div>

        <div className="col-lg-3 align-self-center text-center">
          <button className="btn btn-primary" onClick={onSortClick}>Sort Username {usernameSortType || 'ASC'}</button>
        </div>

        <div className="col-lg-3 align-self-center">
          <Input placeholder="Search" onChange={onSearchInput} id="search-input" />
        </div>

        <div className="col-lg-3 text-right align-self-center">
          {pagination}
          <p>{photoCount} Total Results</p>
        </div>
      </div>
    </div>
  );
};

export default SortSection;
