// component/customer-allservices.js

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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import { fetchRequestedProjects_customer as fetchProjects } from '../actions/projects';

function createData(id, service_type, description, hourly_rate, preferred_hour, specialist_email, status, date) {
  return { id, service_type, description, hourly_rate, preferred_hour, specialist_email, status, date };
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
  { id: 'specialist_email', numeric: false, disablePadding: false, label: 'Specialist' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
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
        <TableCell align='center'>Action</TableCell>
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
          My Requested Projects
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
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});

class RequestedProjectTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // services: [],
      order: 'asc',
      orderBy: '',
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 10,
    };
    this.rows = [];
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  componentDidMount() {
    this.props.fetchProjects(this.props.auth.user.id);
  }

  componentDidUpdate() {

  }

  handleRequestSort(event, property) {
    const isDesc = this.state.orderBy === property && this.state.order === 'desc';
    this.setState({ order: (isDesc ? 'asc' : 'desc') });
    this.setState({ orderBy: property });
  }

  handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = this.rows.map(n => n.id);
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
  }

  handleChangeDense(event) {
    this.setState({ dense: event.target.checked });
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    this.rows = this.props.projects.data.map(item =>
      createData(item._id, item.service_type, item.description, item.hourly_rate, item.preferred_hour, item.specialist_email, item.status, item.date)
    );

    const { classes } = this.props;
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.rows.length - this.state.page * this.state.rowsPerPage);
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
                rowCount={this.rows.length}
              />
              <TableBody>
                {stableSort(this.rows, getSorting(this.state.order, this.state.orderBy))
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
                        <TableCell align={headRows[4].numeric ? 'right' : 'left'}>{row.specialist_email}</TableCell>
                        <TableCell align={headRows[5].numeric ? 'right' : 'left'}>{row.status}</TableCell>
                        <TableCell align={headRows[5].numeric ? 'right' : 'left'}>{row.date}</TableCell>
                        <TableCell align='center'>
                          <Button variant="contained" color="primary" className={classes.button}>
                            Delete
                            <DeleteIcon className={classes.rightIcon}></DeleteIcon>
                          </Button>
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={this.rows.length}
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


RequestedProjectTab.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  errors: PropTypes.any.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    projects: state.projects, //format: projects.data:[]
    errors: state.errors
  }
}

const enhance = compose(
  withStyles(useStyles),
  withRouter,
  connect(mapStateToProps, { fetchProjects })
);

export default enhance(RequestedProjectTab)