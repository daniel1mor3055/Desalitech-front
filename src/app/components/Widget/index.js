import React from 'react';
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import {AddCircleOutline} from "@material-ui/icons";
import './index.scss';

const Widget = ({heading, children, cardName,childrenStyle, onClick}) => {

    return (
            <div className={`Widget jr-card ${cardName}`}>
                <div className={`Widget-headerWrapper jr-card-header d-flex align-items-start`}>
                    <div className="mr-auto">
                        <h3 className="card-heading">{heading}</h3>
                        {children.length > 1 ? children[0] : null}
                    </div>
                    <IconButton className="Widget-addButton jr-btn jr-btn-lg" color="primary">
                        <AddCircleOutline onClick={onClick}/>
                    </IconButton>
                </div>
                
                <div className={`jr-card-body ${childrenStyle}`}>
                    {children.length > 1 ? children[1] : children}
                </div>
            </div>
    );
};

Widget.defaultProps = {
    cardName: '',
    childrenStyle: '',
};

Widget.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    heading: PropTypes.object, // Actually its string, but if one wishes to use <intl> its also possible
    subHeading: PropTypes.string,
    cardName: PropTypes.string
};

export default Widget;