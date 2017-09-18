import React from 'react';
import { Link } from 'react-router-dom';
import AddTextIcon from 'react-icons/lib/fa/plus-circle';

const EditPostFormLink = () => {
  return (
    <Link to="/create">
      <AddTextIcon size={40} />
    </Link>
  );
};

export default EditPostFormLink;
