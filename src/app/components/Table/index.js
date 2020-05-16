import React from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow';


const Table = ({data, clickFunction,clickable}) => {
    const columns = Object.keys(data[0]).map(elem => (<th scope="col">{elem}</th>));

    return (
        <div className="table-responsive-material">
            <table className="project-list-table table remove-table-border mb-0">
                <thead>
                <tr>
                    {columns}
                </tr>
                </thead>
                <tbody>
                {data.map((cellData,index) => {
                    return (
                        <TableRow key={index} cellData={cellData}
                                   onClick={clickable ? ()=>clickFunction(cellData.SystemID): null}/>
                    );
                })}
                </tbody>
            </table>
        </div>
    );

};

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default Table;