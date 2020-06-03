import React from 'react';

import NotificationItem from './NotificationItem';
import CustomScrollbars from 'util/CustomScrollbars';
import SidenavItem from "containers/SideNav/SidenavItems/SidenavItem";

function prepareAlarmsForNotifications(activeAlarms) {
    return activeAlarms.map((activeAlarm) => {
        const {alarmId, sysId, timeStamp} = activeAlarm;
        return {
            alarmId, sysId, timeStamp
        };
    });
}


const LiveAlarmsNotifications = ({activeAlarms}) => {
    const notifications = prepareAlarmsForNotifications(activeAlarms);
    return (
        <CustomScrollbars className="messages-list scrollbar" style={{height: 280}}>
            <ul className="list-unstyled">
                {notifications.map((notification, index) => <NotificationItem key={index} notification={notification}/>)
                }
                <SidenavItem relativePath={'system-select-active-alarms?currentTab=active_alarms'} id={"pages.seeAllActiveAlarms"}
                             />
            </ul>
        </CustomScrollbars>
    );
};

export default LiveAlarmsNotifications;

