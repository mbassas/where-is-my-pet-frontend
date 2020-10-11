import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { Switch, Route, HashRouter as Router, Redirect } from 'react-router-dom';
import RecoverPassword from './Pages/RecoverPassword';
import UploadAnimal from './Pages/UploadAnimal';
import ViewAnimal from './Pages/ViewAnimal';
import ViewAnimals from './Pages/ViewAnimals';
import MainLayout from './Components/Layouts/MainLayout/MainLayout';
import AuthenticationProvider from './Components/Authentication';
import Landing from './Pages/Landing';
import AdminPages from './Pages/Admin';
import UserPages from './Pages/User';
import About from './Pages/About';

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
            <Route path="/upload-animal">
              <UploadAnimal />
            </Route>
            <Route path="/view-animal/:id">
              <ViewAnimal />
            </Route>
            <Route path="/search">
              <ViewAnimals />
            </Route>
            <Route path="/admin">
              <AdminPages />
            </Route>
            <Route path="/user">
              <UserPages />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Landing />
            </Route>
            <Redirect to="/" />
          </Switch>
        </MainLayout>
      </AuthenticationProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
