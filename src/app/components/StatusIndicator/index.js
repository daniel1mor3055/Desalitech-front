import classnames from "classnames";
import React from "react";
import {systemStatusEnum} from "constants/systemStatus";
import './index.scss';

const StatusIndicator = ({systemStatus}) => {

    const parsedStatus = systemStatusEnum[systemStatus];

    return (
        <div className='StatusIndicator StatusIndicator-iconWrapper'>
            <i className={classnames('StatusIndicator-icon', 'zmdi', 'zmdi-circle', 'Indicator', {'text-green': systemStatus}, {'text-red': !systemStatus})}/>
            <span
                className={classnames({'text-green': systemStatus}, {'text-red': !systemStatus})}>{parsedStatus}</span>
        </div>);
};

export default StatusIndicator;