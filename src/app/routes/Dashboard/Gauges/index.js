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
            lL: '',
            l: '',
            h: '',
            hH: '',
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
            lL: lL.value,
            l: l.value,
            h: h.value,
            hH: hH.value,
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
        const numericValues = [];
        for (let property in values) {
            if (values.hasOwnProperty(property)) {
                if (!isNaN(values[property])) {
                    numericValues.push(+values[property]);
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
            return {global: "Make sure LL Value < L Value < H Value < HH Value or Tags"};
        }
        return null;
    };

    static getDerivedStateFromProps = (props, state) => {
        const {gaugeData: {lL, l, h, hH}} = props;

        return {
            ...state,
            lL,
            l,
            h,
            hH,
            shouldForceRender: (lL !== state.lL || l !== state.l || h !== state.h || hH !== state.hH),
        };
    };

    render() {
        const {chooseTagsFormOpen, lL, l, h, hH, shouldForceRender} = this.state;
        const {gaugeType, gaugeData} = this.props;
        const {tags} = gaugeData;

        const {tagId, tagName, tagValue, tagUnits} = tags[0];
        const gaugeTitle = (tagName !== '' && tagName != null) ? tagName : tagId;

        const segmentColorsOptions = {
            'MIDDLE': ["firebrick", "limegreen", "firebrick"],
            'LEFT': ["firebrick", "gold", "limegreen"],
            'RIGHT': ["limegreen", "gold", "firebrick"],
        };

        const initialFormValues = this.getFormInitialValues(gaugeData);

        return (
            <Widget heading={gaugeTitle} cardStyle={'col-xl-3 col-md-4 col-sm-6 col-12 order-xl-4'}
                    onClick={this.handleOpenChooseTagsForm}>
                <ResponsiveContainer width="100%">
                    <div className="d-flex justify-content-center" style={{width: "100%", height: "150px"}}>
                        <ReactSpeedometer
                            forceRender={shouldForceRender}
                            needleHeightRatio={0.7}
                            needleTransitionDuration={3000}
                            maxSegmentLabels={3}
                            minValue={gaugeType === 'RIGHT' ? hH.value : lL.value}
                            maxValue={gaugeType === 'RIGHT' ? lL.value : hH.value}
                            segments={3}
                            ringWidth={40}
                            needleTransition="easeElastic"
                            customSegmentStops={gaugeType === 'RIGHT' ? [hH.value, h.value, l.value, lL.value] : [lL.value, l.value, h.value, hH.value]}
                            segmentColors={segmentColorsOptions[gaugeType]}
                            value={tagValue}
                            textColor={"#AAA"}
                            currentValueText={`${tagValue} ${tagUnits}`}
                            valueFormat={'.2f'}
                        />
                    </div>
                </ResponsiveContainer>
                <ChooseTagsForm
                    formTitle={'Choose gauge settings'}
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


const mapDispatchedToProps = dispatch => {
    return {
        onGaugeChange: (gaugeType, gauge) => dispatch(gaugeChange(gaugeType, gauge)),
    };
};

export default withRouter(connect(null, mapDispatchedToProps)(Gauge));