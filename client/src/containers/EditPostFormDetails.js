import { connect } from 'react-redux';
import { editSinglePost, fetchAllPosts } from '../actions';
import EditPostForm from '../components/EditPostForm';

const getPostFromPath = (ids, posts, path) => {
  const postId = path.slice(path.lastIndexOf('/') + 1);

  if (ids.indexOf(postId) === -1) {
    console.log('NO');
    return {};
  }
  const post = { ...posts[postId] };

  return post;
};

const mapStateToProps = (state, ownProps) => ({
  post: getPostFromPath(state.allPosts, state.posts, ownProps.path)
});

const mapDispatchToProps = {
  editPost: editSinglePost,
  getAllPosts: fetchAllPosts
};

export const EditPostFormDetails = connect(mapStateToProps, mapDispatchToProps)(
  EditPostForm
);
