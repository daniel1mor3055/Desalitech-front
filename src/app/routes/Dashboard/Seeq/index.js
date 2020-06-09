import React, {Component} from "react";
import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import * as Yup from 'yup';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import {seeqChange} from 'store/thunk/dashboard';
import ChooseTagsForm from '../ChooseTagsForm';
import Widget from "app/components/Widget";
import './index.scss';

class Seeq extends Component {
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
        const {url} = values;
        const {placement} = this.props;

        const seeq = {
            url,
            placement
        };
        this.props.onSeeqChange(seeq);
    };

    getFormInitialValues = (url) => {
        const initialValues = {
            url,
        };
        return initialValues;
    };

    getFormValidationSchemaObject = () => {
        const validationSchema = {
            url: Yup.string().required('required'),
        };
        return validationSchema;
    };

    render() {
        const {chooseTagsFormOpen} = this.state;
        const {url} = this.props;
        const initialFormValues = this.getFormInitialValues(url);

        return (
            <Widget onClick={this.handleOpenChooseTagsForm} cardName='Seeq'>
                <>
                    <iframe
                        className='Seeq-iframe'
                        src={url}
                        title="SEEQ data">
                    </iframe>
                    <ChooseTagsForm
                        labels={['URL']}
                        verifyValues={() => null}
                        validationSchemaObject={this.getFormValidationSchemaObject()}
                        formTitle={'Enter a valid Seeq URL'}
                        initialValues={initialFormValues}
                        handleClose={this.handleCloseChooseTagsForm}
                        handleSubmit={this.handleFormSubmit}
                        open={chooseTagsFormOpen}
                        optionsFlag={'seeq'}/>
                </>
            </Widget>
        );
    }
}


Seeq.propTypes = {
    url: PropTypes.string.isRequired,
};

const mapDispatchedToProps = dispatch => {
    return {
        onSeeqChange: (seeq) => dispatch(seeqChange(seeq)),
    };
};

export default withRouter(connect(null, mapDispatchedToProps)(Seeq));
