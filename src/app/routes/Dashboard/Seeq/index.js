import React, { Component } from "react";
import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { seeqChange, seeqDelete } from 'store/thunk/dashboard';
import Widget from "app/components/Widget";
import './index.scss';
import FormSeeq from "../FormSeeq";
import FormDelete from "../FormDelete";

class Seeq extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editFormOpen: false,
            deleteFormOpen: false,
        };
    }

    handleOpenEditForm = (event) => {
        event.preventDefault();
        this.setState({ editFormOpen: true });
    };

    handleCloseForm = () => {
        this.setState({
            editFormOpen: false,
            deleteFormOpen: false,
        });
    };

    handleFormSubmit = (values) => {
        const { url } = values;
        const { placement } = this.props;

        const seeq = {
            url,
            placement
        };
        this.props.onSeeqChange(seeq);
    };

    getFormInitialValues = (url) => {
        return {
            url,
        };
    };

    handleOpenDeleteForm = () => {
        this.setState({ deleteFormOpen: true });
    };

    handleDeleteWidget = () => {
        const { url, placement } = this.props;
        const seeq = {
            url,
            placement,
        };
        this.props.onSeeqDelete(seeq);
    };

    render() {
        const { editFormOpen, deleteFormOpen } = this.state;
        const { url } = this.props;
        const initialFormValues = this.getFormInitialValues(url);

        return (
            <Widget heading={'Seeq'} onDeleteClick={this.handleOpenDeleteForm} onEditClick={this.handleOpenEditForm}
                    cardName='Seeq'>
                <>
                    <iframe
                        className='Seeq-iframe'
                        src={url}
                        title="SEEQ data">
                    </iframe>
                    <FormSeeq
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

Seeq.propTypes = {
    url: PropTypes.string.isRequired,
};

const mapDispatchedToProps = dispatch => {
    return {
        onSeeqChange: (seeq) => dispatch(seeqChange(seeq)),
        onSeeqDelete: (seeq) => dispatch(seeqDelete(seeq)),
    };
};

export default withRouter(connect(null, mapDispatchedToProps)(Seeq));
