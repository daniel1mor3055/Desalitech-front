import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const TagsTableCell = ({data}) => {
    const {id, tagId, tagName, tagValue} = data;
    return (

        <tr
            tabIndex={-1}
            key={'tags-'+id}>

            <td className="max-width-100">
                <p className="text-truncate mb-0">{tagId}</p>
            </td>

            <td className="text-nowrap">{tagName}</td>
            <td className="text-nowrap">{tagValue}</td>
            <td className="text-right">
                <IconButton className="icon-btn text-light p-1"><i className="zmdi zmdi-settings text-blue"/></IconButton>
            </td>
        </tr>

    );
};

export default TagsTableCell;
