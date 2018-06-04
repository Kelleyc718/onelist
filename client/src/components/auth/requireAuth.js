import React, { Component } from 'react';
import { connect } from 'react-redux';

// Reusable HOC intended to redirect from protected URL's
export default ChildComponent => {
    class ComposedComponent extends Component {
        // Our component just got rendered
        componentDidMount() {
            this.shouldNavigateAway();
        }
        // Our component just got updated
        componentDidUpdate() {
            this.shouldNavigateAway();
        }
        shouldNavigateAway() {
            if (!this.props.auth) {
                this.props.history.push('/');
            }
        }
        render() {
            return <ChildComponent {...this.props} />;
        }
    }
    const mapStateToProps = (state) => {
        return { auth: state.auth.authenticated };
    };
    return connect(mapStateToProps)(ComposedComponent);
};