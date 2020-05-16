import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const TableCell = ({cellData,key,onClick}) => {
    const cellElems = Object.keys(cellData).map(elem => (<td className="text-nowrap">{cellData[elem]}</td>))
    return (
        <tr
            tabIndex={-1}
            onClick={onClick}
            key={key}>
            {cellElems}
            <td className="text-right">
                <IconButton className="icon-btn text-light p-1"><i className="zmdi zmdi-settings text-blue"/></IconButton>
            </td>
        </tr>
    );
};

export default TableCell;
