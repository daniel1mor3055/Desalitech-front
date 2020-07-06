import React from 'react';
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './index.scss';

const Widget = ({heading, children, cardName, childrenStyle, onEditClick,onDeleteClick}) => {

    return (
        <div className={`Widget jr-card ${cardName}`}>
            <div className={`Widget-headerWrapper jr-card-header d-flex align-items-start`}>
                <div className="mr-auto">
                    <h3 className="card-heading">{heading}</h3>
                    {children.length > 1 ? children[0] : null}
                </div>
                <div className={'Widget-controllers'}>
                    <IconButton className={'p-1'} color="primary">
                        <EditIcon onClick={onEditClick}/>
                    </IconButton>
                    <IconButton className={'p-0'}>
                        <DeleteIcon onClick={onDeleteClick} color={'error'}/>
                    </IconButton>
                </div>
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
    heading: PropTypes.string,
    subHeading: PropTypes.string,
    cardName: PropTypes.string
};

export default Widget;