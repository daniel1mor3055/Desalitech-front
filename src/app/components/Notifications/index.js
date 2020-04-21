import { NotificationManager } from 'react-notifications';

export const SUCCESS_NOTIFICATION = `SUCCESS`;
export const WARNING_NOTIFICATION = `WARNING`;
export const ERROR_NOTIFICATION = `ERROR`;
export const INFO_NOTIFICATION = `INFO`;

const createNotification = (type, message, title, duration = 2000) => {
    switch (type) {
        case INFO_NOTIFICATION:
            return NotificationManager.info(message, title, duration);
        case SUCCESS_NOTIFICATION:
            return NotificationManager.success(message, title, duration);
        case WARNING_NOTIFICATION:
            return NotificationManager.warning(message, title, duration);
        case ERROR_NOTIFICATION:
            return NotificationManager.error(message, title, duration);
        default:
            return NotificationManager.info(message, title, duration);
    }
};

export default createNotification;