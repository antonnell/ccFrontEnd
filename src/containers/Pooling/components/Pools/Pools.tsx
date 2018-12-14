import * as React from 'react';
import {Theme, WithStyles} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import EnhancedTableHead from "./EnhancedTableHead";

function desc(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array: any, cmp: any) {
  if (!array) {
    return [];
  }
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any) => el[0]);
}

function getSorting(order: any, orderBy: any) {
  return order === "desc"
      ? (a: any, b: any) => desc(a, b, orderBy)
      : (a: any, b: any) => -desc(a, b, orderBy);
}

const styles = (theme: Theme) =>
    createStyles({
      root: {
        margin: theme.spacing.unit * 1.5
      },
      table: {},
      tableWrapper: {
        overflowX: "auto"
      }
    });

interface OwnProps {
  pools: any;
}

interface State {
  order: false | "desc" | "asc" | undefined;
  orderBy: string;
  selected: any;
  page: number;
  rowsPerPage: number;
  filtersVisible: boolean;
}

interface Props extends OwnProps, WithStyles<typeof styles> {
}

class Pools extends React.Component<Props, State> {
  readonly state: State = {
    order: "asc",
    orderBy: "timestamp",
    selected: [],
    page: 0,
    rowsPerPage: 5,
    filtersVisible: false,
  };

  public render() {
    const {classes, pools} = this.props;
    const {order, orderBy, page, rowsPerPage} = this.state;
    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, pools ? pools.length : 0 - page * rowsPerPage);
    return (
        <div className={classes.root}>
          <Typography variant="h5" style={{marginBottom: "20px"}}>
            My Pools
          </Typography>
          <Paper>
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                    // numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={this.handleRequestSort}
                    // rowCount={data ? data.length : 0}
                />
                <TableBody>
                  {stableSort(pools, getSorting(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((n: any) => {
                        return (
                            <TableRow hover tabIndex={-1} key={n.id}>
                              <TableCell>
                                <Typography
                                    style={{lineHeight: "57px", fontSize: "17px"}}
                                    noWrap
                                >
                                  {n.name}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                    style={{lineHeight: "57px", fontSize: "17px"}}
                                    noWrap
                                >
                                  {n.creator}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                    style={{lineHeight: "57px", fontSize: "17px"}}
                                    noWrap
                                >
                                  {n.fundStatus}
                                </Typography>
                              </TableCell>
                              <TableCell numeric>
                                <Typography
                                    style={{lineHeight: "57px", fontSize: "17px"}}
                                    noWrap
                                >
                                  {n.token}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                    style={{lineHeight: "57px", fontSize: "17px"}}
                                    noWrap
                                >
                                  {n.myContribution}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography
                                    style={{lineHeight: "57px", fontSize: "17px"}}
                                    noWrap
                                >
                                  {n.blockchain}
                                </Typography>
                              </TableCell>
                            </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                      <TableRow style={{height: 49 * emptyRows}}>
                        <TableCell colSpan={6} />
                      </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <TablePagination
                component="div"
                count={pools ? pools.length : 0}
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
          </Paper>
        </div>
    );
  }

  private handleRequestSort = (event:any, property:string) => {
    const orderBy = property;
    let order:false | "desc" | "asc" | undefined = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({order, orderBy});
  };

  private handleChangePage = (event:any, page:any) => {
    this.setState({page});
  };

  private handleChangeRowsPerPage = (event:any) => {
    this.setState({ rowsPerPage: event.target.value });
  };
}

export default withStyles(styles)(Pools) as React.ComponentClass<OwnProps>;
