import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route, HashRouter as Router, Redirect } from 'react-router-dom';
import RecoverPassword from './Pages/RecoverPassword';
import UploadAnimal from './Pages/UploadAnimal';
import ViewAnimal from './Pages/ViewAnimal';
import ViewAnimals from './Pages/ViewAnimals';
import MainLayout from './Components/Layouts/MainLayout/MainLayout';
import PrivatePage from './Components/Layouts/PrivatePage';
import AuthenticationProvider from './Components/Authentication';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Router>
      <AuthenticationProvider>
        <MainLayout>
          <Switch>
            <Route path="/recover-password">
              <RecoverPassword />
            </Route>
            <PrivatePage path="/upload-animal">
              <UploadAnimal />
            </PrivatePage>
            <Route path="/view-animal/:id">
              <ViewAnimal />
            </Route>
            <Route path="/">
              <ViewAnimals />
            </Route>
            <Redirect to="/" />
          </Switch>
        </MainLayout>
      </AuthenticationProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
