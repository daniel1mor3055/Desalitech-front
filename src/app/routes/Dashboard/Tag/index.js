import React, {Component} from "react";
import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import * as Yup from 'yup';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import TitleCard from "app/components/TitleCard";
import {tagChange} from 'store/thunk/dashboard';
import ChooseTagsForm from '../ChooseTagsForm';
import Widget from "app/components/Widget";

class Tag extends Component {
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
        const {tagId} = values;
        const {placement} = this.props;

        const tag = {
            tagId,
            placement
        };
        this.props.onTagChange(tag);
    };

    getFormInitialValues = (tagId) => {
        const initialValues = {
            tagId,
        };
        return initialValues;
    };

    getFormValidationSchemaObject = () => {
        const validationSchema = {
            tagId: Yup.string().required('Choose Tag ID'),
        };
        return validationSchema;
    };

    render() {
        const {chooseTagsFormOpen} = this.state;
        const {tagId, tagName, tagValue, tagUnits} = this.props;
        const initialFormValues = this.getFormInitialValues(tagId);

        return (
            <Widget onClick={this.handleOpenChooseTagsForm}>
                <>
                    <TitleCard
                        tagName={(tagName !== '' && tagName != null) ? tagName : tagId}
                        tagValue={tagValue}
                        tagUnits={tagUnits}
                    />
                    <ChooseTagsForm
                        labels={['Tag ID']}
                        verifyValues={() => null}
                        validationSchemaObject={this.getFormValidationSchemaObject()}
                        formTitle={'Choose tag to display'}
                        initialValues={initialFormValues}
                        handleClose={this.handleCloseChooseTagsForm}
                        handleSubmit={this.handleFormSubmit}
                        open={chooseTagsFormOpen}/>
                </>
            </Widget>
        );
    }
}


Tag.propTypes = {
    tagId: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    tagValue: PropTypes.string.isRequired,
    tagUnits: PropTypes.string.isRequired,
    placement: PropTypes.number.isRequired,
};

const mapDispatchedToProps = dispatch => {
    return {
        onTagChange: (tag) => dispatch(tagChange(tag)),
    };
};

export default withRouter(connect(null, mapDispatchedToProps)(Tag));
