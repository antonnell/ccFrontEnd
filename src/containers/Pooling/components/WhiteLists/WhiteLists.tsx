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
import EnhancedTableHead from "../../../../components/EnhancedTableHead";
import {User} from "../../../../types/account";
import {withWhitelistContext, WithWhitelistContext} from "../../../../context/WhitelistContext";
import {helperRenderConsoleText} from "../../../../helpers/helpers";
import {Whitelist} from "../../../../types/whitelist";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import {sharedStyles} from "../../../../theme/theme";

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
      containerGrid: sharedStyles(theme).containerGrid,
      table: {},
      tableWrapper: {
        overflowX: "auto"
      }
    });

interface OwnProps {
  user: User;
}

interface State {
  order: false | "desc" | "asc" | undefined;
  orderBy: string;
  selected: any;
  page: number;
  rowsPerPage: number;
  filtersVisible: boolean;
  loading: boolean;
}

interface Props extends OwnProps, WithStyles<typeof styles>,WithWhitelistContext {
}

class WhiteLists extends React.Component<Props, State> {
  readonly state: State = {
    order: "asc",
    orderBy: "name",
    selected: [],
    page: 0,
    rowsPerPage: 5,
    filtersVisible: false,
    loading: false,
  };

  componentWillMount(): void {
    const {
      user,
      whitelistContext: {
        getUserSavedWhitelists
      }
    } = this.props;
    this.setState({loading:true});
    getUserSavedWhitelists(user.id).then(()=>{
      this.setState({loading:false});
    });
  }

  public render() {
    console.log(...helperRenderConsoleText('Render Whitelists', 'lightGreen'));
    const {classes,whitelistContext: {whitelists}} = this.props;
    const {order, orderBy, page, rowsPerPage,loading} = this.state;
    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, whitelists ? whitelists.length : 0 - page * rowsPerPage);
    return (
        <Grid item xs={12}>
          <Typography variant="h3" style={{marginBottom: "20px"}}>
            My Whitelists
          </Typography>
          <Paper>
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={this.handleRequestSort}
                    // rowCount={data ? data.length : 0}
                />
                <TableBody>
                  {loading && <TableRow style={{height: "auto"}}>
                    <TableCell colSpan={3} style={{padding: 0}}>
                      <LinearProgress />
                    </TableCell>
                  </TableRow>}
                  {stableSort(whitelists, getSorting(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((n: Whitelist,i:number) => {
                        return (
                            <TableRow hover tabIndex={-1} key={i} onClick={this.handleRowClick(n.id||0)} style={{cursor: "pointer"}}>
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
                                  {n.userCount}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography style={{lineHeight: "57px", fontSize: "17px"}} noWrap>-</Typography>
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
                count={whitelists ? whitelists.length : 0}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10]}
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
        </Grid>
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

  private handleRowClick = (id: number) => () => {
    window.location.hash = `updateWhitelist/${id}`;
  };
}

export default withStyles(styles)(withWhitelistContext(WhiteLists)) as React.ComponentClass<OwnProps>;
