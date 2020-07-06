import {
    timeSeriesChangeApi,
} from 'api/charts';
import {fetchTags} from './tagsList';
import {
    timeSeriesChangeFail,
    timeSeriesChangeStart,
    timeSeriesChangeSuccess,
    timeSeriesAddFail,
    timeSeriesAddStart,
    timeSeriesAddSuccess,
    timeSeriesDeleteSuccess,
    timeSeriesDeleteStart,
    timeSeriesDeleteFail
} from '../actions/charts';
import {setAdminStatus} from "../actions/header";

export const fetchBackgroundTags = () => (fetchTags());

export const timeSeriesChange = (timeSeries) => (
    async (dispatch) => {
        dispatch(timeSeriesChangeStart());
        try {
            const {admin, responseTimeSeries} = await timeSeriesChangeApi(timeSeries);
            dispatch(setAdminStatus(admin));
            dispatch(timeSeriesChangeSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(timeSeriesChangeFail(err));
        }
    });

export const timeSeriesDelete = (timeSeries) => (
    async (dispatch) => {
        dispatch(timeSeriesDeleteStart());
        try {
            await timeSeriesChangeApi(timeSeries);
            dispatch(timeSeriesDeleteSuccess(timeSeries));
        } catch (err) {
            dispatch(timeSeriesDeleteFail(err));
        }
    });

export const timeSeriesAdd = (timeSeries) => (
    async (dispatch) => {
        dispatch(timeSeriesAddStart());
        try {
            const {admin, responseTimeSeries} = await timeSeriesChangeApi(timeSeries);
            dispatch(setAdminStatus(admin));
            dispatch(timeSeriesAddSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(timeSeriesAddFail(err));
        }
    });
