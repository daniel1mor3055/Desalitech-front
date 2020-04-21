import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => (
    <div className="app-wrapper page-error-container animated slideInUpTiny animation-duration-3">
        <div className="page-error-content">
            <div className="error-code mb-4 animated zoomInDown">404</div>
            <h2 className="text-center fw-regular title bounceIn animation-delay-10 animated">
                Oops, an error has occurred. Page not found!
            </h2>
            <p className="text-center zoomIn animation-delay-20 animated">
                <Link className="btn btn-primary" to="/">Go to home</Link>
            </p>
        </div>
    </div>
);

export default Error404;
