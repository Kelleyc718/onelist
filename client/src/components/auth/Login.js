import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";


class Login extends Component {
  onSubmit = formProps => {
    this.props.login(formProps, () => {
      this.props.history.push("/playlist");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="main-content">
        <form className="login-form" onSubmit={handleSubmit(this.onSubmit)}>
          <label className="login-label">Email</label>
          <Field
            className="login-field"
            name="email"
            type="text"
            component="input"
            autoComplete="email"
          />

          <label className="login-label">Password</label>
          <Field
            className="login-field"
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />

          <div className="error">{this.props.errorMessage}</div>

          <button className="login-button">Login</button>
          <Link to="/" className="login-button">
            Cancel
          </Link>
        </form>
        <button>
            <a href="/auth/google" className="login-button">
                Sign In With Google
            </a>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.errorMessage };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "login" })
)(Login);
