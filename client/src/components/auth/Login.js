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
            this.props.history.push("/feature");
        });
    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                    <label>Email</label>
                    <Field
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="email"
                    />

                    <label>Password</label>
                    <Field
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