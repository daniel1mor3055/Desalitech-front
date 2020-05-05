import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const AlarmsTableCell = ({data}) => {
    const {id, alarmId, alarmDescription, alarmDate} = data;
    return (

        <tr
            tabIndex={-1}
            key={'tags-'+id}>

            <td className="max-width-100">
                <p className="text-truncate mb-0">{alarmId}</p>
            </td>

            <td className="text-nowrap">{alarmDescription}</td>
            <td className="text-nowrap">{alarmDate}</td>
            <td className="text-right">
                <IconButton className="icon-btn text-light p-1"><i className="zmdi zmdi-settings text-blue"/></IconButton>
            </td>
        </tr>

    );
};

export default AlarmsTableCell;
