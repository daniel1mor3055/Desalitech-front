import React from 'react';
import TagsTableCell from './TagsTableCell';


const TagsTable = ({data}) => {
    return (
        <div className="table-responsive-material">
            <table className="project-list-table table remove-table-border mb-0">
                <thead>
                <tr>
                    <th scope="col">tagId</th>
                    <th scope="col">tagName</th>
                    <th scope="col">tagValue</th>
                    {/*<th colSpan="2" scope="col">Status</th>*/}
                </tr>
                </thead>
                <tbody>
                {data.map(data => {
                    return (
                        <TagsTableCell key={data.id} data={data}/>
                    );
                })}
                </tbody>
            </table>
        </div>
    );

};

export default TagsTable;