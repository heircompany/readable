import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CategorySelector from './CategorySelector';
import PostFormLink from './PostFormLink';
import ArrowUp from 'react-icons/lib/fa/sort-asc';
import ArrowDown from 'react-icons/lib/fa/sort-desc';
import HomeButton from 'react-icons/lib/fa/home';
import { convertToReadableDate } from '../utils/convertDate';

class Category extends Component {
  // Upvote a post.
  upvote = postId => {
    this.props.votePosts(postId, 'upVote');
  };

  // Downvote a post.
  downvote = postId => {
    this.props.votePosts(postId, 'downVote');
  };

  deleteThisPost = postId => {
    this.props.deletePost(postId);
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    const newOrder = event.target.value;
    this.props.sortPosts(newOrder);
  };

  render() {
    const posts = this.props.posts;
    const sortedIds = this.props.sortedIds;

    // get category from the match props in App.js
    const selectedCategory = this.props.selectedCategory;

    // capitalize category name
    const visibleCategoryName =
      selectedCategory.charAt(0).toUpperCase() + selectedCategory.substring(1);

    return (
      <div className="container">
        <h2>
          {visibleCategoryName} {' Posts'}{' '}
        </h2>
        <div className="button-home">
          <Link to={'/'}>
            <HomeButton size="40" />
          </Link>
        </div>
        <section className="navigation">
          <CategorySelector />
          <div className="sort-select-form">
            <form onSubmit={this.handleSubmit}>
              <label>Sort posts by: </label>
              <select value={this.props.sortOrder} onChange={this.handleChange}>
                <option value="MOST_RECENT">most recent</option>
                <option value="LEAST_RECENT">least recent</option>
                <option value="HIGHEST_POINTS">highest points</option>
                <option value="LOWEST_POINTS">lowest points</option>
              </select>
            </form>
          </div>
          <div className="post-icons">
            <PostFormLink />
          </div>
        </section>
        <div className="category-related-posts">
          <ul className="all-posts">
            {sortedIds
              .filter(postId => posts[postId].category === selectedCategory)
              .map(postId => (
                <li key={postId} className="single-post">
                  <div className="single-post-wrapper">
                    <div className="post-voting-icons">
                      <ArrowUp
                        className="up=arrow"
                        size={20}
                        value={postId}
                        onClick={() => this.upvote(postId)}
                      />
                      <ArrowDown
                        className="down-arrow"
                        size={20}
                        value={postId}
                        onClick={() => this.downvote(postId)}
                      />
                    </div>
                    <div className="post-details">
                      <Link to={'/' + posts[postId].category + '/' + postId}>
                        <p className="post-title">{posts[postId].title}</p>
                      </Link>
                      <p className="post-author">
                        author: {posts[postId].author}
                      </p>
                      <p className="post-separator">|</p>
                      <p className="post-author">
                        {convertToReadableDate(posts[postId].timestamp)}
                      </p>
                      <p className="post-separator">|</p>
                      <p className="post-score">
                        {posts[postId].voteScore} points
                      </p>
                      <p className="post-separator">|</p>
                      <p className="post-comments">
                        {posts[postId].comments.length} comments
                      </p>
                      <p className="post-separator">|</p>
                      <p className="post-edit-link">
                        <Link to={'/edit/' + postId}>edit</Link>
                      </p>
                      <p className="post-separator">|</p>
                      <p
                        className="post-delete-link"
                        onClick={() => this.deleteThisPost(postId)}
                      >
                        delete
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Category;
