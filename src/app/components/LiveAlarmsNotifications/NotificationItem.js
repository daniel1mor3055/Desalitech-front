import React from 'react';


import { withRouter } from 'react-router-dom';

const NotificationItem = ({ notification, history }) => {
    const { alarmId, sysId, timeStamp } = notification;
    return (
        <li className="media" style={{ cursor: 'pointer' }}>
            <div className="media-body align-self-center"
                 onClick={() => handleClickOnNotification(sysId, history)}>
                <p className="sub-heading mb-0">System ID: {sysId}</p>
                <p className="sub-heading mb-0">Alarm ID: {alarmId}</p>
                <span className="meta-date"><small>{timeStamp}</small></span>
            </div>
        </li>
    );
};

const handleClickOnNotification = (sysId, history) => {
    history.push(`/app/alarm-list?sysId=${encodeURIComponent(sysId)}`);
};

export default withRouter(NotificationItem);
