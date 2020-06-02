import {fetchDashboardApi, timeSeriesChangeApi, gaugeChangeApi, tagChangeApi,triggerChangeApi} from 'api/dashboard';
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
} from '../actions/dashboard';
import {setAdminStatus} from "../actions/admin";


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

export const gaugeChange = (gauge) => (
    async (dispatch) => {
        dispatch(gaugeChangeStart());
        try {
            const {gaugeType} = gauge;
            const {admin, responseGauge} = await gaugeChangeApi(gauge);
            dispatch(setAdminStatus(admin));
            dispatch(gaugeChangeSuccess(responseGauge, gaugeType));
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