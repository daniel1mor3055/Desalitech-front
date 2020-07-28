import React, { Component } from "react";
import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import TitleCard from "app/components/TitleCard";
import { tagChange, tagDelete } from 'store/thunk/dashboard';
import Widget from "app/components/Widget";
import './index.scss';
import FormTag from "../FormTag";
import FormDelete from "../FormDelete";

class Tag extends Component {
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

    handleFormSubmit = async (values) => {
        const { tagName } = values;
        const { placement, tagsList } = this.props;

        const tag = {
            tagId: tagsList.find(o => o.tagName === tagName).tagId,
            placement,
        };
        await this.props.onTagChange(tag);
        const { postingError } = this.props;
        if (postingError) {
            throw new Error(postingError);
        }
    };

    getFormInitialValues = (tagName) => {
        const initialValues = {
            tagName,
        };
        return initialValues;
    };

    handleOpenDeleteForm = () => {
        this.setState({ deleteFormOpen: true });
    };

    handleDeleteWidget = async () => {
        const { tagId, placement } = this.props;

        const tag = {
            tagId,
            placement,
        };
        await this.props.onTagDelete(tag);

        const { postingError } = this.props;
        if (postingError) {
            throw new Error(postingError);
        }
    };

    render() {
        const { editFormOpen, deleteFormOpen } = this.state;
        const { tagId, tagName, tagValue, tagUnits } = this.props;
        const initialFormValues = this.getFormInitialValues(tagName);

        return (
            <Widget onEditClick={this.handleOpenEditForm} onDeleteClick={this.handleOpenDeleteForm}
                    cardName='Tag-widget'>
                <>
                    <TitleCard
                        tagName={(tagName !== '' && tagName != null) ? tagName : tagId}
                        tagValue={tagValue === undefined || tagValue === null ? '' : tagValue}
                        tagUnits={tagUnits == null ? '' : tagUnits}
                    />
                    <FormTag
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


Tag.propTypes = {
    tagId: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    tagValue: PropTypes.number,
    tagUnits: PropTypes.string,
    placement: PropTypes.number.isRequired,
};

const mapStateToProps = ({ tags, dashboard }) => {
    return {
        tagsList: tags.tags,
        postingError: dashboard.postingError,
    };
};

const mapDispatchedToProps = dispatch => {
    return {
        onTagChange: (tag) => dispatch(tagChange(tag)),
        onTagDelete: (tag) => dispatch(tagDelete(tag)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(Tag));
