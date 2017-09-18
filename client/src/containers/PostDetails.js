import { connect } from 'react-redux';
import {
  addVoteToPost,
  addVoteToComment,
  editSinglePost,
  editSingleComment,
  deleteSinglePost,
  deleteSingleComment,
  addCommentToServer
} from '../actions';

import Post from '../components/Post';

const getPostFromPath = (ids, posts, comments, path) => {
  const postId = path.slice(path.lastIndexOf('/') + 1);

  if (ids.indexOf(postId) === -1) {
    return {};
  }

  const commentsToPost = posts[postId].comments;

  let sortedCommentsToPost;
  sortedCommentsToPost = commentsToPost.sort(function(a, b) {
    return comments[b].voteScore - comments[a].voteScore;
  });

  const post = { ...posts[postId], comments: sortedCommentsToPost };

  return post;
};

const mapStateToProps = (state, ownProps) => ({
  post: getPostFromPath(
    state.allPosts,
    state.posts,
    state.comments,
    ownProps.path
  ),
  commentsToPost: state.comments
});

const mapDispatchToProps = {
  votePosts: addVoteToPost,
  voteComment: addVoteToComment,
  editPost: editSinglePost,
  editComment: editSingleComment,
  deletePost: deleteSinglePost,
  deleteComment: deleteSingleComment,
  addAComment: addCommentToServer
};

export const PostDetails = connect(mapStateToProps, mapDispatchToProps)(Post);
