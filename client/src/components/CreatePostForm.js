import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';
import SelectCategory from './SelectCategory';
import HomeButton from 'react-icons/lib/fa/home';

class CreatePostForm extends Component {
  submitPost = ({ title, author, category, body }) => {
    this.props.setPostValues({
      title,
      author,
      category,
      body
    });
  };

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <Link to={'/'}>
          <div className="button-home">
            <HomeButton size="40" />
          </div>
        </Link>
        <SelectCategory />
        <div className="create-post-form">
          <h2>Add a post</h2>
          <div className="post-form-container">
            <PostForm onSubmit={this.submitPost} />
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePostForm;
