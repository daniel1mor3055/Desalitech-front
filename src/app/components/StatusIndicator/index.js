import classnames from "classnames";
import React from "react";
import {systemStatusEnum, STATUS_OFFLINE, STATUS_ONLINE} from "constants/systemStatus";
import './index.scss';

const StatusIndicator = ({systemStatus}) => {

    const parsedStatus = systemStatusEnum[systemStatus];

    return (
        <div className='StatusIndicator StatusIndicator-iconWrapper'>
            <i className={classnames('StatusIndicator-icon', 'zmdi', 'zmdi-circle', 'Indicator',
                {'text-green': systemStatus === STATUS_ONLINE}, {'text-red': systemStatus === STATUS_OFFLINE})}/>
            <span
                className={classnames({'text-green': systemStatus === STATUS_ONLINE},
                    {'text-red': systemStatus === STATUS_OFFLINE})}>{parsedStatus}</span>
        </div>);
};

export default StatusIndicator;