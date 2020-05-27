import React from 'react';
import PropTypes from "prop-types";

const CardHeader = ({heading, subHeading, styleName, children}) =>
    (
        <div className={`jr-card-header d-flex align-items-start ${styleName}`}>
            <div className="mr-auto">
                <h3 className="card-heading">{heading}</h3>
                {subHeading && <p className="sub-heading">{subHeading}</p>}
            </div>
            {children}
        </div>
    );


CardHeader.defaultProps = {
    styleName: '',
    subHeading: ''
};

CardHeader.propTypes = {
    children: PropTypes.node.isRequired,
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    styleName: PropTypes.string,
};

export default CardHeader;

