const api =
  process.env.REACT_APP_PROJECT_READABLE_API_URL || 'http://localhost:5001';

let token = localStorage.token;

if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers }).then(
    res => res.json(),
    error => console.log('An error occurred', error)
  );

export const getPosts = () =>
  fetch(`${api}/posts`, { headers }).then(
    res => res.json(),
    error => console.log('An error occurred', error)
  );

export const getComments = parentId =>
  fetch(`${api}/posts/` + parentId + `/comments`, { headers }).then(
    res => res.json(),
    error => console.log('An error occurred', error)
  );

export const addToPosts = obj =>
  fetch(`${api}/posts`, {
    method: `POST`,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(res => res.json());

export const addToComments = obj =>
  fetch(`${api}/comments`, {
    method: `POST`,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(res => res.json());

export const getSinglePost = postId =>
  fetch(`${api}/posts/` + postId, { headers }).then(
    res => res.json(),
    error => console.log('An error occurred', error)
  );

export const getSingleComment = postId =>
  fetch(`${api}/comments/` + postId, { headers }).then(
    res => res.json(),
    error => console.log('An error occurred', error)
  );

export const votePost = (postId, vote) =>
  fetch(`${api}/posts/` + postId, {
    method: `POST`,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vote)
  }).then(res => res.json());

export const voteComment = (commentId, vote) =>
  fetch(`${api}/comments/` + commentId, {
    method: `POST`,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vote)
  }).then(res => res.json());

export const editPost = (postId, newPost) =>
  fetch(`${api}/posts/` + postId, {
    method: `PUT`,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  }).then(res => res.json());

export const editComment = (commentId, newComment) =>
  fetch(`${api}/comments/` + commentId, {
    method: `PUT`,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComment)
  }).then(res => res.json());

export const deletePost = postId =>
  fetch(`${api}/posts/` + postId, {
    method: `DELETE`,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  });

export const deleteComment = commentId =>
  fetch(`${api}/comments/` + commentId, {
    method: `DELETE`,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  });
