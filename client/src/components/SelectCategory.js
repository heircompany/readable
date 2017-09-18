import React from 'react';
import CategoryLink from './CategoryLink';

const SelectCategory = () => (
  <div className="select-category-nav">
    <div className="select-category">
      <p>Select Category:</p>
    </div>
    <div className="select-category">
      <CategoryLink category="react">react</CategoryLink>
    </div>
    <div className="select-category">
      <CategoryLink category="redux">redux</CategoryLink>
    </div>
    <div className="select-category">
      <CategoryLink category="udacity">udacity</CategoryLink>
    </div>
  </div>
);

export default SelectCategory;
