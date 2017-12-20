import React from 'react';
import Select from './elements/Select';
import { getFilters } from '../helpers/photo';

const SortSection = props => {
  const { onChange, photoCount, pagination } = props;
  const filterOptions = getFilters();

  return (
    <div className="SortSection">
      <div className="col-md-3">{pagination}</div>
      <div className="col-md-3">
        <Select options={filterOptions} onChange={onChange} />
      </div>
      <p className="pull-right">{photoCount} Results</p>
    </div>
  );
};

export default SortSection;
