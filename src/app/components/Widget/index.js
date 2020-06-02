import React from 'react';
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import {AddCircleOutline} from "@material-ui/icons";

const Widget = ({heading, children, styleName, cardStyle,childrenStyle, onClick}) => {

    return (
        <div className={`${styleName}`}>
            <div className={`jr-card ${cardStyle}`}>
                <div className={`jr-card-header d-flex align-items-start ${styleName}`}>
                    <div className="mr-auto">
                        <h3 className="card-heading">{heading}</h3>
                        {children.length > 1 ? children[0] : null}
                    </div>
                    <IconButton className="jr-btn jr-btn-lg" color="primary">
                        <AddCircleOutline onClick={onClick}/>
                    </IconButton>
                </div>
                
                <div className={`jr-card-body ${childrenStyle}`}>
                    {children.length > 1 ? children[1] : children}
                </div>
            </div>
        </div>
    );
};

Widget.defaultProps = {
    cardStyle: '',
    childrenStyle: '',
    styleName: 'col-lg-3 col-sm-12'
};

Widget.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    heading: PropTypes.object, // Actually its string, but if one wishes to use <intl> its also possible
    subHeading: PropTypes.string,
    styleName: PropTypes.string,
};

export default Widget;