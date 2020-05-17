import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

const TableRow = ({cellData, key}) => {
    const cellElems = Object.values(cellData).map(value => (<td className="text-nowrap">{value}</td>));
    return (
        <tr
            tabIndex={-1}
            key={key}>
            {cellElems}
            <td className="text-right">
                <IconButton className="icon-btn text-light p-1"><i
                    className="zmdi zmdi-settings text-blue"/></IconButton>
            </td>
        </tr>

    );
};

TableRow.propTypes = {
    cellData: PropTypes.object.isRequired,
    key: PropTypes.number.isRequired,
};

export default TableRow;
