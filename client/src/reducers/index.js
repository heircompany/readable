import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
  sortingTypes,
  GET_CATEGORIES,
  RECEIVE_ALL_POSTS,
  RECEIVE_ALL_COMMENTS,
  INSERT_POST,
  INSERT_COMMENT,
  UPDATE_POST,
  UPDATE_COMMENT,
  UPDATE_POST_SCORE,
  UPDATE_COMMENT_SCORE,
  FLAG_POST_AS_DELETED,
  UPDATE_POSTS_VISIBILITY,
  UPDATE_COMMENTS_VISIBILITY,
  CHANGE_SORTING_ORDER
} from '../actions';

const initialState = {
  categories: [],
  sortOrder: sortingTypes.MOST_RECENT,
  posts: {},
  comments: {},
  allPosts: [],
  postsByCategory: {}
};

// Set category
function categories(state = [], action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;

    default:
      return state;
  }
}

// Sort posts
function sortOrder(state = initialState.sortOrder, action) {
  switch (action.type) {
    case CHANGE_SORTING_ORDER:
      return action.sortOrder;

    default:
      return state;
  }
}

// Posts reducer
function posts(state = initialState.posts, action) {
  const parentId = action.parentId;
  const postId = action.postId;
  const post = action.post;

  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      const posts = action.dataObj;
      return {
        ...posts
      };

    case RECEIVE_ALL_COMMENTS:
      const comments = action.dataArray;
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          comments: [...comments]
        }
      };

    case INSERT_POST:
      return {
        ...state,
        [postId]: {
          ...post,
          comments: []
        }
      };

    case INSERT_COMMENT:
      return {
        ...state,
        [parentId]: {
          ...state[parentId],
          comments: [...state[parentId].comments, action.commentId]
        }
      };

    case UPDATE_POST:
      return {
        ...state,
        [postId]: {
          ...state[postId],
          title: action.title,
          category: action.category,
          body: action.body
        }
      };

    case UPDATE_POST_SCORE:
      const postScore = action.postScore;
      return {
        ...state,
        [postId]: {
          ...state[postId],
          voteScore: postScore
        }
      };

    case FLAG_POST_AS_DELETED:
      return {
        ...state,
        [postId]: {
          ...state[postId],
          deleted: true
        }
      };

    case UPDATE_COMMENTS_VISIBILITY:
      const commentsIds = action.commentsIds;
      const parentPostId = action.parentPostId;
      return {
        ...state,
        [parentPostId]: {
          ...state[parentPostId],
          comments: [...commentsIds]
        }
      };

    default:
      return state;
  }
}

// Comments reducer
function comments(state = initialState.comments, action) {
  const commentId = action.commentId;

  switch (action.type) {
    case RECEIVE_ALL_COMMENTS:
      const comments = action.dataObj;
      return {
        ...state,
        ...comments
      };

    case INSERT_COMMENT:
      return {
        ...state,
        [commentId]: action.comment
      };

    case UPDATE_COMMENT:
      return {
        ...state,
        [commentId]: {
          ...state[commentId],
          timestamp: action.timestamp,
          body: action.body
        }
      };

    case UPDATE_COMMENT_SCORE:
      const commentScore = action.commentScore;
      return {
        ...state,
        [commentId]: {
          ...state[commentId],
          voteScore: commentScore
        }
      };
    default:
      return state;
  }
}

// allPosts reducer
function allPosts(state = initialState.allPosts, action) {
  const postId = action.postId;

  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return [...action.allPosts];

    case INSERT_POST:
      return [...state, postId];

    case UPDATE_POSTS_VISIBILITY:
      return [...action.allPosts];

    default:
      return state;
  }
}

// Get posts for category
function postsByCategory(state = initialState.postsByCategory, action) {
  const categories = action.categories;

  let categoriesState = {};
  switch (action.type) {
    case GET_CATEGORIES:
      categories.map(category => {
        categoriesState[category] = {
          items: []
        };
      });
      return categoriesState;

    case RECEIVE_ALL_POSTS:
      const posts = action.dataObj;
      const postsIds = action.allPosts;

      let categoriesArray = [];
      for (const category in state) {
        categoriesArray.push(category);
      }
      categoriesArray.map(category => {
        categoriesState[category] = {
          items: postsIds.filter(postId => posts[postId].category === category)
        };
      });
      return categoriesState;

    case INSERT_POST:
      const postId = action.postId;
      const post = action.post;
      const category = post.category;
      return {
        ...state,
        [category]: {
          items: [...state, postId]
        }
      };

    default:
      return state;
  }
}

export default combineReducers({
  categories,
  sortOrder,
  posts,
  comments,
  allPosts,
  postsByCategory,
  form: formReducer
});
