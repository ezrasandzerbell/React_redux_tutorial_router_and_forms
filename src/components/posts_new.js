import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {

    const { meta: { touched, error } } = field;

    // using destructuring to pull "touch" and "error" properties off of the nested "meta" object

    const className = `form-group ${touched && error ? 'has-danger': ''}`

    // colon is being used to signify "otherwise", as in if these two conditions, then has-danger, otherwise empty string

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error: ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values)
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.categories) {
    errors.categories = "Enter a category!";
  }
  if (!values.content) {
    errors.content = "Enter some content!";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
