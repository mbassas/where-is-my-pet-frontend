import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './Pages/SignUp';
import { CssBaseline } from '@material-ui/core';
import SignIn from './Pages/SignIn';
import { Switch, Route, HashRouter as Router, Redirect } from 'react-router-dom';
import RecoverPassword from './Pages/RecoverPassword';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Router>
      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/recover-password">
          <RecoverPassword />
        </Route>
        <Redirect to="/sign-in" />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
