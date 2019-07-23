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
		})
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
			this.props.history.push('/');
		}
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

	render() {
		const { classes } = this.props;
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
						<form className={classes.form} noValidate>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
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
								{/* <Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
                                </Link>
								</Grid> */}
								<Grid item>
									<Link href="/register" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
							{/* <Box mt={5}>
                                <MadeWithLove />
                            </Box> */}
						</form>
					</div>
				</Grid>
			</Grid>
			// <div className="container" style={{ marginTop: '50px', width: '700px' }}>
			//     <h2 style={{ marginBottom: '40px' }}>Login</h2>
			//     <form onSubmit={this.handleSubmit}>
			//         <div className="form-group">
			//             <input
			//                 type="email"
			//                 placeholder="Email"
			//                 className={classnames('form-control form-control-lg', {
			//                     'is-invalid': errors.email
			//                 })}
			//                 name="email"
			//                 onChange={this.handleInputChange}
			//                 value={this.state.email}
			//             />
			//             {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
			//         </div>
			//         <div className="form-group">
			//             <input
			//                 type="password"
			//                 placeholder="Password"
			//                 className={classnames('form-control form-control-lg', {
			//                     'is-invalid': errors.password
			//                 })}
			//                 name="password"
			//                 onChange={this.handleInputChange}
			//                 value={this.state.password}
			//             />
			//             {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
			//         </div>
			//         <div className="form-group">
			//             <button type="submit" className="btn btn-primary">
			//                 Login User
			//         </button>
			//         </div>
			//     </form>
			// </div>
		)
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
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