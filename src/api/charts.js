import { camelizeJson, capitalizeJson, extractSystemId } from "./utils";
import { manipulateTimeSeries, extractTimeSeries } from './dashboard';
import axios from "axios";

export const timeSeriesChangeApi = async (timeSeries) => {
    const sysId = extractSystemId();
    const dataToPost = manipulateTimeSeries(timeSeries, sysId);
    capitalizeJson(dataToPost);
    try {
        const response = await axios.post('/system/charts', dataToPost);
        camelizeJson(response.data);
        const { admin, chartData } = response.data;
        const responseTimeSeries = extractTimeSeries(chartData);
        return { admin, responseTimeSeries };
    } catch (err) {
        throw err;
    }
};