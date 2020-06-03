import React from 'react';

import NotificationItem from './NotificationItem';
import CustomScrollbars from 'util/CustomScrollbars';

function prepareAlarmsForNotifications(activeAlarms){
    return activeAlarms.map((activeAlarm) => {
        const {alarmId, sysId, timeStamp} = activeAlarm
        return {
            alarmId, sysId, timeStamp
        }
    })
}


const LiveAlarmsNotifications = ({activeAlarms}) => {
    const notifications = prepareAlarmsForNotifications(activeAlarms)
  return (
    <CustomScrollbars className="messages-list scrollbar" style={{height: 280}}>
      <ul className="list-unstyled">
        {notifications.map((notification, index) => <NotificationItem key={index} notification={notification}/>)
        }
      </ul>
    </CustomScrollbars>
  )
};

export default LiveAlarmsNotifications;

