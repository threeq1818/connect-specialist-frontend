import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import NavBar from './components/navbar';
import Home from './components/home.js';
import Register from './components/Register';
import Login from './components/Login';
import store from './store';

// import 'bootstrap/dist/css/bootstrap.min.css';
const theme = createMuiTheme({
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <div>
            <NavBar />
            <Route exact path='/' component={Home} />
            {/* <PrivateRoute exact path="/" component={Home} /> */}
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
