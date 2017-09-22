import { connect } from 'react-redux';
import { addPostToServer, addCommentToServer, fetchAllPosts } from '../actions';
import CreatePostForm from '../components/CreatePostForm';

const mapStateToProps = ({ posts, allPosts }) => ({
  posts,
  allPosts
});

const mapDispatchToProps = {
  setPostValues: addPostToServer,
  setCommentValues: addCommentToServer,
  getAllPosts: fetchAllPosts
};

export const CreatePostFormDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePostForm);
