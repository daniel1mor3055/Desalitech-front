import React from 'react';
import PropTypes from "prop-types";

const CardHeader = ({heading, subHeading, styleName, children}) =>
    (
        <div className={`jr-card-header d-flex align-items-start p-0 ${styleName}`}>
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
    children: PropTypes.node,
    heading: PropTypes.object, // Actually its string, but if one wishes to use <intl> its also possible
    subHeading: PropTypes.string,
    styleName: PropTypes.string,
};

export default CardHeader;


