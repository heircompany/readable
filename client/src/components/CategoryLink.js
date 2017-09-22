import React from 'react';
import { Link } from 'react-router-dom';

const CategoryLink = ({ category, children }) => (
  <Link to={'/' + category}>
    <button className="category-button">{children}</button>
  </Link>
);

export default CategoryLink;
