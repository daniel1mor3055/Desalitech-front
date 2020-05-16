import * as actionTypes from '../actionTypes/Admin/admin';

export const setAdminStatus = (admin) => (
    {
        type: actionTypes.SET_ADMIN_STATUS,
        payload: {admin: admin}
    }
)