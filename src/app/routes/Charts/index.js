import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';

import 'react-dates/initialize';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-dates/lib/css/_datepicker.css';
import { fetchBackgroundTags, timeSeriesAdd, timeSeriesChange, timeSeriesDelete } from 'store/thunk/charts';
import TimeSeries from '../Dashboard/TimeSeries';
import IconButton from "@material-ui/core/IconButton";
import FormTimeSeries from "../Dashboard/FormTimeSeries";

class Charts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addTimeSeriesFormOpen: false,
        };
    }

    componentDidMount() {
        this.props.onFetchBackgroundTags();
    }


    handleOpenAddTimeSeriesForm = (event) => {
        event.preventDefault();
        this.setState({ addTimeSeriesFormOpen: true });
    };

    handleCloseAddTimeSeriesForm = () => {
        this.setState({ addTimeSeriesFormOpen: false });
    };

    handleAddTimeSeriesFormSubmit = (values) => {
        const { currentPlacement, tagsList } = this.props;
        const tags = Object.keys(values).map((key) => {
            const newTag = tagsList.find(o => o.tagName === values[key]);
            return {
                tagId: newTag == null ? '' : newTag.tagId,
            };
        });

        const timeSeries = {
            startDate: moment().subtract(1, 'days'),
            endDate: moment(),
            placement: currentPlacement,
            tags,
        };
        this.props.onTimeSeriesAdd(timeSeries);
    };

    getAddTimeSeriesFormInitialValues = () => {
        return {
            tag1Name: '',
            tag2Name: '',
            tag3Name: '',
        };
    };

    render() {
        const { addTimeSeriesFormOpen } = this.state;
        const { timeSeries, error, tagsList } = this.props;

        if (error) {
            throw new Error('Error in charts');
        }

        return (
            <div className="Charts app-wrapper">
                <div className="add-charts-option">
                    <IconButton onClick={this.handleOpenAddTimeSeriesForm}>
                        <i className="zmdi zmdi-plus-circle-o text-white"/>
                    </IconButton>
                </div>
                <FormTimeSeries
                    initialValues={this.getAddTimeSeriesFormInitialValues()}
                    handleClose={this.handleCloseAddTimeSeriesForm}
                    handleSubmit={this.handleAddTimeSeriesFormSubmit}
                    open={addTimeSeriesFormOpen}/>

                {<>
                    <div className="animated slideInUpTiny animation-duration-3">
                        {timeSeries.map((timeSeries) => {
                            const { startDate, endDate, times, tags, placement } = timeSeries;
                            const tagsToDisplay = tags.map((tag) => {
                                const newTag = tagsList.find(o => o.tagId === tag.tagId);
                                return {
                                    ...tag,
                                    tagUnits: newTag.units,
                                    tagName: newTag.tagName,
                                };
                            });

                            return (
                                <TimeSeries
                                    onTimeSeriesChange={this.props.onTimeSeriesChange}
                                    onTimeSeriesDelete={this.props.onTimeSeriesDelete}
                                    startDate={startDate}
                                    endDate={endDate}
                                    tags={tagsToDisplay}
                                    times={times}
                                    placement={placement}
                                    key={placement}/>);
                        })}
                    </div>
                </>}
            </div>
        );
    }
}


const mapStateToProps = ({ charts, tags }) => {
    return {
        tagsList: tags.tags,
        timeSeries: charts.timeSeries,
        error: charts.error,
        currentPlacement: charts.currentPlacement,
    };
};


const mapDispatchedToProps = dispatch => {
    return {
        onFetchBackgroundTags: () => dispatch(fetchBackgroundTags()),
        onTimeSeriesChange: (timeSeries) => dispatch(timeSeriesChange(timeSeries)),
        onTimeSeriesAdd: (timeSeries) => dispatch(timeSeriesAdd(timeSeries)),
        onTimeSeriesDelete: (timeSeries) => dispatch(timeSeriesDelete(timeSeries)),
    };
};


export default connect(mapStateToProps, mapDispatchedToProps)(Charts);