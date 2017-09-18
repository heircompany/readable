import generateUUID from '../utils/generateID.js';

import {
  getCategories,
  getPosts,
  getComments,
  addToPosts,
  addToComments,
  getSinglePost,
  getSingleComment,
  votePost,
  voteComment,
  editPost,
  editComment,
  deletePost,
  deleteComment
} from '../utils/ReadableAPI';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_ALL_COMMENTS = 'RECEIVE_ALL_COMMENTS';
export const INSERT_POST = 'INSERT_POST';
export const INSERT_COMMENT = 'INSERT_COMMENT';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE';
export const ORDER_POSTS = 'ORDER_POSTS';
export const CHANGE_SORTING_ORDER = 'CHANGE_SORTING_ORDER';
export const UPDATE_POSTS_VISIBILITY = 'UPDATE_POSTS_VISIBILITY';
export const UPDATE_COMMENTS_VISIBILITY = 'UPDATE_COMMENTS_VISIBILITY';
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE';
export const FLAG_POST_AS_DELETED = 'FLAG_POST_AS_DELETED';

export const sortingTypes = {
  MOST_RECENT: 'MOST_RECENT',
  LEAST_RECENT: 'LEAST_RECENT',
  HIGHEST_POINTS: 'HIGHEST_POINTS',
  LOWEST_POINTS: 'LOWEST_POINTS'
};

export function fetchAllPosts() {
  return function(dispatch) {
    return getCategories()
      .then(data => dispatch(retrieveCategories(data)))
      .then(() => getPosts())
      .then(data => dispatch(receiveAllPosts(data)))
      .then(data =>
        data.allPosts.map(postItem =>
          getComments(postItem).then(data =>
            dispatch(receiveAllComments(data, postItem))
          )
        )
      );
  };
}

export function retrieveCategories(data) {
  const categories = data.categories.map(category => category.name);
  return {
    type: GET_CATEGORIES,
    categories
  };
}

export function changeSortingOrder(sortOrder) {
  return {
    type: CHANGE_SORTING_ORDER,
    sortOrder
  };
}

export function receiveAllPosts(data) {
  let dataObj = {};
  for (let i = 0; i < data.length; i++) {
    dataObj[data[i].id] = data[i];
    dataObj[data[i].id].comments = [];
  }

  return {
    type: RECEIVE_ALL_POSTS,
    dataObj,
    allPosts: data.filter(post => !post.deleted).map(post => post.id)
  };
}

export function receiveAllComments(data, parentId) {
  let dataObj = {};
  for (let i = 0; i < data.length; i++) {
    dataObj[data[i].id] = data[i];
  }
  let dataArray = data.map(item => item.id);
  return {
    type: RECEIVE_ALL_COMMENTS,
    dataObj,
    dataArray,
    parentId
  };
}

export function addPostToServer(post) {
  return function(dispatch) {
    const id = generateUUID();
    const timestamp = Date.now();
    return addToPosts({ ...post, id, timestamp }).then(() =>
      getSinglePost(id).then(data => dispatch(insertPost(data)))
    );
  };
}

export function addCommentToServer(comment) {
  return function(dispatch) {
    const id = generateUUID();
    const timestamp = Date.now();
    return addToComments({
      ...comment,
      id,
      timestamp
    }).then(() =>
      getSingleComment(id).then(data => dispatch(insertComment(data)))
    );
  };
}

export function insertPost(data) {
  const postId = data.id;
  const post = data;
  return {
    type: INSERT_POST,
    postId,
    post
  };
}

export function insertComment(data) {
  console.log(data);
  const parentId = data.parentId;
  const commentId = data.id;
  const comment = data;
  return {
    type: INSERT_COMMENT,
    parentId,
    commentId,
    comment
  };
}

export function updatePost(data) {
  const postId = data.id;
  const title = data.title;
  const category = data.category;
  const body = data.body;
  return {
    type: UPDATE_POST,
    postId,
    title,
    category,
    body
  };
}

export function updateComment(data) {
  const commentId = data.id;
  const timestamp = data.timestamp;
  const body = data.body;
  return {
    type: UPDATE_COMMENT,
    commentId,
    timestamp,
    body
  };
}

export function updatePostScore(data) {
  const postId = data.id;
  const postScore = data.voteScore;
  return {
    type: UPDATE_POST_SCORE,
    postId,
    postScore
  };
}

export function updateCommentScore(data) {
  const commentId = data.id;
  const commentScore = data.voteScore;
  return {
    type: UPDATE_COMMENT_SCORE,
    commentId,
    commentScore
  };
}

export function flagPostAsDeleted(postId) {
  return {
    type: FLAG_POST_AS_DELETED,
    postId
  };
}

export function updatePostsVisibility(data) {
  return {
    type: UPDATE_POSTS_VISIBILITY,
    allPosts: data.filter(post => !post.deleted).map(post => post.id)
  };
}

export function updateCommentsVisibility(data, parentId) {
  console.log(parentId);
  return {
    type: UPDATE_COMMENTS_VISIBILITY,
    commentsIds: data
      .filter(comment => !comment.deleted)
      .map(comment => comment.id),
    parentPostId: parentId
  };
}

export function addVoteToPost(postId, vote) {
  return function(dispatch) {
    return votePost(postId, { option: vote }).then(() =>
      getSinglePost(postId)
        .then(data => dispatch(updatePostScore(data)))
        .then(() =>
          getComments(postId).then(data =>
            dispatch(receiveAllComments(data, postId))
          )
        )
    );
  };
}

export function addVoteToComment(commentId, vote) {
  return function(dispatch) {
    return voteComment(commentId, { option: vote }).then(() =>
      getSingleComment(commentId).then(data =>
        dispatch(updateCommentScore(data))
      )
    );
  };
}

export function editSinglePost(postId, newPost) {
  return function(dispatch) {
    return editPost(postId, newPost).then(() =>
      getSinglePost(postId).then(data => dispatch(updatePost(data)))
    );
  };
}

export function editSingleComment(commentId, newComment) {
  return function(dispatch) {
    const timestamp = Date.now();
    return editComment(commentId, {
      ...newComment,
      timestamp: timestamp
    }).then(() =>
      getSingleComment(commentId).then(data => dispatch(updateComment(data)))
    );
  };
}

export function deleteSinglePost(postId) {
  return function(dispatch) {
    return deletePost(postId)
      .then(() => dispatch(flagPostAsDeleted(postId)))
      .then(() =>
        getPosts().then(data => dispatch(updatePostsVisibility(data)))
      );
  };
}

export function deleteSingleComment(commentId, postId) {
  return function(dispatch) {
    return deleteComment(commentId).then(() =>
      getComments(postId).then(data =>
        dispatch(updateCommentsVisibility(data, postId))
      )
    );
  };
}
