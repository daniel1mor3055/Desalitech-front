import React, {Component} from "react";
import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import {triggerChange, triggerDelete} from 'store/thunk/dashboard';
import Widget from "app/components/Widget";
import SolidCard from "app/components/SolidCards/SolidCards";
import './index.scss';
import FormTrigger from "../FormTrigger";
import FormDelete from "../FormDelete";

class Trigger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editFormOpen: false,
            deleteFormOpen: false,
        };
    }

    handleOpenEditForm = (event) => {
        event.preventDefault();
        this.setState({editFormOpen: true});
    };

    handleCloseForm = () => {
        this.setState({
            editFormOpen: false,
            deleteFormOpen: false,
        });
    };

    handleFormSubmit = (values) => {
        const {tagName, controllerTagName} = values;
        const {placement, tagList} = this.props;

        const trigger = {
            tagId: tagList.find(o => o.tagName === tagName).tagId,
            controllerTagId: tagList.find(o => o.tagName === controllerTagName).tagId,
            placement
        };
        this.props.onTriggerChange(trigger);
    };

    getFormInitialValues = (tag, controllerTag) => {
        return {
            tagName: tag.tagName,
            controllerTagName: controllerTag.tagName,
        };
    };

    handleOpenDeleteForm = () => {
        this.setState({deleteFormOpen: true});
    };

    handleDeleteWidget = () => {
        const {placement, tag, controllerTag} = this.props;

        const trigger = {
            tagId: tag.tagId,
            controllerTagId: controllerTag.tagId,
            placement,
        };
        this.props.onTriggerDelete(trigger);
    };

    render() {
        const {editFormOpen, deleteFormOpen} = this.state;
        const {tag, controllerTag} = this.props;
        const initialFormValues = this.getFormInitialValues(tag, controllerTag);

        return (
            <Widget onEditClick={this.handleOpenEditForm} onDeleteClick={this.handleOpenDeleteForm}
                    cardName='Trigger-widget'>
                <>
                    <SolidCard
                        tagName={(tag.tagName !== '' && tag.tagName != null) ?
                            tag.tagName : tag.tagId}
                        tagValue={tag.tagValue}
                        tagUnits={tag.tagUnits}
                        colorIndicator={controllerTag.tagValue}
                    />
                    <FormTrigger
                        initialValues={initialFormValues}
                        handleClose={this.handleCloseForm}
                        handleSubmit={this.handleFormSubmit}
                        open={editFormOpen}/>

                    <FormDelete
                        handleClose={this.handleCloseForm}
                        handleSubmit={this.handleDeleteWidget}
                        open={deleteFormOpen}
                    />
                </>
            </Widget>
        );
    }
}


Trigger.propTypes = {
    controllerTag: PropTypes.object,
    tag: PropTypes.object,
    placement: PropTypes.number.isRequired,
};

const mapStateToProps = ({tags}) => {
    return {
        tagList: tags.tags,
    };
};

const mapDispatchedToProps = dispatch => {
    return {
        onTriggerChange: (trigger) => dispatch(triggerChange(trigger)),
        onTriggerDelete: (trigger) => dispatch(triggerDelete(trigger)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(Trigger));
