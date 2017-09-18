import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SelectCategory from './SelectCategory';
import InitializePostForm from './InitializePostForm';
import HomeButton from 'react-icons/lib/fa/home';

class EditPostForm extends Component {
  submitPost = ({ id, title, category, body }) => {
    const postId = id;
    this.props.editPost(postId, {
      title,
      category,
      body
    });
  };

  getThePosts = () => {
    const allPosts = this.props.allPosts;
    return allPosts;
  };

  render() {
    const post = this.props.post;
    return (
      <div className="container">
        <Link to={'/'}>
          <div className="button-home">
            <HomeButton size="40" />
          </div>
        </Link>
        <SelectCategory />
        <div className="create-post-form">
          <h2>Edit post</h2>
          <div className="post-form-container">
            <InitializePostForm onSubmit={this.submitPost} post={post} />
          </div>
        </div>
      </div>
    );
  }
}

export default EditPostForm;
