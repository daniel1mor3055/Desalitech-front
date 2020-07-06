import ReactSpeedometer from 'react-d3-speedometer';
import React, {Component} from "react";
import {ResponsiveContainer} from 'recharts';
import PropTypes from "prop-types";
import * as Yup from 'yup';
import {withRouter} from "react-router";
import {connect} from "react-redux";

import Widget from "app/components/Widget";
import {gaugeChange, gaugeDelete} from 'store/thunk/dashboard';
import FormGauge from "../FormGauge";
import FormDelete from "../FormDelete";

class Gauge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editFormOpen: false,
            deleteFormOpen: false,
            lL: null,
            l: null,
            h: null,
            hH: null,
            shouldForceRender: false,
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
        const {lL, l, h, hH, measuredTag} = values;
        const {gaugeType, gaugeData: {placement}, tagList} = this.props;
        const newLl = tagList.find(o => o.tagName === lL);
        const newL = tagList.find(o => o.tagName === l);
        const newH = tagList.find(o => o.tagName === h);
        const newHh = tagList.find(o => o.tagName === hH);
        const gauge = {
            measuredTag: tagList.find(o => o.tagName === measuredTag).tagId,
            placement,
            lL: newLl == null ? lL : newLl.tagId,
            l: newL == null ? l : newL.tagId,
            h: newH == null ? h : newH.tagId,
            hH: newHh == null ? hH : newHh.tagId,
        };

        this.props.onGaugeChange(gaugeType, gauge);
    };

    getFormInitialValues = (gaugeData) => {
        const {lL, l, h, hH, tags} = gaugeData;
        const initialValues = {
            measuredTag: tags[0].tagName,
            lLFromOptionsCheckBox: !(lL.tagName == null || lL.tagName === ''),
            lLFromOptions: lL.tagName == null || lL.tagName === '' ? '' : lL.tagName,
            lL: lL.tagName == null || lL.tagName === '' ? lL.value : '',
            lFromOptionsCheckBox: !(l.tagName == null || l.tagName === ''),
            lFromOptions: l.tagName == null || l.tagName === '' ? '' : l.tagName,
            l: l.tagName == null || l.tagName === '' ? l.value : '',
            hFromOptionsCheckBox: !(h.tagName == null || h.tagName === ''),
            hFromOptions: h.tagName == null || h.tagName === '' ? '' : h.tagName,
            h: h.tagName == null || h.tagName === '' ? h.value : '',
            hHFromOptionsCheckBox: !(hH.tagName == null || hH.tagName === ''),
            hHFromOptions: hH.tagName == null || hH.tagName === '' ? '' : hH.tagName,
            hH: hH.tagName == null || hH.tagName === '' ? hH.value : '',
        };
        return initialValues;
    };

    handleOpenDeleteForm = () => {
        this.setState({deleteFormOpen: true});
    };

    handleDeleteWidget = () => {
        const {gaugeData: {lL, l, h, hH, tags, placement}, gaugeType} = this.props;

        const gauge = {
            measuredTag: tags[0].tagId,
            placement,
            lL: lL.tagId == null || lL.tagId === '' ? lL.value : lL.tagId,
            l: l.tagId == null || l.tagId === '' ? l.value : l.tagId,
            h: h.tagId == null || h.tagId === '' ? h.value : h.tagId,
            hH: hH.tagId == null || hH.tagId === '' ? hH.value : hH.tagId,
        };

        this.props.onGaugeDelete(gaugeType, gauge);
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
        const {editFormOpen, deleteFormOpen, lL, l, h, hH, shouldForceRender} = this.state;
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
                    onEditClick={this.handleOpenEditForm}
                    onDeleteClick={this.handleOpenDeleteForm}>
                <ResponsiveContainer width="100%">
                    <div className="d-flex justify-content-center" style={{width: "100%", height: "150px"}}>
                        <ReactSpeedometer
                            forceRender={shouldForceRender}
                            needleHeightRatio={0.7}
                            needleTransitionDuration={3000}
                            maxSegmentLabels={3}
                            minValue={+lL.value}
                            maxValue={+hH.value}
                            segments={3}
                            ringWidth={40}
                            needleTransition="easeElastic"
                            customSegmentStops={[+lL.value, +l.value, +h.value, +hH.value]}
                            segmentColors={segmentColorsOptions[gaugeType]}
                            value={tagValue}
                            textColor={"#AAA"}
                            currentValueText={`${tagValue} ${tagUnits}`}
                            valueFormat={'.2f'}
                        />
                    </div>
                </ResponsiveContainer>
                <>
                    <FormDelete
                        handleClose={this.handleCloseForm}
                        handleSubmit={this.handleDeleteWidget}
                        open={deleteFormOpen}
                    />
                    <FormGauge
                        initialValues={initialFormValues}
                        handleClose={this.handleCloseForm}
                        handleSubmit={this.handleFormSubmit}
                        open={editFormOpen}/>
                </>
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
        onGaugeDelete: (gaugeType, gauge) => dispatch(gaugeDelete(gaugeType, gauge)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchedToProps)(Gauge));
