// component/home.js

import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { lighten, withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/styles';

function createData(id, service_type, description, hourly_rate, preferred_hour) {
  return { id, service_type, description, hourly_rate, preferred_hour };
}

const rows = [
  createData(1, 'Car Repaire', 'Hong Kong', 130.7, 8),
  createData(2, 'Car Repaire', 'Beijing', 55.0, 10),
  createData(3, 'Car Repaire', 'Mercedes Benze', 160.0, 24),
  createData(4, 'Carpentry', 'Manutacture family furnitures', 36.0, 14),
  createData(6, 'Carpentry', 'Official furnitures', 36.0, 10),
  createData(7, 'Move', 'Safety is first', 32, '8:00-20:00'),
  createData(8, 'Cleaning', 'Fast and Clearly', 9.0, '10:00-18:00'),
  createData(9, 'Demolition', 'We just ate all that.', 50, 14),
  createData(10, 'Home improvement', 'Fanstastic Design', 26.0, 24),
  createData(11, 'Landscaping', 'Natural and beautiful', 20, '10:00-18:00'),
  createData(12, 'Program Development', 'Web development', 30, 24),
  createData(13, 'Program Development', 'e-Commerce site', 40, 24),
];

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

const headRows = [
  { id: 'service_type', numeric: false, disablePadding: true, label: 'Service Type' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'hourly_rate', numeric: true, disablePadding: false, label: 'Hourly Rate' },
  { id: 'preferred_hour', numeric: false, disablePadding: false, label: 'Preferred Hour' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          No
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
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
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Table of services
        </Typography>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      order: 'asc',
      orderBy: '',
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
    };
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }
  handleRequestSort(event, property) {
    const isDesc = this.state.orderBy === property && this.state.order === 'desc';
    this.setState({ order: (isDesc ? 'asc' : 'desc') });
    this.setState({ orderBy: property });
  }

  handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      this.setState({ selected: newSelecteds });
      return;
    }
    this.setState({ selected: [] });
  }

  handleClick(event, id) {
    const selectedIndex = this.state.selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  }

  handleChangePage(event, newPage) {
    this.setState({ page: newPage });
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
    this.setState({ page: 0 });
    // setRowsPerPage(+event.target.value);
    // setPage(0);
  }

  handleChangeDense(event) {
    this.setState({ dense: event.target.checked });
    // setDense(event.target.checked);
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);
    return (
      <div className={classes.root} >
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={this.state.selected.length} />
          <div className={classes.tableWrapper}>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={this.state.dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={this.state.selected.length}
                order={this.state.order}
                orderBy={this.state.orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getSorting(this.state.order, this.state.orderBy))
                  .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = this.isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // onClick={event => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          {/* <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        /> */}
                          {(index + 1)}
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.service_type}
                        </TableCell>
                        <TableCell align={headRows[1].numeric ? 'right' : 'left'}>{row.description}</TableCell>
                        <TableCell align={headRows[2].numeric ? 'right' : 'left'}>{row.hourly_rate}</TableCell>
                        <TableCell align={headRows[3].numeric ? 'right' : 'left'}>{row.preferred_hour}</TableCell>
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
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
        <FormControlLabel
          control={<Switch checked={this.state.dense} onChange={this.handleChangeDense} />}
          label="Dense padding"
        />
      </div>
    );
  }
}


Home.propTypes = {
  fetchServices: PropTypes.func.isRequired,
  services: PropTypes.array.isRequired,
  errors: PropTypes.any.isRequired
}

const mapStateToProps = (state) => {
  return {
    services: state.services,
    errors: state.errors
  }
}

const enhance = compose(
  withStyles(useStyles),
  withRouter,
   connect(mapStateToProps, { fetchServices })
);

export default enhance(Home)