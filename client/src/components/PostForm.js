import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  } else if (values.title.length > 30) {
    errors.title = 'Must be 30 characters or less';
  } else if (!isNaN(Number(values.title))) {
    errors.title = 'Invalid title. You inserted a number';
  }
  if (!values.author) {
    errors.author = 'Required';
  } else if (values.author.length > 25) {
    errors.author = 'Must be 25 characters or less';
  } else if (!isNaN(Number(values.author))) {
    errors.author = 'Invalid title. You inserted a number';
  }
  if (!values.body) {
    errors.body = 'You must insert a post body';
  } else if (values.body.length > 1000) {
    errors.body = 'Post body must be 1000 characters or less';
  } else if (!isNaN(Number(values.body))) {
    errors.body = 'Invalid body. You inserted a number';
  }
  return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
);

const textAreaField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={label} type={type} />
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
);

let PostForm = props => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        className="form-input-title"
        name="title"
        type="text"
        component={renderField}
        label="Title"
      />
      <Field
        className="form-input-author"
        name="author"
        type="text"
        component={renderField}
        label="Author"
      />
      <div>
        <label>Select category</label>
        <div>
          <Field
            className="category-select"
            name="category"
            component="select"
            label="Select category"
          >
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </Field>
        </div>
      </div>

      <Field
        className="post-body-textarea"
        name="body"
        component={textAreaField}
        label="Insert post body"
      />
      <button
        className="post-submit-button"
        type="submit"
        disabled={submitting}
      >
        Submit
      </button>
    </form>
  );
};

// Clear after submit
const afterSubmit = (result, dispatch) => dispatch(reset('posts'));

PostForm = reduxForm({
  form: 'posts',
  validate,
  onSubmitSuccess: afterSubmit
})(PostForm);

export default PostForm;
