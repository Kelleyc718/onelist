import React, {Component} from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {compose} from "redux";
import {Link} from "react-router-dom";
import * as actions from "../../actions";
import "../../css/login.css";


class Login extends Component {
    onSubmit = formProps => {
        this.props.login(formProps, () => {
            this.props.history.push("/about");
        });
    };

    render() {
        const { handleSubmit } = this.props;
        return (
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

                <div>
                    {this.props.errorMessage}
                </div>

                <button className="login-button">Login</button>
                <Link to="/" className="login-button">Cancel</Link>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {errorMessage: state.auth.errorMessage};
};

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: "signin"})
)(Login);