import {
    fetchDashboardApi,
    gaugeAddApi,
    gaugeChangeApi,
    seeqAddApi,
    seeqChangeApi,
    seeqDeleteApi,
    tagAddApi,
    tagChangeApi,
    timeSeriesAddApi,
    timeSeriesChangeApi,
    triggerAddApi,
    triggerChangeApi,
    tagDeleteApi,
    triggerDeleteApi,
    gaugeDeleteApi,
    timeSeriesDeleteApi,
} from 'api/dashboard';
import { fetchTags } from './tagsList';
import {
    fetchDashboardSuccess,
    gaugeAddSuccess,
    gaugeChangeSuccess,
    seeqAddSuccess,
    seeqChangeSuccess,
    seeqDeleteSuccess,
    tagAddSuccess,
    tagChangeSuccess,
    timeSeriesAddSuccess,
    timeSeriesChangeSuccess,
    triggerAddSuccess,
    triggerChangeSuccess,
    tagDeleteSuccess,
    gaugeDeleteSuccess,
    timeSeriesDeleteSuccess,
    triggerDeleteSuccess,
    dashboardFetchFail,
    dashboardFetchStart,
    dashboardPostFail,
    dashboardPostStart,
} from '../actions/dashboard';
import { setAdminStatus } from "../actions/header";


export const fetchDashboard = () => (
    async (dispatch) => {
        dispatch(dashboardFetchStart());
        try {
            const {
                admin, triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs, currentPlacement
            } = await fetchDashboardApi();
            dispatch(setAdminStatus(admin));
            dispatch(fetchDashboardSuccess(triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs, currentPlacement));
        } catch (err) {
            dispatch(dashboardFetchFail(err));
        }
    });

export const fetchBackgroundTags = () => (fetchTags());

export const timeSeriesChange = (timeSeries) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            const { admin, responseTimeSeries } = await timeSeriesChangeApi(timeSeries);
            dispatch(setAdminStatus(admin));
            dispatch(timeSeriesChangeSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const timeSeriesAdd = (timeSeries) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            const { admin, responseTimeSeries } = await timeSeriesAddApi(timeSeries);
            dispatch(setAdminStatus(admin));
            dispatch(timeSeriesAddSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const gaugeChange = (gaugeType, gauge) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            const { admin, responseGauge } = await gaugeChangeApi(gaugeType, gauge);
            dispatch(setAdminStatus(admin));
            dispatch(gaugeChangeSuccess(gaugeType, responseGauge));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const gaugeAdd = (gaugeType, gauge) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            const { admin, responseGauge } = await gaugeAddApi(gaugeType, gauge);
            dispatch(setAdminStatus(admin));
            dispatch(gaugeAddSuccess(gaugeType, responseGauge));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const tagChange = (tag) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            const { admin, responseTag } = await tagChangeApi(tag);
            dispatch(setAdminStatus(admin));
            dispatch(tagChangeSuccess(responseTag));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const tagDelete = (tag) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            await tagDeleteApi(tag);
            dispatch(tagDeleteSuccess(tag));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const tagAdd = (tag) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            const { admin, responseTag } = await tagAddApi(tag);
            dispatch(setAdminStatus(admin));
            dispatch(tagAddSuccess(responseTag));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const triggerChange = (trigger) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            const { admin, responseTrigger } = await triggerChangeApi(trigger);
            dispatch(setAdminStatus(admin));
            dispatch(triggerChangeSuccess(responseTrigger));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const triggerDelete = (trigger) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            await triggerDeleteApi(trigger);
            dispatch(triggerDeleteSuccess(trigger));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const gaugeDelete = (gaugeType, gauge) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            await gaugeDeleteApi(gaugeType, gauge);
            dispatch(gaugeDeleteSuccess(gaugeType, gauge));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const timeSeriesDelete = (timeSeries) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            await timeSeriesDeleteApi(timeSeries);
            dispatch(timeSeriesDeleteSuccess(timeSeries));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const triggerAdd = (trigger) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            const { admin, responseTrigger } = await triggerAddApi(trigger);
            dispatch(setAdminStatus(admin));
            dispatch(triggerAddSuccess(responseTrigger));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const seeqChange = (seeq) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            const { admin, responseSeeq } = await seeqChangeApi(seeq);
            dispatch(setAdminStatus(admin));
            dispatch(seeqChangeSuccess(responseSeeq));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const seeqDelete = (seeq) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            await seeqDeleteApi(seeq);
            dispatch(seeqDeleteSuccess(seeq));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });

export const seeqAdd = (seeq) => (
    async (dispatch) => {
        dispatch(dashboardPostStart());
        try {
            const { admin, responseSeeq } = await seeqAddApi(seeq);
            dispatch(setAdminStatus(admin));
            dispatch(seeqAddSuccess(responseSeeq));
        } catch (err) {
            dispatch(dashboardPostFail(err));
        }
    });