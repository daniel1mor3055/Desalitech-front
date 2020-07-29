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
            hasError ?
                <div>
                    <h1>Something Went Wrong</h1>
                </div> : children
        );
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default ErrorBoundary;