// components/register.js

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/styles';
import classnames from 'classnames';
import { registerUser } from '../actions/authentication';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirm: '',
      accout_type: '',
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    }
    this.props.registerUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      console.log(this.props.auth.user);
      this.props.history.push('/');
    }
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* <Box mt={5}>
          <MadeWithLove />
        </Box> */}
      </Container>
      // <div className="container" style={{ marginTop: '50px', width: '700px' }}>
      //   <h2 style={{ marginBottom: '40px' }}>Registration</h2>
      //   <form onSubmit={this.handleSubmit}>
      //     <div className="form-group">
      //       <input
      //         type="text"
      //         placeholder="Name"
      //         className={classnames('form-control form-control-lg', {
      //           'is-invalid': errors.name
      //         })}
      //         name="name"
      //         onChange={this.handleInputChange}
      //         value={this.state.name}
      //       />
      //       {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
      //     </div>
      //     <div className="form-group">
      //       <input
      //         type="email"
      //         placeholder="Email"
      //         className={classnames('form-control form-control-lg', {
      //           'is-invalid': errors.email
      //         })}
      //         name="email"
      //         onChange={this.handleInputChange}
      //         value={this.state.email}
      //       />
      //       {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
      //     </div>
      //     <div className="form-group">
      //       <input
      //         type="password"
      //         placeholder="Password"
      //         className={classnames('form-control form-control-lg', {
      //           'is-invalid': errors.password
      //         })}
      //         name="password"
      //         onChange={this.handleInputChange}
      //         value={this.state.password}
      //       />
      //       {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
      //     </div>
      //     <div className="form-group">
      //       <input
      //         type="password"
      //         placeholder="Confirm Password"
      //         className={classnames('form-control form-control-lg', {
      //           'is-invalid': errors.password_confirm
      //         })}
      //         name="password_confirm"
      //         onChange={this.handleInputChange}
      //         value={this.state.password_confirm}
      //       />
      //       {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
      //     </div>
      //     <div className="form-group">
      //       <button type="submit" className="btn btn-primary">
      //         Register User
      //               </button>
      //     </div>
      //   </form>
      // </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// const mapDispatchToProps = {
//     registerUser: registerUser
// }
const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { registerUser })
)
export default enhance(Register);