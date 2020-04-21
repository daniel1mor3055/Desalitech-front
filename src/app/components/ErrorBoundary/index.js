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
                <div className="app-wrapper page-error-container animated slideInUpTiny animation-duration-3">
                    <div className="page-error-content">
                        <div className="error-code mb-4 animated zoomInDown">Error</div>
                        <h2 className="text-center fw-regular title bounceIn animation-delay-10 animated">
                            Something went wrong
                            {console.log(hasError.message)}
                        </h2>
                    </div>
                </div> : children
        );
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default ErrorBoundary;