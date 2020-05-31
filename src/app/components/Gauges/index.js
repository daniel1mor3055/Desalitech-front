import ReactSpeedometer from 'react-d3-speedometer';
import React, {Component} from "react";
import {ResponsiveContainer} from 'recharts';
import PropTypes from "prop-types";

class Gauge extends Component {

    render() {
        const {gaugeType, gaugeData} = this.props;
        const {lL, l, h, hH, tags} = gaugeData;
        let {tagId, tagName, tagValue, tagUnits} = tags[0];
        let displayValue = tagValue;
        const gaugeTitle = (tagName !== '' && tagName != null) ? tagName : tagId;
        const textColor = "#AAA";
        let llValue = lL.value;
        let lValue = l.value;
        let hValue = h.value;
        let hhValue = hH.value;
        let valueFormat = '.2f';
        let segmentColors = null;
        switch (gaugeType) {
            case 'MIDDLE': {
                segmentColors = ["firebrick", "limegreen", "firebrick"];
                break;
            }
            case 'LEFT': {
                segmentColors = ["firebrick", "gold", "limegreen"];
                break;
            }
            case 'RIGHT': {
                segmentColors = ["limegreen", "gold", "firebrick"];
                llValue = hH.value;
                lValue = h.value;
                hValue = l.value;
                hhValue = lL.value;
                break;
            }
        }
        return (

            <ResponsiveContainer width="100%">
                <div className="col-xl-3 col-md-4 col-sm-6 col-12 order-xl-4">
                    <div className="jr-card">
                        <div className="jr-card-header">
                            <h3 className="card-heading">{gaugeTitle}</h3>
                        </div>
                        <div className="d-flex justify-content-center" style={{width: "100%", height: "150px"}}>
                            <ReactSpeedometer
                                needleHeightRatio={0.7}
                                needleTransitionDuration={3000}
                                maxSegmentLabels={3}
                                minValue={llValue}
                                maxValue={hhValue}
                                segments={3}
                                ringWidth={40}
                                needleTransition="easeElastic"
                                customSegmentStops={[llValue, lValue, hValue, hhValue]}
                                segmentColors={segmentColors}
                                value={displayValue}
                                textColor={textColor}
                                currentValueText={`${tagValue} ${tagUnits}`}
                                valueFormat={valueFormat}
                            />
                        </div>
                    </div>
                </div>
            </ResponsiveContainer>
        );
    }
};

Gauge.propTypes = {
    gaugeType: PropTypes.string.isRequired,
    gaugeData: PropTypes.object.isRequired,
};

export default Gauge;