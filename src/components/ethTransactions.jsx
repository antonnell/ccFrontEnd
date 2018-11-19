import React from 'react';
import moment from 'moment';
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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

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

function filtering(array, props) {

  if(!array) {
    return []
  }

  return array.filter((a) => {
    if(props.selectedAddress && a.fromDisplayName != props.selectedAddress && a.toDisplayName != props.selectedAddress) {
      return false
    }
    if(props.selectedContact && a.fromDisplayName != props.selectedContact && a.toDisplayName != props.selectedContact) {
      return false
    }
    if(props.fromDate && moment(a.timestamp).format('YYYY-MM-DD') < props.fromDate) {
      return false
    }
    if(props.toDate && moment(a.timestamp).format('YYYY-MM-DD') > props.toDate) {
      return false
    }
    return true
  })
}

const rows = [
  { id: 'timestamp', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'fromDisplayName', numeric: false, disablePadding: false, label: 'From Account' },
  { id: 'toDisplayName', numeric: false, disablePadding: false, label: 'To Account' },
  { id: 'value', numeric: true, disablePadding: false, label: 'Amount' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'transactionId', numeric: false, disablePadding: false, label: 'Transaction' },
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

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  filters: {

  }
});

let EnhancedFilterBar = props => {
  const {
    ethAddresses,
    selectedAddress,
    selectedAddressError,
    selectedAddressErrorMessage,
    selectAddress,
    contacts,
    selectedContact,
    selectedContactError,
    selectedContactErrorMessage,
    selectContact,
    loading,
    fromDate,
    toDate,
    handleChange,
    visible
  } = props;

  return (
    <Grid container justify="flex-start" alignItems="flex-start" direction="row" spacing={24} style={{padding: '0px 24px' , display: visible?'flex':'none'}} >
      <Grid item xs={12} sm={6} md={4} lg={3} align='left'>
        <FormControl error={selectedAddressError}
          fullWidth={true}
          style={{paddingBottom: '13px', paddingTop: '12px'}}>
          <InputLabel shrink={true}>Address</InputLabel>
          <Select
            fullWidth={true}
            native={true}
            value={selectedAddress}
            onChange={selectAddress}
            disabled={loading} >
              <option key='' value=''>--</option>
              {
                ethAddresses?
                ethAddresses
                .map((address) => {
                  return (<option key={address.publicAddress} value={address.publicAddress}>{address.name}</option>)
                }):''
              }
          </Select>
         {selectedAddressError==true?<FormHelperText>{selectedAddressErrorMessage}</FormHelperText>:null}
       </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} align='left'>
        <FormControl error={selectedContactError}
          fullWidth={true}
          style={{paddingBottom: '13px', paddingTop: '12px'}}>
          <InputLabel shrink={true}>Contact</InputLabel>
          <Select
            fullWidth={true}
            native={true}
            value={selectedContact}
            onChange={selectContact}
            disabled={loading} >
              <option key='' value=''>--</option>
              {
                contacts?
                contacts
                .map((contact) => {
                  return (<option key={contact.id} value={contact.id}>{contact.displayName}</option>)
                }):''
              }
          </Select>
         {selectedContactError==true?<FormHelperText>{selectedContactErrorMessage}</FormHelperText>:null}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} align='left'>
        <TextField
          fullWidth={true}
          id="date"
          label="From Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={fromDate}
          margin="normal"
          onChange={(event) => { handleChange(event, 'fromDate'); }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} align='left'>
        <TextField
          fullWidth={true}
          id="date"
          label="To Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={toDate}
          margin="normal"
          onChange={(event) => { handleChange(event, 'toDate'); }}
        />
      </Grid>
    </Grid>
  )
}

let EnhancedTableToolbar = props => {
  const { numSelected, classes, toggleFilters } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        <Typography variant="body2"  style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
          Filters
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list" onClick={toggleFilters}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );

};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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
    data: this.props.ethTransactions,
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
    const data = this.props.ethTransactions;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data?data.length:0 - page * rowsPerPage);

    return (
      <div className={classes.root}>
        <Typography variant="headline"  style={{marginBottom: '20px'}}>
          Ethereum Transactions
        </Typography>
        <Paper>
          <EnhancedTableToolbar numSelected={selected.length} toggleFilters={this.handleToggleFilters} />
          <EnhancedFilterBar
            selectedAddress={this.props.selectedAddress}
            selectedContact={this.props.selectedContact}
            selectContact={this.props.selectContact}
            selectAddress={this.props.selectAddress}
            ethAddresses={this.props.ethAddresses}
            contacts={this.props.contacts}
            fromDate={this.props.fromDate}
            toDate={this.props.toDate}
            handleChange={this.props.handleChange}
            visible={filtersVisible} />
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
                {stableSort(filtering(data, this.props), getSorting(order, orderBy))
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
                            {moment(n.timestamp).format('YYYY/MM/DD hh:mm')}
                          </Typography>
                        </TableCell>
                        <TableCell >
                          <Typography style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
                            {n.fromDisplayName}
                          </Typography>
                        </TableCell>
                        <TableCell >
                          <Typography style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
                            {n.toDisplayName}
                          </Typography>
                        </TableCell>
                        <TableCell numeric>
                          <Typography style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
                            {n.value}
                          </Typography>
                        </TableCell>
                        <TableCell >
                          <Typography style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
                            {n.status}
                          </Typography>
                        </TableCell>
                        <TableCell >
                          <Typography style={{lineHeight: '57px', fontSize: '17px'}} noWrap>
                            <a href={config.etherscanUrl+n.transactionId} target="_blank">View</a>
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
