import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import jwt_decode from 'jwt-decode';
import NavBar from './components/navbar';
import Home from './components/home.js';
import Register from './components/register';
import Customer from './components/customer';
import Login from './components/login';
import store from './store';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

// import 'bootstrap/dist/css/bootstrap.min.css';
const theme = createMuiTheme({
});

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
  else if (decoded.account_type === 'customer') {
    //  debugger
    // window.location.href = '/customer';
  }
}

const isAuthenticate = () => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      return false;
    }
    else
      return true;
  }
  else
    return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => {
    //  debugger
    //  console.log(isAuthenticate());
    // console.log(isAuthenticate() === true);
    return isAuthenticate() === true ? <Component {...props} /> : <Redirect to='/' />
  }}
  />
)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div>
            <NavBar />
            {/* <PrivateRoute exact path="/" component={Home} /> */}
            <div className="container">
              <Switch>
                <Route exact path='/' component={Home} />
                <PrivateRoute exact path='/customer' component={Customer} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Redirect to='/' />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
