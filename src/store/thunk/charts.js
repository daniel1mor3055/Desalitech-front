import {
    timeSeriesChangeApi,
} from 'api/charts';
import { fetchTags } from './tagsList';
import {
    timeSeriesChangeSuccess,
    timeSeriesAddSuccess,
    timeSeriesDeleteSuccess,
    chartsPostFail,
    chartsPostStart
} from '../actions/charts';
import { setAdminStatus } from "../actions/header";

export const fetchBackgroundTags = () => (fetchTags());

export const timeSeriesChange = (timeSeries) => (
    async (dispatch) => {
        dispatch(chartsPostStart());
        try {
            const { admin, responseTimeSeries } = await timeSeriesChangeApi(timeSeries);
            dispatch(setAdminStatus(admin));
            dispatch(timeSeriesChangeSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(chartsPostFail(err));
        }
    });

export const timeSeriesDelete = (timeSeries) => (
    async (dispatch) => {
        dispatch(chartsPostStart());
        try {
            await timeSeriesChangeApi(timeSeries);
            dispatch(timeSeriesDeleteSuccess(timeSeries));
        } catch (err) {
            dispatch(chartsPostFail(err));
        }
    });

export const timeSeriesAdd = (timeSeries) => (
    async (dispatch) => {
        dispatch(chartsPostStart());
        try {
            const { admin, responseTimeSeries } = await timeSeriesChangeApi(timeSeries);
            dispatch(setAdminStatus(admin));
            dispatch(timeSeriesAddSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(chartsPostFail(err));
        }
    });
