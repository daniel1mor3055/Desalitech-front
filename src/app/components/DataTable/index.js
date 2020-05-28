import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

class DataTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy, columnsIds, columnsLabels, actions} = this.props;

        const columnsData = new Array(columnsIds.length).fill(0).map((_, index) => (
            {
                id: columnsIds[index],
                align: 'center',
                disablePadding: true,
                label: columnsLabels[index]
            }
        ));

        return (
            <TableHead>
                <TableRow>
                    {columnsData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                padding={column.disablePadding ? 'none' : 'default'}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.align ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                    {actions ?
                        actions.map(action => (
                            <TableCell key={action.id}>
                                {action.label}
                            </TableCell>))
                        : null}
                </TableRow>
            </TableHead>
        );
    }
}

DataTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    columnsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    columnsLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    actions: PropTypes.arrayOf(PropTypes.object)
};


class DataTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        const {data, initialOrderBy} = props;

        this.state = {
            order: 'asc',
            orderBy: initialOrderBy,
            data: data,
            page: 0,
            rowsPerPage: 10, //Later on we can support user preferences and store it
        };
    }

    static getDerivedStateFromProps = (props, state) => {
        const data =
            state.order === 'desc'
                ? [...props.data].sort((a, b) => (b[state.orderBy] < a[state.orderBy] ? -1 : 1))
                : [...props.data].sort((a, b) => (a[state.orderBy] < b[state.orderBy] ? -1 : 1));

        return {
            ...state,
            data: data,
        };
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };


    render() {
        const {data, order, orderBy, rowsPerPage, page} = this.state;
        const {cellIdentifier, columnsIds, columnsLabels, actions, onRowClick} = this.props;

        return (
            <Paper>
                <div className="flex-auto">
                    <div className="table-responsive-material">
                        <Table className="">
                            <DataTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                                columnsIds={columnsIds}
                                columnsLabels={columnsLabels}
                                actions={actions}
                            />
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(dataObject => {
                                    return (
                                        <TableRow
                                            onClick={onRowClick != null ? () => onRowClick(dataObject) : null}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={dataObject[cellIdentifier]}
                                        >
                                            {columnsIds.map((colId) => (
                                                <TableCell align={"center"} key={colId}>{dataObject[colId]}</TableCell>
                                            ))}
                                            {actions ?
                                                actions.map(action => (
                                                    <TableCell key={action.id}>
                                                        {action.cell(dataObject)}
                                                    </TableCell>))
                                                : null}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </Paper>
        );
    }
}

DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    initialOrderBy: PropTypes.string.isRequired,
    columnsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    columnsLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    cellIdentifier: PropTypes.any.isRequired,
    actions: PropTypes.arrayOf(PropTypes.object),
    handleEditClick: PropTypes.func,
    onRowClick: PropTypes.func,
};

export default DataTable;