import ReactSpeedometer from "react-d3-speedometer";
import {ResponsiveContainer} from "recharts";
import React from "react";
import PropTypes from 'prop-types';

const Speedometer = ({value}) => {
    const customSegmentLabel1 = {
        text: 'LL',
        position: "OUTSIDE",
        color: "#555",
    };
    const customSegmentLabel2 = {
        ...customSegmentLabel1,
        text: 'L',
    };
    const customSegmentLabel3 = {
        ...customSegmentLabel1,
        text: 'H',
    };
    const customSegmentLabel4 = {
        ...customSegmentLabel1,
        text: 'HH',
    };

    const customSegmentLabels = [customSegmentLabel1, customSegmentLabel2, customSegmentLabel3, customSegmentLabel4];

    return (
        <ResponsiveContainer width="100%">
            <div className="d-flex justify-content-center" style={{width: "100%", height: "150px"}}>
                <ReactSpeedometer
                    value={value}
                    segments={4}
                    customSegmentLabels={customSegmentLabels}
                    minValue={0}
                    maxValue={100}
                    fluidWidth
                    needleHeightRatio={0.4}
                    ringWidth={40}
                    needleTransitionDuration={4000}
                    needleTransition="easeElastic"/>
            </div>
        </ResponsiveContainer>
    );
};

Speedometer.propTypes = {
    value: PropTypes.number,
};

export default Speedometer;