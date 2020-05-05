import React from 'react';
import AlarmsTableCell from './AlarmsTableCell';


const AlarmsTable = ({data}) => {
    return (
        <div className="table-responsive-material">
            <table className="project-list-table table remove-table-border mb-0">
                <thead>
                <tr>
                    <th scope="col">Alarm ID</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                    {/*<th colSpan="2" scope="col">Status</th>*/}
                </tr>
                </thead>
                <tbody>
                {data.map(data => {
                    return (
                        <AlarmsTableCell key={data.id} data={data}/>
                    );
                })}
                </tbody>
            </table>
        </div>
    );

};

export default AlarmsTable;