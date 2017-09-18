import { connect } from 'react-redux';
import {
  fetchAllPosts,
  changeSortingOrder,
  addVoteToPost,
  sortingTypes,
  deleteSinglePost
} from '../actions';

import AllPosts from '../components/AllPosts';
import Category from '../components/Category';

const {
  MOST_RECENT,
  LEAST_RECENT,
  HIGHEST_POINTS,
  LOWEST_POINTS
} = sortingTypes;

const getVisiblePosts = (postIds, posts, sortOrder) => {
  const ids = postIds.slice();
  let sortedIds;

  switch (sortOrder) {
    case MOST_RECENT:
      sortedIds = ids.sort(function(a, b) {
        return posts[b].timestamp - posts[a].timestamp;
      });
      return sortedIds;
    case LEAST_RECENT:
      sortedIds = ids.sort(function(a, b) {
        return posts[a].timestamp - posts[b].timestamp;
      });
      return sortedIds;
    case HIGHEST_POINTS:
      sortedIds = ids.sort(function(a, b) {
        return posts[b].voteScore - posts[a].voteScore;
      });
      return sortedIds;
    case LOWEST_POINTS:
      sortedIds = ids.sort(function(a, b) {
        return posts[a].voteScore - posts[b].voteScore;
      });
      return sortedIds;
    default:
      return ids;
  }
};

const mapStateToProps = state => ({
  sortedIds: getVisiblePosts(state.allPosts, state.posts, state.sortOrder),
  posts: state.posts,
  sortOrder: state.sortOrder
});

const mapDispatchToProps = {
  sortPosts: changeSortingOrder,
  votePosts: addVoteToPost,
  deletePost: deleteSinglePost,
  getAllPosts: fetchAllPosts
};

export const VisiblePosts = connect(mapStateToProps, mapDispatchToProps)(
  AllPosts
);

export const VisibleCategoryPosts = connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
