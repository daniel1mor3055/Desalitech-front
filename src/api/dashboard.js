import axios from 'axios';
import {camelizeJson, capitalizeJson} from './utils';
import moment from "moment";

const TRIGGER = 'Trigger';
const TAG = 'Tag';
const TIME_SERIES = 'Time Series';
const GAUGE = 'Gauge';
const MIDDLE_GAUGE = 'MiddleGauge';
const RIGHT_GAUGE = 'RightGauge';
const LEFT_GAUGE = 'LeftGauge';
const SEEQ = 'Seeq';
const DATE_FORMAT = 'DD-MM HH:mm';

export const fetchDashboardApi = async (systemId) => {
    try {
        const response = await axios.get(`/system/dashboard?SysId=${systemId}`);
        camelizeJson(response.data);
        const {admin, widgets} = response.data;
        const {triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs} = getWidgetsByType(widgets);
        console.log({triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs});
        return {admin, triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs};
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const setDatesApi = async (timeSeries, sysId) => {
    const dataToPost = manipulateTimeSeries(timeSeries, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard', dataToPost);
        camelizeJson(response.data);
        const {admin, widgets} = response.data;
        const responseTimeSeries = extractTimeSeries(widgets[0]);
        return {admin, responseTimeSeries};
    } catch (err) {
        console.log(err);
        throw err;
    }
};

function manipulateTimeSeries(timeSeries, sysId) {
    const {startDate, endDate, tags, placement} = timeSeries;
    let backTags = tags.map((tag) => (tag.tagId));

    for (let i = tags.length; i < 3; i++) {
        backTags.push('');
    }

    return {
        sysId,
        tag1: backTags[0],
        tag2: backTags[1],
        tag3: backTags[2],
        detail1: '',
        detail2: '',
        detail3: '',
        detail4: '',
        widgetType: 'Time Series',
        placement,
        header: '',
        calculation: '',
        startDate: startDate.utc().format('X'),
        endDate: endDate.utc().format('X'),
    };
}

function getWidgetsByType(widgets) {
    let triggers = [];
    let tags = [];
    let gauges = [];
    let timeSeries = [];
    let middleGauges = [];
    let rightGauges = [];
    let leftGauges = [];
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
            case LEFT_GAUGE:
                leftGauges.push(extractRelevantData(widgets[i], GAUGE));
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
        leftGauges,
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
    const {placement, extraData} = widget;
    return {
        placement: placement,
        url: extraData,
    };
}

function extractGauge(widget) {
    const {gaugeData, tags, placement} = widget;
    const {lL, l, h, hH} = gaugeData;

    const newTags = tags.map((tag, index) => {
        return {
            tagId: tag[`tag${index + 1}`],
            tagName: tag[`tag${index + 1}Name`],
            tagValue: tag[`tag${index + 1}Value`],
            tagUnits: tag[`tag${index + 1}Units`],
        };
    }).filter(tag => (!((tag.tagId === "") || (tag.tagId === null))));

    return {
        tags: newTags,
        placement,
        lL,
        l,
        h,
        hH,
    };
}

function extractTrigger(widget) {
    const {tags, placement} = widget;

    const {tag1, tag1Name, tag1Value, tag1Units} = tags[0];
    const {tag2, tag2Name, tag2Value, tag2Units} = tags[1];
    return {
        placement,
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
        },
    };
}

function extractTimeSeries(widget) {
    const {placement, startDate, endDate, tags, influxData} = widget;

    const newTags = tags.map((tag, index) => {
        return {
            tagId: tag[`tag${index + 1}`],
            tagName: tag[`tag${index + 1}Name`],
            tagValue: tag[`tag${index + 1}Value`],
            tagUnits: tag[`tag${index + 1}Units`],
            tagTimeValues: [],
        };
    }).filter(tag => (!((tag.tagId === "") || (tag.tagId === null))));

    const times = [];
    for (let i = 0; i < influxData.length; i++) {
        times.push(moment.utc(influxData[i].time).local().format(DATE_FORMAT));
        for (let j = 0; j < newTags.length; j++) {
            newTags[j].tagTimeValues.push(influxData[i][`tag${j + 1}`]);
        }
    }

    newTags.forEach(tag => {
        interpolateData(tag.tagTimeValues);
    });


    return {
        tags: newTags,
        placement,
        times,
        startDate: moment.utc(moment.unix(startDate)).local(), // Dates are being saved as moment object local time
        endDate: moment.utc(moment.unix(endDate)).local(), // Dates are being saved as moment object local time
    };
}

function extractTag(widget) {
    const {tags} = widget;
    const {tag1, tag1Name, tag1Value, tag1Units} = tags[0];

    return {
        tagId: tag1,
        tagName: tag1Name,
        tagValue: tag1Value,
        tagUnits: tag1Units,
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