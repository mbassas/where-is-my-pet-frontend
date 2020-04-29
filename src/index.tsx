import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './Pages/SignUp';
import { CssBaseline } from '@material-ui/core';
import SignIn from './Pages/SignIn';
import { Switch, Route, HashRouter as Router, Redirect } from 'react-router-dom';
import RecoverPassword from './Pages/RecoverPassword';
import UploadAnimal from './Pages/UploadAnimal';
import ViewAnimal from './Pages/ViewAnimal';

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
        <Route path="/upload-animal">
          <UploadAnimal />
        </Route>
        <Route path="/view-animal/:id">
          <div style={{display: "flex", marginTop: "30px", width: "100vw", alignContent: "center", justifyContent: "center"}}>

            <ViewAnimal />
          </div>
        </Route>
        <Redirect to="/sign-in" />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
