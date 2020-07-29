import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: null
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: error
        };
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        return (
            <div>
                {hasError ? <h1>Something Went Wrong</h1> : children}
            </div>
        );
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default ErrorBoundary;