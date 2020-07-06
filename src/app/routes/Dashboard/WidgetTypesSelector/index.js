import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import TimelineIcon from '@material-ui/icons/Timeline';
import SpeedIcon from '@material-ui/icons/Speed';
import LanguageIcon from '@material-ui/icons/Language';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import './index.scss';

const styles = {};

const iconButtonClasses = {
    label: 'WidgetTypesSelector-iconButton'
};

const WidgetTypesSelector = ({open, handleClose, handleChoose}) => (
    <Dialog
        className='WidgetTypesSelector'
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
    >
        <>
            <DialogTitle id="form-dialog-title">Choose widget to add</DialogTitle>
            <DialogContent>
                <ul className="jr-list jr-list-half d-flex WidgetTypesSelector-iconsList">
                    <li className="jr-list-item w-50 text-center">
                        <IconButton
                            className={'jr-list-item w-50 text-center '}
                            aria-label="Menu"
                            classes={iconButtonClasses}
                            onClick={(event) => handleChoose(event, 'timeSeries')}>
                            <TimelineIcon fontSize={'large'}/>
                            <p className="jr-list-text">Time Series</p>
                        </IconButton>
                    </li>

                    <li className="jr-list-item w-50 text-center">
                        <IconButton
                            className={'jr-list-item w-50 text-center '}
                            aria-label="Menu"
                            classes={iconButtonClasses}
                            onClick={(event) => handleChoose(event, 'rightGauge')}>
                            <SpeedIcon fontSize={'large'}/>
                            <p className="jr-list-text">Right Gauge</p>
                        </IconButton>
                    </li>

                    <li className="jr-list-item w-50 text-center">
                        <IconButton
                            className={'jr-list-item w-50 text-center '}
                            aria-label="Menu"
                            classes={iconButtonClasses}
                            onClick={(event) => handleChoose(event, 'middleGauge')}>
                            <SpeedIcon fontSize={'large'}/>
                            <p className="jr-list-text">Middle Gauge</p>
                        </IconButton>
                    </li>

                    <li className="jr-list-item w-50 text-center">
                        <IconButton
                            className={'jr-list-item w-50 text-center '}
                            aria-label="Menu"
                            classes={iconButtonClasses}
                            onClick={(event) => handleChoose(event, 'leftGauge')}>
                            <SpeedIcon fontSize={'large'}/>
                            <p className="jr-list-text">Left Gauge</p>
                        </IconButton>
                    </li>

                    <li className="jr-list-item w-50 text-center">
                        <IconButton
                            className={'jr-list-item w-50 text-center '}
                            aria-label="Menu"
                            classes={iconButtonClasses}
                            onClick={(event) => handleChoose(event, 'tag')}>
                            <LocalOfferIcon fontSize={'large'}/>
                            <p className="jr-list-text">Tag</p>
                        </IconButton>
                    </li>

                    <li className="jr-list-item w-50 text-center">
                        <IconButton
                            className={'jr-list-item w-50 text-center '}
                            aria-label="Menu"
                            classes={iconButtonClasses}
                            onClick={(event) => handleChoose(event, 'trigger')}>
                            <CreditCardIcon fontSize={'large'}/>
                            <p className="jr-list-text">Trigger</p>
                        </IconButton>
                    </li>

                    <li className="jr-list-item w-50 text-center">
                        <IconButton
                            className={'jr-list-item w-50 text-center '}
                            aria-label="Menu"
                            classes={iconButtonClasses}
                            onClick={(event) => handleChoose(event, 'seeq')}>
                            <LanguageIcon fontSize={'large'}/>
                            <p className="jr-list-text">Seeq</p>
                        </IconButton>
                    </li>
                </ul>
            </DialogContent>
        </>
    </Dialog>
);

WidgetTypesSelector.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(WidgetTypesSelector);