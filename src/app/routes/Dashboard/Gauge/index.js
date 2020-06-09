import ReactSpeedometer from 'react-d3-speedometer';
import React, {Component} from "react";
import {ResponsiveContainer} from 'recharts';
import PropTypes from "prop-types";
import * as Yup from 'yup';
import {withRouter} from "react-router";
import {connect} from "react-redux";

import Widget from "app/components/Widget";
import ChooseTagsForm from "app/routes/Dashboard/ChooseTagsForm";
import {gaugeChange} from 'store/thunk/dashboard';

class Gauge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chooseTagsFormOpen: false,
            lL: null,
            l: null,
            h: null,
            hH: null,
            shouldForceRender: false,
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
        const {lL, l, h, hH, measuredTag} = values;
        const {gaugeType, gaugeData: {placement}} = this.props;

        const gauge = {
            measuredTag,
            placement,
            lL,
            l,
            h,
            hH
        };

        this.props.onGaugeChange(gaugeType, gauge);
    };

    getFormInitialValues = (gaugeData) => {
        const {lL, l, h, hH, tags} = gaugeData;
        const initialValues = {
            measuredTag: tags[0].tagId,
            lL: lL.tagId == null || lL.tagId === '' ? lL.value : lL.tagId,
            l: l.tagId == null || l.tagId === '' ? l.value : l.tagId,
            h: h.tagId == null || h.tagId === '' ? h.value : h.tagId,
            hH: hH.tagId == null || hH.tagId === '' ? hH.value : hH.tagId,
        };
        return initialValues;
    };

    getFormValidationSchemaObject = () => {
        const validationSchema = {
            measuredTag: Yup.string().required('Please select tag to measure'),
            lL: Yup.string().required('Please select LL Value or Tag'),
            l: Yup.string().required('Please select L Value or Tag'),
            h: Yup.string().required('Please select H Value or Tag'),
            hH: Yup.string().required('Please select HH Value or Tag'),
        };
        return validationSchema;
    };

    verifyFormValues = (values) => {
        const {tagList} = this.props;
        const numericValues = [];
        for (let property in values) {
            if (values.hasOwnProperty(property)) {
                if (!isNaN(values[property])) {
                    numericValues.push(+values[property]);
                } else {
                    if (!tagList.some(tag => tag.tagId.toLowerCase() === values[property].toLowerCase())) {
                        return {global: "Make sure you provide valid tags"};
                    }
                }
            }
        }

        let correctOrder = true;
        for (let i = 0; i < numericValues.length - 1; i++) {
            if (numericValues[i] > numericValues[i + 1]) {
                correctOrder = false;
                break;
            }
        }

        if (!correctOrder) {
            return {global: "Make sure that LL Value < L Value < H Value < HH Value"};
        }
        return null;
    };

    static getDerivedStateFromProps = (props, state) => {
        const {gaugeData: {lL, l, h, hH}} = props;
        return {
            ...state,
            lL: lL,
            l: l,
            h: h,
            hH: hH,
            shouldForceRender: state.lL == null ||
                (lL.value !== state.lL.value || l.value !== state.l.value ||
                    h.value !== state.h.value || hH.value !== state.hH.value),
        };
    };

    render() {
        const {chooseTagsFormOpen, lL, l, h, hH, shouldForceRender} = this.state;
        const {gaugeType, gaugeData} = this.props;
        const {tags} = gaugeData;

        const {tagId, tagName, tagValue, tagUnits} = tags[0];
        const gaugeTitle = (tagName !== '' && tagName != null) ? tagName : tagId;

        const segmentColorsOptions = {
            MIDDLE: ["firebrick", "limegreen", "firebrick"],
            LEFT: ["firebrick", "gold", "limegreen"],
            RIGHT: ["limegreen", "gold", "firebrick"],
        };

        const initialFormValues = this.getFormInitialValues(gaugeData);

        return (
            <Widget heading={gaugeTitle}
                    onClick={this.handleOpenChooseTagsForm}>
                <ResponsiveContainer width="100%">
                    <div className="d-flex justify-content-center" style={{width: "100%", height: "150px"}}>
                        <ReactSpeedometer
                            forceRender={shouldForceRender}
                            needleHeightRatio={0.7}
                            needleTransitionDuration={3000}
                            maxSegmentLabels={3}
                            minValue={gaugeType === 'RIGHT' ? +hH.value : +lL.value}
                            maxValue={gaugeType === 'RIGHT' ? +lL.value : +hH.value}
                            segments={3}
                            ringWidth={40}
                            needleTransition="easeElastic"
                            customSegmentStops={gaugeType === 'RIGHT' ?
                                [+hH.value, +h.value, +l.value, +lL.value] : [+lL.value, +l.value, +h.value, +hH.value]}
                            segmentColors={segmentColorsOptions[gaugeType]}
                            value={tagValue}
                            textColor={"#AAA"}
                            currentValueText={`${tagValue} ${tagUnits}`}
                            valueFormat={'.2f'}
                        />
                    </div>
                </ResponsiveContainer>
                <ChooseTagsForm
                    formTitle={'Choose gauge settings - numerical values or tag IDs'}
                    verifyValues={this.verifyFormValues}
                    validationSchemaObject={this.getFormValidationSchemaObject(initialFormValues)}
                    labels={['Tag ID', 'LL Value', 'L Value', 'H Value', 'HH Value']}
                    initialValues={initialFormValues}
                    handleClose={this.handleCloseChooseTagsForm}
                    handleSubmit={this.handleFormSubmit}
                    open={chooseTagsFormOpen}/>
            </Widget>
        );
    }
}

Gauge.propTypes = {
    gaugeType: PropTypes.string.isRequired,
    gaugeData: PropTypes.object.isRequired,
};


const mapStateToProps = ({tags}) => {
    return {
        tagList: tags.tags,
    };
};

const mapDispatchedToProps = dispatch => {
    return {
        onGaugeChange: (gaugeType, gauge) => dispatch(gaugeChange(gaugeType, gauge)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(Gauge));
