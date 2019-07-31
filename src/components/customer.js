import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AllServiceTab from './customer-allservices';
import RequestedProjectTab from './customer-myrequests';
import FinishedProjectsTab from './customer-finishedprojects';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = ({
  root: {
    flexGrow: 1,
  },
});

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newValue) {
    this.setState({ value: newValue });
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="All Services" />
          <Tab label="My Request" />
          <Tab label="My Finished Projects" />
        </Tabs>
        <TabPanel value={this.state.value} index={0}>
          {this.state.value === 1 ? (<AllServiceTab />) : <></>}
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          {this.state.value === 1 ? (<RequestedProjectTab />) : <></>}
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          {this.state.value === 2 ? (<FinishedProjectsTab />) : <></>}
        </TabPanel>
      </Paper>
    );
  }
}

Customer.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}

const enhance = compose(
  withStyles(useStyles),
  withRouter,
  connect(mapStateToProps, {})
);

export default enhance(Customer)