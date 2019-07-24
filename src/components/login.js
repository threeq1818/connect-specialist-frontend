// Login.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import classnames from 'classnames';
import { isEmpty } from '../validation/is-empty';
import { loginUser } from '../actions/authentication';

const styles = theme => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password,
		}
		this.props.loginUser(user);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			if (this.props.auth.user.account_type === 'customer')
				this.props.history.push('/customer');
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.auth.isAuthenticated) {
			if (this.props.auth.user.account_type === 'customer')
				this.props.history.push('/customer');
		}
		if (this.props.errors !== prevProps.errors) {
			this.setState({
				errors: this.props.errors
			});
		}
	}

	render() {
		const { classes, auth } = this.props;
		const { errors } = this.state;

		return (
			<Grid container component="main" className={classes.root}>
				<CssBaseline />
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
            </Typography>
						<form className={classes.form} onSubmit={this.handleSubmit} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								// autoComplete="email"
								autoFocus
								aria-describedby="component-error-text"
								onChange={this.handleInputChange}
								value={this.state.email}
							/>
							<FormHelperText id="email-error-text" error>{errors.email}</FormHelperText>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								// autoComplete="current-password"
								aria-describedby="component-error-text"
								onChange={this.handleInputChange}
								value={this.state.password}
							/>
							<FormHelperText id="password-error-text" error>{errors.password}</FormHelperText>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								Sign In
              </Button>
							<Grid container>
								<Grid item>
									<Link href="/register" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Grid>
			</Grid>
		)
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.any.isRequired,
	// classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		errors: state.errors
	}
}

const enhance = compose(
	withStyles(styles),
	withRouter,
	connect(mapStateToProps, { loginUser })
);

export default enhance(Login)