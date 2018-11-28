import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

let config = require('../config')

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  if(!array) {
    return []
  }
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'creator', numeric: false, disablePadding: false, label: 'Creator' },
  { id: 'fundStatus', numeric: false, disablePadding: false, label: 'Fund Status' },
  { id: 'token', numeric: true, disablePadding: false, label: 'Token' },
  { id: 'myContribution', numeric: false, disablePadding: false, label: 'My Contribution' },
  { id: 'blockchain', numeric: false, disablePadding: false, label: 'Blockchain' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    <Typography variant="body2"  style={{fontSize: '17px', fontWeight: 'bold'}}>
                      {row.label}
                    </Typography>
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    margin: '12px'
  },
  table: {

  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'timestamp',
    selected: [],
    data: this.props.pools,
    page: 0,
    rowsPerPage: 5,
    filtersVisible: false
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleToggleFilters = event => {
    this.setState({ filtersVisible: !this.state.filtersVisible })
  };

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, filtersVisible } = this.state;
    const data = this.props.pools;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data?data.length:0 - page * rowsPerPage);
    return (
      <div className={classes.root}>
        <Typography variant="headline"  style={{marginBottom: '20px'}}>
          My Pools
        </Typography>
        <Paper>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data?data.length:0}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={n.id}
                      >
                        <TableCell>
                          <Typography style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
                            {n.name}
                          </Typography>
                        </TableCell>
                        <TableCell >
                          <Typography style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
                            {n.creator}
                          </Typography>
                        </TableCell>
                        <TableCell >
                          <Typography style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
                            {n.fundStatus}
                          </Typography>
                        </TableCell>
                        <TableCell numeric>
                          <Typography style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
                            {n.token}
                          </Typography>
                        </TableCell>
                        <TableCell >
                          <Typography style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
                            {n.myContribution}
                          </Typography>
                        </TableCell>
                        <TableCell >
                          <Typography style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
                            {n.blockchain}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={data?data.length:0}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
