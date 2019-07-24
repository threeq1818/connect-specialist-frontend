// components/navbar.js

import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../actions/authentication';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { classes, auth } = this.props;
    const { isAuthenticated, user } = auth;

    const authLink = (
      <>
        <Button color="inherit">My Profile</Button>
        <Button color="inherit" onClick={this.onLogout}>Sign Out</Button>
      </>
    );
    const guessLink = (
      <>
        <Button color="inherit" href="register">Sign Up</Button>
        <Button color="inherit" href="login">Sign In</Button>
      </>
    );

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <ToolBar>
            <Typography variant="h6" className={classes.title}>
              Specialists And Customers Always Wish To Meet
                        </Typography>
            {isAuthenticated ? authLink : guessLink}
          </ToolBar>
        </AppBar>
      </div >
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { logoutUser })
)

export default enhance(NavBar);
// export default NavBar;

