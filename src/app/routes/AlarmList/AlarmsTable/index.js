import React from 'react';
import TableCell from './AlarmsTableCell';


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
                        <TableCell key={index} cellData={cellData}
                                   onClick={clickable ? ()=>clickFunction(cellData.SystemID): null}/>
                    );
                })}
                </tbody>
            </table>
        </div>
    );

};

export default Table;