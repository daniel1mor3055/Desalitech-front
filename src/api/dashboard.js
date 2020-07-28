import axios from 'axios';
import moment from "moment";
import { camelizeJson, capitalizeJson, extractSystemId } from './utils';
import ar from '@amcharts/amcharts4/lang/ar';

const TRIGGER = 'Trigger';
const TAG = 'Tag';
const TIME_SERIES = 'Time Series';
const GAUGE = 'Gauge';
const MIDDLE_GAUGE = 'MiddleGauge';
const RIGHT_GAUGE = 'RightGauge';
const LEFT_GAUGE = 'LeftGauge';
const SEEQ = 'Seeq';
const DATE_FORMAT = 'DD-MM HH:mm';

export const fetchDashboardApi = async () => {
    const sysId = extractSystemId();
    try {
        const response = await axios.get(`/system/dashboard?SysId=${sysId}`);
        console.log(response);
        camelizeJson(response.data);
        const { admin, widgets } = response.data;
        const { triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs } = getWidgetsByType(widgets);
        const currentPlacement = calcCurrentPlacement(triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs);
        return {
            admin,
            triggers,
            tags,
            gauges,
            timeSeries,
            middleGauges,
            rightGauges,
            leftGauges,
            seeqs,
            currentPlacement
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
};


export const timeSeriesAddApi = async (timeSeries) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateTimeSeries(timeSeries, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard/add-widget', dataToPost);
        camelizeJson(response.data);
        const { admin, widgets } = response.data;
        const responseTimeSeries = extractTimeSeries(widgets[0]);
        return { admin, responseTimeSeries };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const timeSeriesChangeApi = async (timeSeries) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateTimeSeries(timeSeries, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard', dataToPost);
        camelizeJson(response.data);
        const { admin, widgets } = response.data;
        const responseTimeSeries = extractTimeSeries(widgets[0]);
        return { admin, responseTimeSeries };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const timeSeriesDeleteApi = async (timeSeries) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateTimeSeries(timeSeries, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard/delete-widget', dataToPost);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const gaugeChangeApi = async (gaugeType, gauge) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateGauge(gaugeType, gauge, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard', dataToPost);
        camelizeJson(response.data);
        const { admin, widgets } = response.data;
        const responseGauge = extractGauge(widgets[0]);
        return { admin, responseGauge };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const gaugeDeleteApi = async (gaugeType, gauge) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateGauge(gaugeType, gauge, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard/delete-widget', dataToPost);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const gaugeAddApi = async (gaugeType, gauge) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateGauge(gaugeType, gauge, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard/add-widget', dataToPost);
        camelizeJson(response.data);
        const { admin, widgets } = response.data;
        const responseGauge = extractGauge(widgets[0]);
        return { admin, responseGauge };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const tagChangeApi = async (tag) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateTag(tag, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard', dataToPost);
        camelizeJson(response.data);
        const { admin, widgets } = response.data;
        const responseTag = extractTag(widgets[0]);
        return { admin, responseTag };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const tagDeleteApi = async (tag) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateTag(tag, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard/delete-widget', dataToPost);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const tagAddApi = async (tag) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateTag(tag, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard/add-widget', dataToPost);
        camelizeJson(response.data);
        const { admin, widgets } = response.data;
        const responseTag = extractTag(widgets[0]);
        return { admin, responseTag };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const triggerChangeApi = async (trigger) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateTrigger(trigger, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard', dataToPost);
        camelizeJson(response.data);
        const { admin, widgets } = response.data;
        const responseTrigger = extractTrigger(widgets[0]);
        return { admin, responseTrigger };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const triggerDeleteApi = async (trigger) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateTrigger(trigger, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard/delete-widget', dataToPost);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const triggerAddApi = async (trigger) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateTrigger(trigger, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard/add-widget', dataToPost);
        camelizeJson(response.data);
        const { admin, widgets } = response.data;
        const responseTrigger = extractTrigger(widgets[0]);
        return { admin, responseTrigger };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const seeqChangeApi = async (seeq) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateSeeq(seeq, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard', dataToPost);
        camelizeJson(response.data);
        const { admin, widgets } = response.data;
        const responseSeeq = extractSeeq(widgets[0]);
        return { admin, responseSeeq };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const seeqDeleteApi = async (seeq) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateSeeq(seeq, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard/delete-widget', dataToPost);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const seeqAddApi = async (seeq) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateSeeq(seeq, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/dashboard/add-widget', dataToPost);
        camelizeJson(response.data);
        const { admin, widgets } = response.data;
        const responseSeeq = extractSeeq(widgets[0]);
        return { admin, responseSeeq };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

function manipulateSeeq(seeq, sysId) {
    const { placement, url } = seeq;

    return {
        sysId,
        tag1: '',
        tag2: '',
        tag3: '',
        detail1: url,
        detail2: '',
        detail3: '',
        detail4: '',
        widgetType: 'Seeq',
        placement,
        header: '',
        calculation: '',
        startDate: '',
        endDate: '',
    };
}

function manipulateTrigger(trigger, sysId) {
    const { placement, tagId, controllerTagId } = trigger;

    return {
        sysId,
        tag1: tagId,
        tag2: controllerTagId,
        tag3: '',
        detail1: '',
        detail2: '',
        detail3: '',
        detail4: '',
        widgetType: 'Trigger',
        placement,
        header: '',
        calculation: '',
        startDate: '',
        endDate: '',
    };
}

function manipulateTag(tag, sysId) {
    const { placement, tagId } = tag;

    return {
        sysId,
        tag1: tagId,
        tag2: '',
        tag3: '',
        detail1: '',
        detail2: '',
        detail3: '',
        detail4: '',
        widgetType: 'Tag',
        placement,
        header: '',
        calculation: '',
        startDate: '',
        endDate: '',
    };
}

function manipulateGauge(gaugeType, gauge, sysId) {
    const { measuredTag, placement, lL, l, h, hH } = gauge;
    const gaugesTypesOptions = {
        MIDDLE: 'MiddleGauge',
        RIGHT: 'RightGauge',
        LEFT: 'LeftGauge',
    };

    return {
        sysId,
        tag1: measuredTag,
        tag2: '',
        tag3: '',
        detail1: lL,
        detail2: l,
        detail3: h,
        detail4: hH,
        widgetType: gaugesTypesOptions[gaugeType],
        placement,
        header: '',
        calculation: '',
        startDate: '',
        endDate: '',
    };
}

export function manipulateTimeSeries(timeSeries, sysId) {
    const { startDate, endDate, tags, placement, detail1 } = timeSeries;
    let backTags = tags.map((tag) => (tag.tagId));

    for (let i = tags.length; i < 3; i++) {
        backTags.push('');
    }

    return {
        sysId,
        tag1: backTags[0],
        tag2: backTags[1],
        tag3: backTags[2],
        detail1: detail1 == null ? '' : detail1,
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


export function getWidgetsByType(widgets) {
    let triggers = [];
    let tags = [];
    let gauges = [];
    let timeSeries = [];
    let middleGauges = [];
    let rightGauges = [];
    let leftGauges = [];
    let seeqs = [];
    for (let i = 0; i < widgets.length; i++) {
        const { widgetType } = widgets[i];
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
    const { placement, extraData } = widget;
    return {
        placement: placement,
        url: extraData,
    };
}

function extractGauge(widget) {
    const { gaugeData, tags, placement } = widget;
    const { lL, l, h, hH } = gaugeData;

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
    const { tags, placement } = widget;

    const { tag1, tag1Name, tag1Value, tag1Units } = tags[0];
    const { tag2, tag2Name, tag2Value, tag2Units } = tags[1];
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

export function extractTimeSeries(widget) {
    const { placement, startDate, endDate, tags, influxData, extraData } = widget;

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
        currentPickedRange: extraData,
    };
}

function extractTag(widget) {
    const { tags, placement } = widget;
    const { tag1, tag1Name, tag1Value, tag1Units } = tags[0];

    return {
        placement,
        tagId: tag1,
        tagName: tag1Name,
        tagValue: tag1Value,
        tagUnits: tag1Units,
    };
}


function interpolateData(array) {
    const indicesWithValues = extractIndicesWithValues(array);

    if (!indicesWithValues.length) {
        return array;
    }

    interpolateArray(array, indicesWithValues);

    return array;
}

function extractIndicesWithValues(array) {
    const indicesWithValues = [];
    array.forEach((value, index) => {
        if (value != null) {
            indicesWithValues.push(index);
        } else {
            array[index] = 0;
        }
    });

    return indicesWithValues;
}


function interpolateArray(array, indicesWithValues) {
    // padding at the start
    for (let i = 0; i < indicesWithValues[0]; i++) {
        array[i] = array[indicesWithValues[0]];
    }

    indicesWithValues.forEach((indexInArray, indexInIndicesArray) => {
        if (indexInIndicesArray < indicesWithValues.length - 1) {
            for (let i = indexInArray + 1; i < indicesWithValues[indexInIndicesArray + 1]; i++) {
                array[i] = array[indexInArray] + (i - indexInArray) / (indicesWithValues[indexInIndicesArray + 1] - indexInArray) * (array[indicesWithValues[indexInIndicesArray + 1]] - array[indexInArray]);
            }
        }
    });

    // padding at the end
    for (let i = indicesWithValues[indicesWithValues.length - 1] + 1; i < array.length; i++) {
        array[i] = array[indicesWithValues[indicesWithValues.length - 1]];
    }
}

function calcCurrentPlacement(triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs) {
    let currentPlacement = 0;
    const arrayOfArrays = [triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs];
    arrayOfArrays.forEach(array => {
        array.forEach(widget => {
            currentPlacement = Math.max(currentPlacement, widget.placement);
        });
    });

    return currentPlacement + 1;
}