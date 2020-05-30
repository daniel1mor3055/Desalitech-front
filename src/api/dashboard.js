import axios from 'axios';
import {camelizeArrayOfObjects, camelizeObjectKeys} from './utils';

const TRIGGER = 'Trigger';
const TAG = 'Tag';
const TIME_SERIES = 'Time Series';
const GAUGE = 'Gauge';
const MIDDLE_GAUGE = 'MiddleGauge';
const RIGHT_GAUGE = 'RightGauge';
const SEEQ = 'Seeq';

export const fetchDashboardApi = async (systemId) => {
    try {
        const response = await axios.get(`/system/dashboard?SysId=${systemId}`);
        console.log(response)
        camelizeObjectKeys(response.data);
        camelizeArrayOfObjects(response.data.widgets);
        const {admin, widgets} = response.data;
        const {triggers, tags, gauges, timeSeries, middleGauges, rightGauges, seeqs} = getWidgetsByType(widgets);
        console.log("widgets are:");
        console.log({triggers, tags, gauges, timeSeries, middleGauges, rightGauges, seeqs});
        return {admin, triggers, tags, gauges, timeSeries, middleGauges, rightGauges, seeqs};
    } catch (err) {
        console.log(err);
        throw err;
    }
};


function getWidgetsByType(widgets) {
    let triggers = [];
    let tags = [];
    let gauges = [];
    let timeSeries = [];
    let middleGauges = [];
    let rightGauges = [];
    let seeqs = [];
    for (let i = 0; i < widgets.length; i++) {
        const {widgetType} = widgets[i];
        switch (widgetType) {
            case TRIGGER:
                triggers.push(extractRelevantData(widgets[i], TRIGGER));
                break;
            case TAG:
                tags.push(extractRelevantData(widgets[i], TAG));
                break;
            case TIME_SERIES:
                timeSeries.push(extractRelevantData(widgets[i], TIME_SERIES));
                break;
            case GAUGE:
                gauges.push(extractRelevantData(widgets[i], GAUGE));
                break;
            case MIDDLE_GAUGE:
                middleGauges.push(extractRelevantData(widgets[i], GAUGE));
                break;
            case RIGHT_GAUGE:
                rightGauges.push(extractRelevantData(widgets[i], GAUGE));
                break;
            case SEEQ:
                seeqs.push(extractRelevantData(widgets[i], SEEQ));
                break;
            default:
                console.log("WE ARE IN DEFAULT DASHBOARD API FILE, WRONG");
        }
    }
    return {
        triggers,
        tags,
        gauges,
        timeSeries,
        middleGauges,
        rightGauges,
        seeqs,
    };
}

function extractRelevantData(widget, widgetType) {
    switch (widgetType) {
        case TRIGGER:
            return extractTrigger(widget);
        case TAG:
            return extractTag(widget);
        case TIME_SERIES:
            return extractTimeSeries(widget);
        case GAUGE:
            return extractGauge(widget);
        case SEEQ:
            return extractSeeq(widget);
        default:
            return "NO CHANGE WE GOT HERE";
    }
}


function extractSeeq(widget) {
    const {detail1} = widget;
    return {
        url: detail1,
    };
}

function extractGauge(widget) {
    const {
        tag1, tag1Name, tag1Value, tag1Units, tag2, tag2Name, tag2Value, tag2Units, tag3, tag3Name, tag3Value,
        tag3Units, lLName, lLUnits, lLValue, lName, lUnits, lValue, hName, hUnits, hValue, hHName, hHUnits, hHValue,
    } = widget;

    let tags = [
        {
            tagId: tag1,
            tagName: tag1Name,
            tagValue: tag1Value,
            tagUnits: tag1Units,
        }, {
            tagId: tag2,
            tagName: tag2Name,
            tagValue: tag2Value,
            tagUnits: tag2Units,
        }, {
            tagId: tag3,
            tagName: tag3Name,
            tagValue: tag3Value,
            tagUnits: tag3Units,
        },
    ];
    tags = tags.filter(tag => (!((tag.tagId === "") || (tag.tagId === null))));

    const lL = {
        name: lLName,
        units: lLUnits,
        value: lLValue,
    };
    const l = {
        name: lName,
        units: lUnits,
        value: lValue,
    };
    const h = {
        name: hName,
        units: hUnits,
        value: hValue,
    };
    const hH = {
        name: hHName,
        units: hHUnits,
        value: hHValue,
    };

    return {
        tags,
        lL,
        l,
        h,
        hH,
    };
}

function extractTrigger(widget) {
    const {tag1, tag1Name, tag1Value, tag1Units, tag2, tag2Name, tag2Value, tag2Units} = widget;
    return {
        tag: {
            tagId: tag1,
            tagName: tag1Name,
            tagValue: tag1Value,
            tagUnits: tag1Units,
        },
        controllerTag: {
            tagId: tag2,
            tagName: tag2Name,
            tagValue: tag2Value,
            tagUnits: tag2Units,
        }
    };
}

function extractTimeSeries(widget) {
    const {
        tag1, tag1Name, tag1Value, tag1Units, tag2, tag2Name, tag2Value, tag2Units,
        tag3, tag3Name, tag3Value, tag3Units, startDate, endDate, influxData
    } = widget;
    camelizeArrayOfObjects(influxData);

    let tags = [
        {
            tagId: tag1,
            tagName: tag1Name,
            tagValue: tag1Value,
            tagUnits: tag1Units,
            tagTimeValues: [],
        }, {
            tagId: tag2,
            tagName: tag2Name,
            tagValue: tag2Value,
            tagUnits: tag2Units,
            tagTimeValues: [],
        }, {
            tagId: tag3,
            tagName: tag3Name,
            tagValue: tag3Value,
            tagUnits: tag3Units,
            tagTimeValues: [],
        },
    ];
    tags = tags.filter(tag => (!((tag.tagId === "") || (tag.tagId === null))));

    const times = [];
    for (let i = 0; i < influxData.length; i++) {
        times.push(influxData[i].time);
        for (let j = 0; j < tags.length; j++) {
            tags[j].tagTimeValues.push(influxData[i][`tag${j + 1}`]);
        }
    }

    tags.forEach(tag => {
        interpolateData(tag.tagTimeValues);
    });

    return {
        tags,
        times,
        startDate,
        endDate,
    };
}

function extractTag(widget) {
    const {tag1, tag1Name, tag1Value, tag1Units} = widget;

    return {
        tag: {
            tagId: tag1,
            tagName: tag1Name,
            tagValue: tag1Value,
            tagUnits: tag1Units,
        }
    };
}


function interpolateData(array) {
    const arrayAfterNullsRemove = removeNulls(array);
    const interpolatedArray = interpolateArray(arrayAfterNullsRemove, array.length);
    for (let i = 0; i < array.length; i++) {
        array[i] = interpolatedArray[i];
    }
}

function removeNulls(array) {
    return array.filter(elem => elem !== null);
}

function interpolateArray(data, fitCount) {
    const linearInterpolate = function (before, after, atPoint) {
        return before + (after - before) * atPoint;
    };

    const newData = [];
    const springFactor = Number((data.length - 1) / (fitCount - 1));
    newData[0] = data[0]; // for new allocation
    for (let i = 1; i < fitCount - 1; i++) {
        const tmp = i * springFactor;
        const before = Number(Math.floor(tmp)).toFixed();
        const after = Number(Math.ceil(tmp)).toFixed();
        const atPoint = tmp - before;
        newData[i] = linearInterpolate(data[before], data[after], atPoint);
    }
    newData[fitCount - 1] = data[data.length - 1]; // for new allocation
    return newData;
}