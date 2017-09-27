import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';

let commentId;

const validate = values => {
  const errors = {};
  if (!values.body) {
    errors.body = 'You must insert a comment body';
  } else if (values.body.length > 1000) {
    errors.body = 'Comment body must be 1000 characters or less';
  } else if (!isNaN(Number(values.body))) {
    errors.body = 'Invalid body. You inserted a number';
  }
  return errors;
};

const textAreaField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={label} type={type} />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
);

let InitializeCommentForm = props => {
  console.log(props);

  commentId = props.commentId;
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        className="comment-body-textarea"
        name="body"
        component={textAreaField}
        label="Insert comment body"
      />
      <button
        className="comment-submit-button"
        type="submit"
        disabled={submitting}
      >
        Submit
      </button>
    </form>
  );
};

// Clear after submit
const afterSubmit = (result, dispatch) => dispatch(reset('comment'));

InitializeCommentForm = reduxForm({
  form: 'comment',
  validate,
  enableReinitialize: true,
  onSubmitSuccess: afterSubmit
})(InitializeCommentForm);

InitializeCommentForm = connect(state => ({
  initialValues: state.comments[commentId]
}))(InitializeCommentForm);

export default InitializeCommentForm;
