import React, { Component } from 'react';
import InitializeCommentForm from './InitializeCommentForm';

class EditCommentForm extends Component {
  submitComment = ({ id, body }) => {
    console.log(this.props);

    const commentId = id;
    this.props.editComment(commentId, {
      body
    });
  };

  render() {
    const commentId = this.props.commentId;
    return (
      <div className="container">
        <div className="edit-comment-form">
          <h2>Edit comment</h2>
          <div className="comment-form-container">
            <InitializeCommentForm
              onSubmit={this.submitComment}
              commentId={commentId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditCommentForm;
