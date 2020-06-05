import React, {Component} from "react";
import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import * as Yup from 'yup';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import {triggerChange} from 'store/thunk/dashboard';
import ChooseTagsForm from '../ChooseTagsForm';
import Widget from "app/components/Widget";
import SolidCard from "app/components/SolidCards/SolidCards";

class Trigger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chooseTagsFormOpen: false,
        };
    }

    handleOpenChooseTagsForm = (event) => {
        event.preventDefault();
        this.setState({chooseTagsFormOpen: true});
    };

    handleCloseChooseTagsForm = () => {
        this.setState({chooseTagsFormOpen: false});
    };

    handleFormSubmit = (values) => {
        const {tagId, controllerTagId} = values;
        const {placement} = this.props;

        const trigger = {
            tagId,
            controllerTagId,
            placement
        };
        this.props.onTriggerChange(trigger);
    };

    getFormInitialValues = (tag, controllerTag) => {
        return {
            tagId: tag.tagId,
            controllerTagId: controllerTag.tagId,
        };
    };

    getFormValidationSchemaObject = () => {
        return {
            tagId: Yup.string().required('required'),
            controllerTagId: Yup.string().required('required'),
        };
    };

    verifyFormValues = (values) => {
        const {tagList} = this.props;
        const {tagId, controllerTagId} = values;
        if (tagId === controllerTagId) {
            return {global: "Tag and its controller should be different"};
        }
        if (!tagList.some(tag => tag.tagId.toLowerCase() === tagId.toLowerCase()) ||
            !tagList.some(tag => tag.tagId.toLowerCase() === controllerTagId.toLowerCase())) {
            return {global: "Make sure you provide valid tags"};
        }
        return null;
    };

    render() {
        const {chooseTagsFormOpen} = this.state;
        const {tag, controllerTag} = this.props;
        const initialFormValues = this.getFormInitialValues(tag, controllerTag);

        return (
            <Widget onClick={this.handleOpenChooseTagsForm}>
                <>
                    <SolidCard
                        tagName={(controllerTag.tagName !== '' && controllerTag.tagName != null) ?
                            controllerTag.tagName : controllerTag.tagId}
                        tagValue={controllerTag.tagValue}
                        tagUnits={controllerTag.tagUnits}
                        colorIndicator={tag.tagValue}
                    />
                    <ChooseTagsForm
                        labels={['Tag ID', 'Controller Tag ID']}
                        verifyValues={this.verifyFormValues}
                        validationSchemaObject={this.getFormValidationSchemaObject()}
                        formTitle={'Choose trigger settings'}
                        initialValues={initialFormValues}
                        handleClose={this.handleCloseChooseTagsForm}
                        handleSubmit={this.handleFormSubmit}
                        open={chooseTagsFormOpen}/>
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
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(Trigger));
