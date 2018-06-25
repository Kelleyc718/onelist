import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import "../../css/login.css";

class Login extends Component {
  onSubmit = formProps => {
    this.props.login(formProps, () => {
      this.props.history.push("/playlist");
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="login-landing">
        <form className="form card" onSubmit={handleSubmit(this.onSubmit)}>
          <div className="login-group">
            <i className="material-icons prefix">account_circle</i>
            <label className="icon_prefix" />
            <Field
              className="login-field"
              name="email"
              type="text"
              component="input"
              autoComplete="email"
            />

            <i className="material-icons prefix">vpn_key</i>
            <label className="icon_prefix" />
            <Field
              className="login-field validate"
              name="password"
              type="password"
              component="input"
              autoComplete="none"
            />
            <div className="error">{this.props.errorMessage}</div>
          </div>

          <div className="btn-group">
            <button type="submit" className="login-btn button">
              <a className="btn-text">Login</a>
            </button>
            <button className="cancel-btn button">
              <Link to="/" className="btn-text">
                Cancel
              </Link>
            </button>
              <button className="button">
                  <a href={"/auth/google"} className="btn-text">
                      Sign in with Google
                  </a>
              </button>
          </div>
        </form>
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
