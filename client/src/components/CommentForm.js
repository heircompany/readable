import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';

let CommentForm = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="comment-author-label">Author</label>
        <div>
          <Field
            className="comment-author-input"
            name="author"
            component="input"
          />
        </div>
      </div>
      <div>
        <label className="comment-body-label">Body</label>
        <div>
          <Field
            className="comment-body-textarea"
            name="comment"
            component="textarea"
          />
        </div>
      </div>
      <button className="comment-submit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

// Clear after submit
const afterSubmit = (result, dispatch) => dispatch(reset('posts'));

CommentForm = reduxForm({
  form: 'posts',
  onSubmitSuccess: afterSubmit
})(CommentForm);

export default CommentForm;
