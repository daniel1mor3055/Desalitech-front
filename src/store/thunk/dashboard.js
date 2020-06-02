import {
    fetchDashboardApi,
    timeSeriesChangeApi,
    gaugeChangeApi,
    tagChangeApi,
    triggerChangeApi,
    seeqChangeApi
} from 'api/dashboard';
import {fetchTags} from './tagsList';
import {
    fetchDashboardFail,
    fetchDashboardStart,
    fetchDashboardSuccess,
    timeSeriesChangeFail,
    timeSeriesChangeStart,
    timeSeriesChangeSuccess,
    gaugeChangeFail,
    gaugeChangeStart,
    gaugeChangeSuccess,
    tagChangeFail,
    tagChangeStart,
    tagChangeSuccess,
    triggerChangeFail,
    triggerChangeStart,
    triggerChangeSuccess,
    seeqChangeFail,
    seeqChangeStart,
    seeqChangeSuccess
} from '../actions/dashboard';
import {setAdminStatus} from "../actions/header";


export const fetchDashboard = () => (
    async (dispatch) => {
        dispatch(fetchDashboardStart());
        try {
            const {
                admin, triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs
            } = await fetchDashboardApi();
            dispatch(setAdminStatus(admin));
            dispatch(fetchDashboardSuccess(triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs));
        } catch (err) {
            dispatch(fetchDashboardFail(err));
        }
    });

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

export const gaugeChange = (gaugeType, gauge) => (
    async (dispatch) => {
        dispatch(gaugeChangeStart());
        try {
            const {admin, responseGauge} = await gaugeChangeApi(gaugeType, gauge);
            dispatch(setAdminStatus(admin));
            dispatch(gaugeChangeSuccess(gaugeType, responseGauge));
        } catch (err) {
            dispatch(gaugeChangeFail(err));
        }
    });

export const tagChange = (tag) => (
    async (dispatch) => {
        dispatch(tagChangeStart());
        try {
            const {admin, responseTag} = await tagChangeApi(tag);
            dispatch(setAdminStatus(admin));
            dispatch(tagChangeSuccess(responseTag));
        } catch (err) {
            dispatch(tagChangeFail(err));
        }
    });

export const triggerChange = (trigger) => (
    async (dispatch) => {
        dispatch(triggerChangeStart());
        try {
            const {admin, responseTrigger} = await triggerChangeApi(trigger);
            dispatch(setAdminStatus(admin));
            dispatch(triggerChangeSuccess(responseTrigger));
        } catch (err) {
            dispatch(triggerChangeFail(err));
        }
    });

export const seeqChange = (seeq) => (
    async (dispatch) => {
        dispatch(seeqChangeStart());
        try {
            const {admin, responseSeeq} = await seeqChangeApi(seeq);
            dispatch(setAdminStatus(admin));
            dispatch(seeqChangeSuccess(responseSeeq));
        } catch (err) {
            dispatch(seeqChangeFail(err));
        }
    });