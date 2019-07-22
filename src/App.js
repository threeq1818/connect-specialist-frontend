import React from 'react';
import NavBar from './components/navbar';
import Home from './components/home.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <Route exact path='/' component={Home} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
