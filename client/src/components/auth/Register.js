import React, {Component} from "react";
import {reduxForm, Field} from "redux-form";
import {connect} from "react-redux";
import {compose} from "redux";
import {Link} from "react-router-dom";
import * as actions from "../../actions/actionsIndex";
import "../../css/register.css";


class Register extends Component {
    onSubmit = formProps => {
        this.props.register(formProps, () => {
            this.props.history.push("/about");
        });
    };

    render() {
        const {handleSubmit} = this.props;
        return (
            <form className="register-form" onSubmit={handleSubmit(this.onSubmit)}>
                <p className="register-p">Register today or sign-up!</p>
                <label className="register-label">Email</label>
                <Field
                    className="register-field"
                    name="email"
                    type="text"
                    component="input"
                    autoComplete="email"
                />
                <label className="register-label">Password</label>
                <Field
                    className="register-field"
                    name="password"
                    type="password"
                    component="input"
                    autoComplete="current-password"
                />

                <div>
                    {this.props.errorMessage}
                </div>
                <button className="register-button" type="submit">Register</button>
                <Link to="/" className="register-button">
                    Cancel
                </Link>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {errorMessage: state.auth.errorMessage};
};

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({form: "register"})
)(Register);