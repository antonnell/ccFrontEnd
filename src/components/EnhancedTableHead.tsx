import * as React from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import TableHead from "@material-ui/core/TableHead";

const rows = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  {
    id: "users",
    numeric: false,
    disablePadding: false,
    label: "Users"
  },
  {
    id: "date",
    numeric: false,
    disablePadding: false,
    label: "Date Created"
  }
];

interface OwnProps {
  order: false | "desc" | "asc" | undefined;
  orderBy: string;
  onRequestSort: (e:React.MouseEvent<HTMLElement>,index:string)=>void
}

interface Props extends OwnProps {
}

class EnhancedTableHead  extends React.Component<Props> {
  public render() {
    const { order, orderBy } = this.props;
    return (
        <TableHead>
          <TableRow>
            {rows.map(row => {
              return (
                  <TableCell
                      key={row.id}
                      numeric={row.numeric}
                      padding={row.disablePadding ? "none" : "default"}
                      sortDirection={orderBy === row.id ? order : false}
                  >
                    <Tooltip
                        title="Sort"
                        placement={row.numeric ? "bottom-end" : "bottom-start"}
                        enterDelay={300}
                    >
                      <TableSortLabel
                          active={orderBy === row.id}
                          direction={order === false?undefined:order}
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

  private createSortHandler = (property:string) => (event:React.MouseEvent<HTMLElement>) => {
    this.props.onRequestSort(event, property);
  };
}

export default EnhancedTableHead as React.ComponentClass<OwnProps>;
