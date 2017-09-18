import React from 'react';
import { Link } from 'react-router-dom';
import EditButton from 'react-icons/lib/fa/edit';

const EditPostButtonLink = props => {
  return (
    <Link to={'/edit/' + props.post.id}>
      <EditButton className="post-details-edit-button" size="40" />
    </Link>
  );
};

export default EditPostButtonLink;
