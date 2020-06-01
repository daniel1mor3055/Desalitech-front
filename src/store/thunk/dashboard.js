import {fetchDashboardApi, setDatesApi,chooseTagsApi} from 'api/dashboard';
import {fetchTags} from './tagsList';
import {
    fetchDashboardFail,
    fetchDashboardStart,
    fetchDashboardSuccess,
    setDatesFail,
    setDatesStart,
    setDatesSuccess,
    chooseTagsFail,
    chooseTagsStart,
    chooseTagsSuccess,
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

export const setDates = (timeSeries) => (
    async (dispatch) => {
        dispatch(setDatesStart());
        try {
            const {admin, responseTimeSeries} = await setDatesApi(timeSeries);
            dispatch(setAdminStatus(admin));
            dispatch(setDatesSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(setDatesFail(err));
        }
    });


export const chooseTags = (timeSeries) => (
    async (dispatch) => {
        dispatch(chooseTagsStart());
        try {
            const {admin, responseTimeSeries} = await chooseTagsApi(timeSeries);
            dispatch(setAdminStatus(admin));
            dispatch(chooseTagsSuccess(responseTimeSeries));
        } catch (err) {
            dispatch(chooseTagsFail(err));
        }
    });