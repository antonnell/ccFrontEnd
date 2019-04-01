import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Grid from "@material-ui/core/Grid";
import { colors } from '../../theme.js';

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
  if (!array) {
    return [];
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
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function filtering(array, props) {
  if (!array) {
    return [];
  }

  return array.filter(a => {
    if (
      props.selectedAddress &&
      a.fromDisplayName !== props.selectedAddress &&
      a.toDisplayName !== props.selectedAddress
    ) {
      return false;
    }
    if (
      props.selectedContact &&
      a.fromDisplayName !== props.selectedContact &&
      a.toDisplayName !== props.selectedContact
    ) {
      return false;
    }
    if (
      props.fromDate &&
      moment(a.timestamp).format("YYYY-MM-DD") < props.fromDate
    ) {
      return false;
    }
    return !(
      props.toDate && moment(a.timestamp).format("YYYY-MM-DD") > props.toDate
    );
  });
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, size } = this.props;
    let rows = [
      {
        id: "timestamp",
        disablePadding: false,
        label: "Date"
      },
      {
        id: "transactionID",
        disablePadding: false,
        label: "Transaction"
      },
      {
        id: "amount",
        disablePadding: false,
        label: "Amount"
      }
    ];

    if(!['xl', 'lg'].includes(size)) {
      rows = [
        {
          id: "timestamp",
          disablePadding: false,
          label: "Date"
        },
        {
          id: "amount",
          disablePadding: false,
          label: "Amount"
        }
      ];
    }

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}

              >
                <Tooltip
                  title="Sort"
                  placement={"bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
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
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  },
});

let EnhancedTableToolbar = props => {
  const { classes, theme } = props;

  return (
    <Toolbar>
      <div style={theme.custom.sectionTitle} className={classes.title}>
        <Typography variant='h2' align='left'>Rewards History</Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = () => ({});

class EnhancedTable extends React.Component {
  state = {
    order: "desc",
    orderBy: "timestamp",
    selected: [],
    history: [],
    page: 0,
    rowsPerPage: 5
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const {
      classes,
      theme,
      size,
      history,
    } = this.props;
    const {
      order,
      orderBy,
      selected,
      rowsPerPage,
      page
    } = this.state;

    let divStyle = {
      display: 'inline-block'
    }

    return (
      <Grid
        item
        xs={12}
        align="left"
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          theme={theme}
        />
      <div>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={history ? history.length : 0}
              theme={theme}
              size={size}
            />
          <TableBody>
              {stableSort(
                filtering(history, this.props),
                getSorting(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(record => {
                  return (
                    <TableRow hover tabIndex={-1} key={record.transactionID+record.timestamp}>
                      <TableCell>
                        <div style={divStyle}>
                          <Typography variant="body1" style={{ fontFamily: 'Montserrat-SemiBold' }}>
                            {record.currency}
                          </Typography>
                          <Typography variant="subtitle2">
                            {moment(record.timestamp).format("YYYY/MM/DD hh:mm")}
                          </Typography>
                        </div>
                      </TableCell>
                      {['xl', 'lg'].includes(size) && (<TableCell>
                        <Typography variant="body1" noWrap style={{ maxWidth: size==='lg'?'530px':'auto' }}>
                          {record.transactionID}
                        </Typography>
                      </TableCell>)}
                      <TableCell>
                        <Typography variant="body1">{(record.type==='stake'?"+":record.type==='withdraw'?"-":"+") + (record.amount ? record.amount : record.reward) + " " +record.currency}</Typography>
                        <Typography variant="subtitle2" style={{ color: record.type==='stake'?colors.orange:record.type==='withdraw'?colors.red:colors.green,  }}>
                          {record.type ? record.type : 'reward'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={history ? history.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Grid>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
