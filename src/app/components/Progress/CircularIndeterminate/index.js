import React from 'react';
import './index.scss';

const CircularIndeterminate = () =>
    (
        <div className="CircularIndeterminate">
            <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                    <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"
                            stroke-miterlimit="10"/>
                </svg>
            </div>
        </div>
    );


export default CircularIndeterminate;