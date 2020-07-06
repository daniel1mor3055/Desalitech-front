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
import {fetchTags} from './tagsList';
import {
    fetchDashboardFail,
    fetchDashboardStart,
    fetchDashboardSuccess,
    gaugeAddFail,
    gaugeAddStart,
    gaugeAddSuccess,
    gaugeChangeFail,
    gaugeChangeStart,
    gaugeChangeSuccess,
    seeqAddFail,
    seeqAddStart,
    seeqAddSuccess,
    seeqChangeFail,
    seeqChangeStart,
    seeqChangeSuccess,
    seeqDeleteFail,
    seeqDeleteStart,
    seeqDeleteSuccess,
    tagAddFail,
    tagAddStart,
    tagAddSuccess,
    tagChangeFail,
    tagChangeStart,
    tagChangeSuccess,
    timeSeriesAddFail,
    timeSeriesAddStart,
    timeSeriesAddSuccess,
    timeSeriesChangeFail,
    timeSeriesChangeStart,
    timeSeriesChangeSuccess,
    triggerAddFail,
    triggerAddStart,
    triggerAddSuccess,
    triggerChangeFail,
    triggerChangeStart,
    triggerChangeSuccess,
    tagDeleteFail,
    tagDeleteStart,
    tagDeleteSuccess,
    gaugeDeleteFail,
    gaugeDeleteStart,
    gaugeDeleteSuccess,
    timeSeriesDeleteFail,
    timeSeriesDeleteStart,
    timeSeriesDeleteSuccess,
    triggerDeleteFail,
    triggerDeleteStart,
    triggerDeleteSuccess,
} from '../actions/dashboard';
import {setAdminStatus} from "../actions/header";


export const fetchDashboard = () => (
    async (dispatch) => {
        dispatch(fetchDashboardStart());
        try {
            const {
                admin, triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs, currentPlacement
            } = await fetchDashboardApi();
            dispatch(setAdminStatus(admin));
            dispatch(fetchDashboardSuccess(triggers, tags, gauges, timeSeries, middleGauges, rightGauges, leftGauges, seeqs, currentPlacement));
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


export const timeSeriesAdd = (timeSeries) => (
    async (dispatch) => {
        dispatch(timeSeriesAddStart());
        try {
            const {admin, responseTimeSeries} = await timeSeriesAddApi(timeSeries);
            dispatch(setAdminStatus(admin));
            dispatch(timeSeriesAddSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(timeSeriesAddFail(err));
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

export const gaugeAdd = (gaugeType, gauge) => (
    async (dispatch) => {
        dispatch(gaugeAddStart());
        try {
            const {admin, responseGauge} = await gaugeAddApi(gaugeType, gauge);
            dispatch(setAdminStatus(admin));
            dispatch(gaugeAddSuccess(gaugeType, responseGauge));
        } catch (err) {
            dispatch(gaugeAddFail(err));
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

export const tagDelete = (tag) => (
    async (dispatch) => {
        dispatch(tagDeleteStart());
        try {
            await tagDeleteApi(tag);
            dispatch(tagDeleteSuccess(tag));
        } catch (err) {
            dispatch(tagDeleteFail(err));
        }
    });

export const tagAdd = (tag) => (
    async (dispatch) => {
        dispatch(tagAddStart());
        try {
            const {admin, responseTag} = await tagAddApi(tag);
            dispatch(setAdminStatus(admin));
            dispatch(tagAddSuccess(responseTag));
        } catch (err) {
            dispatch(tagAddFail(err));
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

export const triggerDelete = (trigger) => (
    async (dispatch) => {
        dispatch(triggerDeleteStart());
        try {
            await triggerDeleteApi(trigger);
            dispatch(triggerDeleteSuccess(trigger));
        } catch (err) {
            dispatch(triggerDeleteFail(err));
        }
    });

export const gaugeDelete = (gaugeType, gauge) => (
    async (dispatch) => {
        dispatch(gaugeDeleteStart());
        try {
            await gaugeDeleteApi(gaugeType, gauge);
            dispatch(gaugeDeleteSuccess(gaugeType, gauge));
        } catch (err) {
            dispatch(gaugeDeleteFail(err));
        }
    });

export const timeSeriesDelete = (timeSeries) => (
    async (dispatch) => {
        dispatch(timeSeriesDeleteStart());
        try {
            await timeSeriesDeleteApi(timeSeries);
            dispatch(timeSeriesDeleteSuccess(timeSeries));
        } catch (err) {
            dispatch(timeSeriesDeleteFail(err));
        }
    });

export const triggerAdd = (trigger) => (
    async (dispatch) => {
        dispatch(triggerAddStart());
        try {
            const {admin, responseTrigger} = await triggerAddApi(trigger);
            dispatch(setAdminStatus(admin));
            dispatch(triggerAddSuccess(responseTrigger));
        } catch (err) {
            dispatch(triggerAddFail(err));
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

export const seeqDelete = (seeq) => (
    async (dispatch) => {
        dispatch(seeqDeleteStart());
        try {
            await seeqDeleteApi(seeq);
            dispatch(seeqDeleteSuccess(seeq));
        } catch (err) {
            dispatch(seeqDeleteFail(err));
        }
    });

export const seeqAdd = (seeq) => (
    async (dispatch) => {
        dispatch(seeqAddStart());
        try {
            const {admin, responseSeeq} = await seeqAddApi(seeq);
            dispatch(setAdminStatus(admin));
            dispatch(seeqAddSuccess(responseSeeq));
        } catch (err) {
            dispatch(seeqAddFail(err));
        }
    });